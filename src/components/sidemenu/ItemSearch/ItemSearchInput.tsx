import style from './ItemSearch.module.scss'

interface Props {
  value: string
  onChange: (newValue: string) => void
}

export const ItemSearchInput = ({ value, onChange }: Props) => (
  <div className={style.inputwrap}>
    <input
      className={style.input}
      placeholder="  アイテム検索"
      value={value}
      onChange={e => {
        onChange(e.target.value)
      }}
    />
    <div
      className={style.inputclear}
      onClick={() => {
        onChange('')
      }}
    >
      ✖
    </div>
  </div>
)
