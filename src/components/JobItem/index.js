import {Link} from 'react-router-dom'
import {IoStar, IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    companyLogoUrl,
    location,
    employmentType,
    rating,
    packagePerAnnum,
    jobDescription,
  } = jobDetails

  return (
    <Link className="link" to={`/jobs/${id}`}>
      <div className="job-item-container">
        <div className="logo-div">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="company-logo-content-div">
            <p className="title">{title}</p>
            <div className="star-div">
              <IoStar className="star" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-type-salary-div">
          <div className="icons-div">
            <div className="icon-div">
              <IoLocationSharp size={20} className="type-icon" />
              <p>{location}</p>
            </div>
            <div className="icon-div">
              <BsFillBriefcaseFill size={20} className="type-icon" />
              <p>{employmentType}</p>
            </div>
          </div>
          <div>
            <p className="salary">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="rowh" />
        <h3 className="desc">Description</h3>
        <p className="desc">{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobItem
