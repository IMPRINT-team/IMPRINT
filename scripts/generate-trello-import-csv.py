#!/usr/bin/env python3
"""Generate a Trello-importable CSV from trello-user-stories.json.

Supports the JSON shape used by Trello Import to Board (JSON):
{
  "name": "Board Name",
  "lists": [{"name": "List", "cards": [{"name": "", "desc": "", "labels": []}]}]
}
"""

from __future__ import annotations

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INPUT_PATH = ROOT / "trello-user-stories.json"
OUTPUT_PATH = ROOT / "trello-user-stories-import.csv"


def load_cards(path: Path) -> list[dict]:
    with path.open("r", encoding="utf-8") as handle:
        payload = json.load(handle)

    if not isinstance(payload, dict) or "lists" not in payload:
        raise ValueError("Expected Trello JSON payload with top-level 'lists'")

    cards: list[dict] = []
    for lst in payload.get("lists", []):
        list_name = lst.get("name", "Product Backlog")
        for card in lst.get("cards", []):
            cards.append(
                {
                    "name": card.get("name", ""),
                    "desc": card.get("desc", ""),
                    "list": list_name,
                    "labels": card.get("labels", []),
                }
            )
    return cards


def write_csv(cards: list[dict], path: Path) -> None:
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=["Name", "Description", "List", "Labels"],
            quoting=csv.QUOTE_MINIMAL,
        )
        writer.writeheader()

        for card in cards:
            labels = card.get("labels") or []
            labels_str = ", ".join(str(label) for label in labels if label)
            writer.writerow(
                {
                    "Name": card.get("name", ""),
                    "Description": card.get("desc", ""),
                    "List": card.get("list", "Product Backlog"),
                    "Labels": labels_str,
                }
            )


def main() -> None:
    cards = load_cards(INPUT_PATH)
    write_csv(cards, OUTPUT_PATH)
    print(f"Generated {OUTPUT_PATH} with {len(cards)} cards")


if __name__ == "__main__":
    main()
