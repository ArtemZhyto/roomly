// Styles
import styles from './UserAvatar.module.scss'

interface UserAvatarProps {
  name: string
  className?: string
}

const getInitials = (name: string) => {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

const UserAvatar = ({ name, className = '' }: UserAvatarProps) => {
  const avatarClassName = [styles.avatar, className].filter(Boolean).join(' ')

  return (
    <span className={avatarClassName} aria-hidden='true'>
      {getInitials(name) || '?'}
    </span>
  )
}

export default UserAvatar
