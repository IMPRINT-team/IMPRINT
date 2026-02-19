#!/usr/bin/env python3
"""Reconcile Trello canonical import JSON with raw Trello export JSON."""
from __future__ import annotations

import argparse
import copy
import hashlib
import json
import re
import sys
from dataclasses import dataclass
from difflib import SequenceMatcher
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
CANONICAL_PATH = ROOT / "trello-user-stories.json"
DEFAULT_RAW_CANDIDATES = [
    ROOT / "raw_export_from_trello.json",
    ROOT / "raw-export-from-trello.json",
    ROOT / "raw_trello_export.json",
    ROOT / "trello-raw-export.json",
]
OUT_PATH = ROOT / "reconciled-user-stories.json"


@dataclass
class Stats:
    canonical_lists: int = 0
    canonical_cards: int = 0
    raw_lists: int = 0
    raw_cards: int = 0
    duplicates_merged: int = 0
    split_cards_created: int = 0
    unknown_labels: int = 0
    unknown_labels_preserved: int = 0
    created_lists: list[str] = None

    def __post_init__(self) -> None:
        if self.created_lists is None:
            self.created_lists = []


def load_json(path: Path) -> Any:
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def normalize_name(name: str) -> str:
    n = re.sub(r"\s+", " ", name.strip().lower())
    n = re.sub(r":\s*\d+\s*$", "", n)
    return n


def extract_url(text: str | None) -> str | None:
    if not text:
        return None
    m = re.search(r"https?://trello\.com/c/\S+", text)
    return m.group(0) if m else None


def desc_hash(desc: str | None) -> str:
    return hashlib.sha1((desc or "").strip().encode("utf-8")).hexdigest()


def card_required_shape(card: dict[str, Any], sample_card: dict[str, Any]) -> dict[str, Any]:
    out = copy.deepcopy(card)
    for key, value in sample_card.items():
        if key not in out:
            out[key] = copy.deepcopy(value)
    out.setdefault("name", "")
    out.setdefault("desc", "")
    return out


def merge_desc(primary: str, secondary: str) -> str:
    p = (primary or "").strip()
    s = (secondary or "").strip()
    if not p:
        return s
    if not s or s in p:
        return p
    if p in s:
        return s
    return f"{p}\n\n{s}"


def merge_checklists(a: list[dict[str, Any]] | None, b: list[dict[str, Any]] | None) -> list[dict[str, Any]]:
    a = copy.deepcopy(a or [])
    b = copy.deepcopy(b or [])
    index: dict[str, dict[str, Any]] = {cl.get("name", "").strip().lower(): cl for cl in a}
    for cl in b:
        key = cl.get("name", "").strip().lower()
        if key in index:
            existing = index[key]
            existing_items = {(it.get("name", "").strip().lower()): it for it in existing.get("checkItems", [])}
            for it in cl.get("checkItems", []):
                ikey = it.get("name", "").strip().lower()
                if ikey and ikey not in existing_items:
                    existing.setdefault("checkItems", []).append(it)
                    existing_items[ikey] = it
        else:
            a.append(cl)
            index[key] = cl
    return a


def collect_canonical_indexes(data: dict[str, Any]) -> tuple[dict[str, str], dict[str, tuple[str, int]], dict[str, tuple[str, int]]]:
    by_url: dict[str, str] = {}
    by_name_list: dict[str, tuple[str, int]] = {}
    by_desc: dict[str, tuple[str, int]] = {}
    for li, lst in enumerate(data.get("lists", [])):
        lname = lst.get("name", "")
        for ci, card in enumerate(lst.get("cards", [])):
            url = extract_url(card.get("desc"))
            if url:
                by_url[url] = f"{lname}:{ci}"
            by_name_list[f"{normalize_name(card.get('name',''))}|{lname.lower()}"] = (lname, ci)
            by_desc[desc_hash(card.get("desc"))] = (lname, ci)
    return by_url, by_name_list, by_desc


def map_label_ids(raw_label_names: list[str], canonical_labels: list[dict[str, Any]], stats: Stats) -> tuple[list[str], list[str]]:
    canonical_by_name = {lbl.get("name", "").strip().lower(): lbl.get("id") for lbl in canonical_labels}
    known_ids: list[str] = []
    unknown: list[str] = []
    for name in raw_label_names:
        key = name.strip().lower()
        if key in canonical_by_name and canonical_by_name[key]:
            known_ids.append(canonical_by_name[key])
        elif name:
            unknown.append(name)
            stats.unknown_labels += 1
    seen = set()
    dedup_known = [x for x in known_ids if not (x in seen or seen.add(x))]
    return dedup_known, unknown


def parse_raw(raw: Any) -> list[dict[str, Any]]:
    """Extract cards from raw Trello export structures."""
    if not raw:
        return []
    cards: list[dict[str, Any]] = []

    if isinstance(raw, dict) and "cards" in raw and "lists" in raw:
        lists_by_id = {lst.get("id"): lst for lst in raw.get("lists", []) if not lst.get("closed")}
        labels_by_id = {lbl.get("id"): lbl.get("name", "") for lbl in raw.get("labels", [])}
        checklists_by_card: dict[str, list[dict[str, Any]]] = {}
        for cl in raw.get("checklists", []) or []:
            item_list = []
            for it in cl.get("checkItems", []) or []:
                item_list.append({"name": it.get("name", ""), "checked": it.get("state") == "complete"})
            checklists_by_card.setdefault(cl.get("idCard", ""), []).append({"name": cl.get("name", ""), "checkItems": item_list})
        for c in raw.get("cards", []):
            if c.get("closed"):
                continue
            lst = lists_by_id.get(c.get("idList"), {})
            raw_labels = [labels_by_id.get(lid, "") for lid in c.get("idLabels", [])]
            cards.append(
                {
                    "list_name": lst.get("name", "Inbox"),
                    "name": c.get("name", ""),
                    "desc": c.get("desc", ""),
                    "url": c.get("url"),
                    "raw_labels": [x for x in raw_labels if x],
                    "checklists": checklists_by_card.get(c.get("id", ""), []),
                }
            )
        return cards

    if isinstance(raw, dict) and "lists" in raw:
        for lst in raw.get("lists", []):
            lname = lst.get("name", "Inbox")
            for c in lst.get("cards", []):
                cards.append(
                    {
                        "list_name": lname,
                        "name": c.get("name", ""),
                        "desc": c.get("desc", ""),
                        "url": c.get("url") or extract_url(c.get("desc")),
                        "raw_labels": c.get("labels", []) or c.get("labelNames", []) or [],
                        "checklists": c.get("checklists", []),
                    }
                )
        return cards

    return cards


def resolve_raw_path(cli_raw: str | None = None) -> Path:
    if cli_raw:
        candidate = Path(cli_raw)
        if not candidate.is_absolute():
            candidate = ROOT / candidate
        return candidate

    for candidate in DEFAULT_RAW_CANDIDATES:
        if candidate.exists():
            return candidate

    return DEFAULT_RAW_CANDIDATES[0]


def reconcile(canonical_path: Path = CANONICAL_PATH, raw_path: Path | None = None, out_path: Path = OUT_PATH) -> Stats:
    stats = Stats()
    canonical = load_json(canonical_path)
    resolved_raw_path = raw_path or resolve_raw_path()
    if not resolved_raw_path.exists():
        raise FileNotFoundError(
            "raw export not found; expected one of: " + ", ".join(str(p.name) for p in DEFAULT_RAW_CANDIDATES)
        )
    raw = load_json(resolved_raw_path)

    stats.canonical_lists = len(canonical.get("lists", []))
    stats.canonical_cards = sum(len(lst.get("cards", [])) for lst in canonical.get("lists", []))

    result = {k: copy.deepcopy(v) for k, v in canonical.items()}
    sample_card = next((lst["cards"][0] for lst in canonical.get("lists", []) if lst.get("cards")), {"name": "", "desc": "", "idLabels": []})
    by_url, by_name_list, by_desc = collect_canonical_indexes(result)

    raw_cards = parse_raw(raw)
    raw_list_names = sorted({c["list_name"] for c in raw_cards})
    stats.raw_lists = len(raw_list_names)
    stats.raw_cards = len(raw_cards)

    lists_by_name = {lst.get("name", ""): lst for lst in result.get("lists", [])}

    for rc in raw_cards:
        target_list_name = rc["list_name"] if rc["list_name"] in lists_by_name else None
        if target_list_name is None:
            target_list_name = rc["list_name"]
            lists_by_name[target_list_name] = {"name": target_list_name, "cards": []}
            result["lists"].append(lists_by_name[target_list_name])
            stats.created_lists.append(target_list_name)

        lst = lists_by_name[target_list_name]
        lookup_key = f"{normalize_name(rc['name'])}|{target_list_name.lower()}"
        match_idx = None
        raw_url = rc.get("url") or extract_url(rc.get("desc"))

        if raw_url and raw_url in by_url:
            _, idx = by_url[raw_url].split(":")
            match_idx = int(idx)
        elif lookup_key in by_name_list and by_name_list[lookup_key][0] == target_list_name:
            match_idx = by_name_list[lookup_key][1]
        else:
            best_idx = None
            best_score = 0.0
            for i, c in enumerate(lst.get("cards", [])):
                score = SequenceMatcher(None, normalize_name(c.get("name", "")), normalize_name(rc["name"])).ratio()
                if score > best_score:
                    best_score, best_idx = score, i
            if best_idx is not None and best_score >= 0.92:
                match_idx = best_idx
            else:
                dh = desc_hash(rc.get("desc"))
                if dh in by_desc and by_desc[dh][0] == target_list_name:
                    match_idx = by_desc[dh][1]

        canonical_label_ids, unknown_labels = map_label_ids(rc.get("raw_labels", []), result.get("labels", []), stats)

        if match_idx is not None and match_idx < len(lst.get("cards", [])):
            existing = lst["cards"][match_idx]
            existing["desc"] = merge_desc(existing.get("desc", ""), rc.get("desc", ""))
            if unknown_labels:
                raw_lbl_line = "Raw Labels: " + ", ".join(unknown_labels)
                if raw_lbl_line not in existing["desc"]:
                    existing["desc"] = merge_desc(existing["desc"], raw_lbl_line)
                    stats.unknown_labels_preserved += len(unknown_labels)
            if "idLabels" in existing:
                existing["idLabels"] = sorted(set((existing.get("idLabels") or []) + canonical_label_ids))
            existing["checklists"] = merge_checklists(existing.get("checklists"), rc.get("checklists"))
            stats.duplicates_merged += 1
        else:
            new_card = card_required_shape({
                "name": rc.get("name", ""),
                "desc": rc.get("desc", ""),
                "idLabels": canonical_label_ids,
                "checklists": rc.get("checklists", []),
            }, sample_card)
            if unknown_labels:
                new_card["desc"] = merge_desc(new_card.get("desc", ""), "Raw Labels: " + ", ".join(unknown_labels))
                stats.unknown_labels_preserved += len(unknown_labels)
            lst.setdefault("cards", []).append(new_card)
            by_name_list[lookup_key] = (target_list_name, len(lst["cards"]) - 1)
            by_desc[desc_hash(new_card.get("desc"))] = (target_list_name, len(lst["cards"]) - 1)

    for lst in result.get("lists", []):
        lst.setdefault("cards", [])
        for i, card in enumerate(lst["cards"]):
            lst["cards"][i] = card_required_shape(card, sample_card)

    with out_path.open("w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
        f.write("\n")

    return stats


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Reconcile canonical Trello user stories with raw Trello export")
    parser.add_argument("--canonical", default=str(CANONICAL_PATH), help="Path to canonical import-ready JSON")
    parser.add_argument("--raw", default=None, help="Path to raw Trello export JSON")
    parser.add_argument("--out", default=str(OUT_PATH), help="Output path for reconciled import JSON")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    stats = reconcile(Path(args.canonical), resolve_raw_path(args.raw), Path(args.out))
    print("Reconciliation report")
    print(f"- Canonical lists/cards: {stats.canonical_lists}/{stats.canonical_cards}")
    print(f"- Raw lists/cards: {stats.raw_lists}/{stats.raw_cards}")
    print(f"- Duplicates merged: {stats.duplicates_merged}")
    print(f"- New cards created from splitting high-level cards: {stats.split_cards_created}")
    print(
        "- Unknown labels encountered: "
        f"{stats.unknown_labels} (preserved in description lines: {stats.unknown_labels_preserved})"
    )
    print(f"- Lists created beyond canonical: {stats.created_lists if stats.created_lists else 'None'}")
    final_cards = stats.canonical_cards + stats.raw_cards - stats.duplicates_merged
    print(f"- Final reconciled cards (estimated): {final_cards}")
    if stats.raw_cards and final_cards < stats.raw_cards:
        raise RuntimeError(
            f"Reconciled card count {final_cards} is less than raw card count {stats.raw_cards}; refusing output."
        )


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        sys.exit(1)
