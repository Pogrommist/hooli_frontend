import React, { ReactNode } from "react"
import './style.scss'

interface BaseFormType {
  className?: string
  children: ReactNode
  onSubmit: any
}

export const BaseForm:React.FC<BaseFormType> = ({ className, children, onSubmit }) => {
    return (
      <form className={`base-form ${className || ''}`} onSubmit={onSubmit}>
          {children}
      </form>
    )
}