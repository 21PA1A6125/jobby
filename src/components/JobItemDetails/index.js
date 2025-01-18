import {Component} from 'react'
import {IoStar, IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FaExternalLinkAlt} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

class JobItemDetails extends Component {
  state = {
    isLoading: true,
    apiStatus: true,
    jobItemData: null,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  loadLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = {
        id: data.job_details.id,
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: data.job_details.life_at_company,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills,
        title: data.job_details.title,
        similarJobs: data.similar_jobs,
      }
      this.setState({
        apiStatus: true,
        isLoading: false,
        jobItemData: updatedData,
      })
    } else {
      this.setState({isLoading: false, apiStatus: false}, this.getApiFail())
    }
  }

  getApiFail = () => (
    <div className="api-fail-container">
      <img
        className="api-fail-image"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are lookin for.</p>
      <button
        type="button"
        onClick={() => this.getJobItemDetails()}
        className="retry-btn"
      >
        Retry
      </button>
    </div>
  )

  getData = () => {
    const {apiStatus, jobItemData} = this.state
    if (apiStatus === false) {
      return this.getApiFail()
    }
    return (
      <div>
        <div className="job-item-container">
          <div className="company-logo-div">
            <img
              className="company-logo"
              alt=" job details company logo"
              src={jobItemData.companyLogoUrl}
            />
            <div className="company-logo-container">
              <h3>{jobItemData.title}</h3>
              <div className="star-div">
                <IoStar className="star" />
                <p className="star-rating">{jobItemData.rating}</p>
              </div>
            </div>
          </div>
          <div className="location-type-salary-div">
            <div className="icons-div">
              <div className="icon-div">
                <IoLocationSharp size={20} className="type-icon" />
                <p>{jobItemData.location}</p>
              </div>
              <div className="icon-div">
                <BsFillBriefcaseFill size={20} className="type-icon" />
                <p>{jobItemData.employmentType}</p>
              </div>
            </div>
            <div>
              <p className="salary">{jobItemData.packagePerAnnum}</p>
            </div>
          </div>
          <hr className="rowh" />
          <div className="description-link-div">
            <h1>Description</h1>
            <div className="link-container">
              <h3>Visit</h3>
              <a className="ext-link" href={jobItemData.companyWebsiteUrl}>
                <FaExternalLinkAlt />
              </a>
            </div>
          </div>
          <p className="desc-g">{jobItemData.job_description}</p>
          <h1>Skills</h1>
          <div className="skills-container">
            {jobItemData.skills.map(eachSkill => (
              <div key={eachSkill.name} className="skill-item-container">
                <img
                  src={eachSkill.image_url}
                  alt={eachSkill.name}
                  className="skill-image"
                />
                <p>{eachSkill.name}</p>
              </div>
            ))}
          </div>
          <h1>Life At Company</h1>
          <div className="life-at-company-div">
            <p className="life-para">{jobItemData.lifeAtCompany.description}</p>
            <div className="life-image-div">
              <img
                className="life-image"
                alt="life at company"
                src={jobItemData.lifeAtCompany.image_url}
              />
            </div>
          </div>
        </div>
        <h1>Similar Jobs</h1>
        <div className="similar-jobs-container">
          {jobItemData.similarJobs.map(eachSimilarJob => (
            <div key={eachSimilarJob.id} className="similar-job-item-container">
              <div className="company-logo-div">
                <img
                  className="company-logo"
                  alt=" job details company logo"
                  src={eachSimilarJob.company_logo_url}
                />
                <div className="company-logo-container">
                  <h3>{eachSimilarJob.title}</h3>
                  <div className="star-div">
                    <IoStar className="star" />
                    <p className="star-rating">{eachSimilarJob.rating}</p>
                  </div>
                </div>
              </div>
              <h3>Description</h3>
              <p>{eachSimilarJob.job_description}</p>
              <div className="icons-div">
                <div className="icon-div">
                  <IoLocationSharp size={20} className="type-icon" />
                  <p>{eachSimilarJob.location}</p>
                </div>
                <div className="icon-div">
                  <BsFillBriefcaseFill size={20} className="type-icon" />
                  <p>{eachSimilarJob.employment_type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  render() {
    const {isLoading, apiStatus} = this.state

    if (isLoading) {
      return this.loadLoader()
    }

    if (!apiStatus) {
      return this.getApiFail()
    }

    return (
      <div className="jobs">
        <Header />
        <div className="job-item-details-container">{this.getData()}</div>
      </div>
    )
  }
}

export default JobItemDetails
