import style from './UpdateButton.module.scss'

export type UpdateButtonState = 0 | 1 | 2 | 3

type UpdateButtonProps = {
  status: UpdateButtonState
  onClick?: () => void
}

export const UpdateButton = ({ status, onClick }: UpdateButtonProps) => {
  const buttonStyle = {
    0: '',
    1: style.loading,
    2: style.completed,
    3: '',
  }

  const progressStyle = {
    0: '',
    1: '',
    2: style.active,
    3: style.active,
  }

  return (
    <button
      className={`${style.MarketUpdateButton} ${buttonStyle[status]}`}
      disabled={status !== 0}
      onClick={onClick}
    >
      <span className={`${style.ProgressBar} ${progressStyle[status]}`} />
    </button>
  )
}
