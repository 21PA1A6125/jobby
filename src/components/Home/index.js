import {Component} from 'react'

import Header from '../Header'

import './index.css'

class Home extends Component {
  onClickFindJobs = () => {
    const {history} = this.props
    history.push('/jobs')
  }

  render() {
    return (
      <div className="home">
        <Header />
        <div className="home-container">
          <div className="home-content-container">
            <h1>Find The Job That Fits Your Life</h1>
            <p>
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential.
            </p>
            <button
              onClick={this.onClickFindJobs}
              type="button"
              className="find-jobs-btn"
            >
              Find Jobs
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
