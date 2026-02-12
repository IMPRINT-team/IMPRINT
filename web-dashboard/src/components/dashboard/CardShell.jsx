import React from "react"
import PropTypes from "prop-types"

const CardShell = ({ title, actions, className = "", children, ...props }) => (
  <div
    className={`card border border-primary rounded-xl shadow-sm dashboard-panel-gradient ${className}`}
    {...props}
  >
    <div className="card gap-4">
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

CardShell.propTypes = {
  title: PropTypes.string,
  actions: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node,
}

export default CardShell
