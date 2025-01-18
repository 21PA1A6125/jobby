import Cookies from 'js-cookie'

import {Link, withRouter} from 'react-router-dom'
import {FaHome} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <ul className="header">
      <li>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-image"
          />
        </Link>
      </li>
      <li>
        <div className="routes-div">
          <Link className="route-link" to="/">
            <p className="routes-para">Home</p>
          </Link>
          <Link to="/jobs" className="route-link">
            <p className="routes-para">Jobs</p>
          </Link>
        </div>
      </li>
      <li>
        <button onClick={onClickLogout} type="button" className="logout-button">
          Logout
        </button>
      </li>

      <ul className="mobile-icons-div">
        <li>
          <Link className="route-link" to="/">
            <FaHome className="mobile-icon" />
          </Link>
        </li>
        <li>
          <Link className="route-link" to="/jobs">
            <BsBriefcaseFill className="mobile-icon" />
          </Link>
        </li>
        <li>
          <FiLogOut onClick={onClickLogout} className="mobile-icon" />
        </li>
      </ul>
    </ul>
  )
}

export default withRouter(Header)
