import React from "react"
import './style.scss'

export function BaseForm ({ className, children, onSubmit, isRegistration = false }) {
    return (
      <form className={`base-form ${className}`} onSubmit={onSubmit}>
          {children}
      </form>
    )
}