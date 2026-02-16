import React from 'react'

function BaseModal({ id = 'modal', title, onClose, children }) {
  return (
    <dialog id={id} className="modal modal-open">
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
    </dialog>
  )
}

export default BaseModal
