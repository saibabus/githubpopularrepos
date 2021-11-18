import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import './index.css'
import RepositoryItem from '../RepositoryItem'

const apiStatusConstans = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  process: 'IN_PROCESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularReports extends Component {
  state = {
    selectedId: languageFiltersData[0].id,
    apiStatus: apiStatusConstans.initial,
    repositoriesData: [],
  }

  componentDidMount() {
    this.renderinggititems()
  }

  changegitItem = id => {
    this.setState({selectedId: id}, this.renderinggititems)
  }

  renderinggititems = async () => {
    const {selectedId} = this.state
    this.setState({apiStatus: apiStatusConstans.process})
    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${selectedId}`
    const response = await fetch(githubReposApiUrl)
    console.log(response)

    if (response.ok) {
      const data = await response.json()
      console.log(data.popular_repos)
      const updateddata = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
      }))
      this.setState({
        apiStatus: apiStatusConstans.success,
        repositoriesData: updateddata,
      })
    } else {
      this.setState({apiStatus: apiStatusConstans.failure})
    }
  }

  renderloadingview = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderfailureview = () => (
    <div className="failurecontainer">
      <img
        className="failureImg"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      />
      <h1 className="fialureMsg">Something Went Wrong</h1>
    </div>
  )

  rendersuccessview = () => {
    const {repositoriesData} = this.state
    return (
      <ul className="repositoriesItems">
        {repositoriesData.map(eachone => (
          <RepositoryItem key={eachone.id} respositoriesitems={eachone} />
        ))}
      </ul>
    )
  }

  renderingrepositoriesall = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstans.process:
        return this.renderloadingview()
      case apiStatusConstans.failure:
        return this.renderfailureview()
      case apiStatusConstans.success:
        return this.rendersuccessview()
      default:
        return null
    }
  }

  render() {
    const {selectedId} = this.state
    return (
      <div className="app-contianer">
        <h1 className="heading">popular</h1>
        <ul className="differentlanguages">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              eachlangeuage={each}
              key={each.id}
              isActive={each.id === selectedId}
              onclickeach={this.changegitItem}
            />
          ))}
        </ul>
        {this.renderingrepositoriesall()}
      </div>
    )
  }
}
export default GithubPopularReports
