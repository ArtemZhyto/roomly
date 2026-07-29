// Modules
import { Menu, X } from 'lucide-react'

interface MobileMenuButtonProps {
  isOpen: boolean
  onClick: () => void
}

const MobileMenuButton = ({ isOpen, onClick }: MobileMenuButtonProps) => {
  const Icon = isOpen ? X : Menu

  return (
    <button
      type='button'
      className='grid size-10 cursor-pointer place-items-center rounded-control border border-border bg-surface text-text-primary'
      aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
      aria-expanded={isOpen}
      aria-controls='mobile-navigation-drawer'
      onClick={onClick}
    >
      <Icon className='size-5' strokeWidth={2} aria-hidden='true' />
    </button>
  )
}

export default MobileMenuButton
