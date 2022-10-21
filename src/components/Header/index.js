import './index.css'
import {Link, withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'

const Header = props => {
  const {onClickSearchInput, onClickSearch} = props

  const onClickSearchIcon = () => {
    onClickSearch()
  }

  const onChangeInput = event => {
    // console.log(event.target.value)
    onClickSearchInput(event.target.value)
  }

  const onClickLogOut = () => {
    const {history} = props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  return (
    <div className="nav-bar">
      <div className="logo-text-container">
        <Link to="/" className="logo-heading">
          <img
            src="https://res.cloudinary.com/dysfydgi3/image/upload/v1664437256/MINI_PROJECT/Header_insta_share_img_yqcg1x.png"
            alt="website logo"
          />
        </Link>
        <h1 className="insta-share-text">Insta Share</h1>
      </div>
      <div className="header-rem-options">
        <div className="search-container">
          <input
            type="search"
            placeholder="Search Caption"
            onChange={onChangeInput}
            className="search-input"
            // value={searchInput}
          />

          <button type="button">
            <FaSearch testid="searchIcon" onClick={onClickSearchIcon} />
          </button>
        </div>
        <ul className="nav-list">
          <li>
            <Link to="/" className="link-style">
              Home
            </Link>
          </li>

          <li>
            <Link to="/my-profile" className="link-style">
              Profile
            </Link>
          </li>
        </ul>
        <button className="logout-button" type="button" onClick={onClickLogOut}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
