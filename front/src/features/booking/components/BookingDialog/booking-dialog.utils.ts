// Types
import type { WithCloseModalProp } from './booking-dialog.types'
import { cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react'

export const injectCloseModal = (children: ReactNode, closeModal: () => void): ReactNode => {
  if (Array.isArray(children)) {
    return children.map((child) => {
      if (!isValidElement(child)) {
        return child
      }

      return cloneElement(child as ReactElement<WithCloseModalProp>, {
        closeModal,
      })
    })
  }

  if (!isValidElement(children)) {
    return children
  }

  return cloneElement(children as ReactElement<WithCloseModalProp>, {
    closeModal,
  })
}
