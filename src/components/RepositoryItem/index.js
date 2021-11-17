// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {respositoriesitems} = props
  const {
    name,
    avatarUrl,
    starsCount,
    issuesCount,
    forksCount,
  } = respositoriesitems

  return (
    <li className="listItem">
      <img alt="name" className="imgofitem" src={avatarUrl} />
      <h1 className="name">{name}</h1>
      <div className="statusCon">
        <img
          className="statusImg"
          alt="stars"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
        />
        <p className="statusPara">{starsCount} stars</p>
      </div>
      <div className="statusCon">
        <img
          className="statusImg"
          alt="stars"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
        />
        <p className="statusPara">{forksCount} forks</p>
      </div>
      <div className="statusCon">
        <img
          className="statusImg"
          alt="stars"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
        />
        <p className="statusPara">{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
