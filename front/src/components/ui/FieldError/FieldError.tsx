interface FieldErrorProps {
  id: string
  message: string
}

const FieldError = ({ id, message }: FieldErrorProps) => {
  return (
    <p
      id={id}
      className='m-0 flex items-center gap-1.5 text-sm font-medium leading-[1.35] text-[#ef4444] select-none pointer-default'
      role='alert'
    >
      <span
        aria-hidden='true'
        className='grid size-4 shrink-0 place-items-center rounded-full bg-[#ef4444] text-[10px] font-bold leading-none text-white'
      >
        !
      </span>

      <span>{message}</span>
    </p>
  )
}

export default FieldError
