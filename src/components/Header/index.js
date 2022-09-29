import './index.css'
import {Link, withRouter} from 'react-router-dom'
import {BiSearch} from 'react-icons/bi'

const Header = props => {
  console.log('g')

  const onClickSearchIcon = () => {}

  const onChangeInput = event => {
    console.log(event.target.value)
  }

  const onClickLogOut = () => {
    const {history} = props
    history.replace('./login')
  }

  return (
    <div className="nav-bar">
      <div className="logo-text-container">
        <img
          src="https://res.cloudinary.com/dysfydgi3/image/upload/v1664437256/MINI_PROJECT/Header_insta_share_img_yqcg1x.png"
          alt=""
          className=""
        />
        <p className="insta-share-text">Insta Share</p>
      </div>
      <div className="header-rem-options">
        <div className="search-container">
          <input
            type="search"
            placeholder="Search Caption"
            onChange={onChangeInput}
          />

          <BiSearch onClick={onClickSearchIcon} />
        </div>
        <ul className="nav-list">
          <Link to="./" className="link-style">
            <li>Home</li>
          </Link>
          <Link to="./profile" className="link-style">
            <li>Profile</li>
          </Link>
        </ul>
        <button className="logout-button" type="button" onClick={onClickLogOut}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
