import React from "react"
import PropTypes from "prop-types"

const CardShell = ({ title, actions, className = "", children, ...props }) => (
  <article
    className={`card h-full border border-primary rounded-xl shadow-sm dashboard-panel-gradient ${className}`}
    {...props}
  >
    <div className="card-body h-full gap-4 p-4 lg:p-5">
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
  </article>
)

CardShell.propTypes = {
  title: PropTypes.string,
  actions: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node,
}

export default CardShell
