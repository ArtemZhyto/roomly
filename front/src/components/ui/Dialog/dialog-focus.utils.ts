// Constants
import { DIALOG_FOCUSABLE_SELECTOR } from './dialog.constants'

export const getDialogFocusableElements = (dialog: HTMLElement): HTMLElement[] => {
  return Array.from(dialog.querySelectorAll<HTMLElement>(DIALOG_FOCUSABLE_SELECTOR))
}

export const focusDialog = (dialog: HTMLElement): void => {
  dialog.focus()
}

export const focusFirstDialogElement = (dialog: HTMLElement): void => {
  const focusableElements = getDialogFocusableElements(dialog)

  const firstElement = focusableElements[0]

  ;(firstElement ?? dialog).focus()
}

export const isDialogTextControl = (element: Element | null): boolean => {
  if (!(element instanceof HTMLElement)) {
    return false
  }

  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName) || element.isContentEditable
}
