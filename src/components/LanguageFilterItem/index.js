// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {onclickeach, isActive, eachlangeuage} = props
  const {language, id} = eachlangeuage
  const buttonstyle = isActive ? 'button isactive' : 'button'
  const onchangebuttonstyle = () => {
    onclickeach(id)
  }
  return (
    <li className="eachlanguage">
      <button
        className={buttonstyle}
        type="button"
        onClick={onchangebuttonstyle}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
