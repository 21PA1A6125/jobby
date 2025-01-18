import Cookies from 'js-cookie'
import {Component} from 'react'
import {FaSearch} from 'react-icons/fa'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobItem from '../JobItem'

import './index.css'

class Jobs extends Component {
  state = {
    profileData: [],
    selectedEmploymentTypes: [],
    salaryRange: '',
    searchInput: '',
    jobProfiles: [],
    isLoading: false,
    profileStatus: '',
    jobsStatus: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobProfiles()
  }

  loadLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getJobProfiles = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const {selectedEmploymentTypes, salaryRange, searchInput} = this.state
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${selectedEmploymentTypes.join(
      ',',
    )}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response3 = await fetch(jobsUrl, options)
    if (response3.ok === false) {
      this.setState({jobsStatus: false, isLoading: false})
    } else {
      const data3 = await response3.json()
      const updatedData = data3.jobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsStatus: true,
        jobProfiles: updatedData || [],
        isLoading: false,
      })
    }
  }

  handleEmploymentTypeChange = event => {
    const {value, checked} = event.target
    this.setState(prevState => {
      const {selectedEmploymentTypes} = prevState
      if (checked) {
        return {selectedEmploymentTypes: [...selectedEmploymentTypes, value]}
      }
      return {
        selectedEmploymentTypes: selectedEmploymentTypes.filter(
          type => type !== value,
        ),
      }
    }, this.getJobProfiles)
  }

  onChangeSalary = event => {
    this.setState({salaryRange: event.target.value}, this.getJobProfiles)
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onKeyPressEnter = event => {
    if (event.key === 'Enter') {
      this.getJobProfiles()
    }
  }

  getProfileContainer = () => {
    const {profileData} = this.state
    return (
      <div className="profile-container">
        <img
          src={profileData.profile_image_url}
          alt="profile"
          className="profile-image"
        />
        <h3 className="profile-head">{profileData.name}</h3>
        <p className="profile-para">{profileData.short_bio}</p>
      </div>
    )
  }

  getFailedProfileContainer = () => (
    <div className="profile-fail-container">
      <button
        onClick={() => this.getProfileDetails()}
        type="button"
        className="retry-btn"
      >
        Retry
      </button>
    </div>
  )

  getJobProfilesFailContainer = () => (
    <div className="jobs-fail-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        onClick={() => this.getJobProfiles()}
        type="button"
        className="retry-btn"
      >
        Retry
      </button>
    </div>
  )

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response2 = await fetch(profileUrl, options)
    if (response2.ok === true) {
      const data2 = await response2.json()
      this.setState({
        profileData: data2.profile_details,
        profileStatus: true,
      })
    } else {
      this.setState({
        profileStatus: false,
      })
    }
  }

  getJobsProfiles = () => {
    const {jobProfiles, jobsStatus} = this.state

    if (jobsStatus === false) {
      return this.getJobProfilesFailContainer()
    }

    return (
      <ul className="jobItems-container">
        {jobProfiles.length === 0 ? (
          <div className="no-jobs-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="no-jobs-img"
            />
            <h1>No Jobs Found</h1>
            <p>We could not find any jobs. Try other filters.</p>
          </div>
        ) : (
          jobProfiles.map(job => (
            <li key={job.id}>
              <JobItem jobDetails={job} />
            </li>
          ))
        )}
      </ul>
    )
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props
    const {searchInput, isLoading, profileStatus} = this.state

    return (
      <div className="jobs">
        <Header />
        <div className="jobs-container">
          <div className="options-container">
            {profileStatus
              ? this.getProfileContainer()
              : this.getFailedProfileContainer()}
            <hr className="row" />
            <h3>Type of Employment</h3>
            {employmentTypesList.map(eachEmploymentType => (
              <div
                className="checkbox-div"
                key={eachEmploymentType.employmentTypeId}
              >
                <input
                  onClick={this.handleEmploymentTypeChange}
                  className="checkbox"
                  type="checkbox"
                  id={eachEmploymentType.employmentTypeId}
                  value={eachEmploymentType.employmentTypeId}
                />
                <label
                  className="label"
                  htmlFor={eachEmploymentType.employmentTypeId}
                >
                  {eachEmploymentType.label}
                </label>
              </div>
            ))}
            <hr className="row" />
            <h3>Salary Range</h3>
            {salaryRangesList.map(eachSalaryRange => (
              <div className="radio-div" key={eachSalaryRange.salaryRangeId}>
                <input
                  onChange={this.onChangeSalary}
                  className="radio"
                  name="salary"
                  type="radio"
                  id={eachSalaryRange.salaryRangeId}
                  value={eachSalaryRange.salaryRangeId}
                />
                <label
                  className="label"
                  htmlFor={eachSalaryRange.salaryRangeId}
                >
                  {eachSalaryRange.label}
                </label>
              </div>
            ))}
          </div>

          <div className="input-jobs-container">
            <div className="input-div">
              <input
                onKeyPress={this.onKeyPressEnter}
                value={searchInput}
                onChange={this.onChangeInput}
                placeholder="Search"
                className="input-control"
                type="search"
              />
              <div className="search-icon-container">
                <button
                  onClick={this.getJobProfiles}
                  className="search-btn"
                  type="button"
                  data-testid="searchButton"
                >
                  <FaSearch className="search-icon" />
                </button>
              </div>
            </div>
            {isLoading ? this.loadLoader() : this.getJobsProfiles()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
