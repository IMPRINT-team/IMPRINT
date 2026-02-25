import React from 'react'
import { createPortal } from 'react-dom'

function BaseModal({ id = 'modal', title, onClose, children, portalTarget }) {
  const resolvedTarget =
    portalTarget ||
    (typeof document !== 'undefined' &&
      (document.getElementById('modal-root') || document.body))

  if (!resolvedTarget) {
    return null
  }

  return createPortal(
    <dialog id={id} className="modal modal-open z-[55]" onCancel={onClose}>
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            type="button"
            onClick={onClose}
          >
            X
          </button>
        </form>

        {title && <h3 className="font-bold text-xl mb-8">{title}</h3>}

        {children}
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onClose}>close</button>
      </form>
    </dialog>,
    resolvedTarget,
  )
}

export default BaseModal
