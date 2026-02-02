import React from "react"

const CardShell = ({ title, actions, className = "", children }) => (
  <div
    className={`card border border-primary rounded-3xl bg-base-100 shadow-sm ${className}`}
  >
    <div className="card-body gap-4">
      {(title || actions) && (
        <div className="flex items-center justify-between gap-4">
          {title && (
            <h3 className="text-sm font-serif uppercase tracking-widest text-base-content">
              {title}
            </h3>
          )}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  </div>
)

export default CardShell
