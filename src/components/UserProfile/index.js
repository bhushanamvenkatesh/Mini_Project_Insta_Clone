import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
// import {each} from 'cheerio/lib/api/traversing'
import Header from '../Header'

class UserProfile extends Component {
  state = {userProfile: [], isLoading: true}

  componentDidMount() {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    const {match} = this.props
    const {params} = match
    const {userId} = params
    const token = Cookies.get('jwt_token')
    // console.log(token)
    const url = `https://apis.ccbp.in/insta-share/users/${userId}`
    const options = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessUserProfile(data)
    } else {
      this.onFailUserProfile()
    }
  }

  onSuccessUserProfile = data => {
    const userDetails = {...data.user_details}
    // console.log(userDetails)

    const formattedData = {
      followersCount: userDetails.followers_count,
      followingCount: userDetails.following_count,
      id: userDetails.id,
      posts: userDetails.posts,
      postsCount: userDetails.posts_count,
      profilePic: userDetails.profile_pic,
      stories: userDetails.stories,
      userBio: userDetails.user_bio,
      userId: userDetails.user_id,
      userName: userDetails.user_name,
    }
    // console.log(formattedData.posts, formattedData.stories)

    this.setState({userProfile: formattedData, isLoading: false})
    // console.log(stories)
  }

  getStories = stories => (
    <ul className="post-list">
      {stories.map(each => (
        <li key={each.id} className="each-image">
          <img src={each.image} alt="user story" className="story-image" />
        </li>
      ))}
    </ul>
  )

  getPostsList = posts => (
    <ul className="post-list">
      {posts.map(each => (
        <li key={each.id}>
          <img src={each.image} alt="user post" className="post-image" />
        </li>
      ))}
    </ul>
  )

  renderNoPostsView = () => (
    <>
      
      <div className="no-post-container">
        <div className="no-post-image">
          <BiCamera className="no-post-camera" />
        </div>

        <h1 className="no-posts">No Posts</h1>
      </div>
    </>
  )

  renderProfile = () => {
    const {userProfile} = this.state
    const {
      profilePic,
      userName,
      postsCount,
      followersCount,
      followingCount,
      userId,
      userBio,
      posts,
      stories,
    } = userProfile

    return (
      <div className="profile-details">
        <div className="profile-pic-details">
          <div className="user-image-container">
            <img
              src={profilePic}
              alt="user profile"
              className="profile-image1"
            />
          </div>

          <div className="user-details">
            <h1 className="padding user-name">{userName}</h1>
            <div className="post-followers-following-count ">
              <p className="count padding">{`${postsCount} Posts`}</p>
              <p className="count padding">{`${followersCount} followers`}</p>
              <p className="count padding">{`${followingCount} following`}</p>
            </div>
            <p className="padding user-id">{userId}</p>
            <p className="padding">{userBio}</p>
          </div>
        </div>
        {this.getStories(stories)}
        <hr className="h-line" />
        <div className="grid-post">
          <BsGrid3X3 />
          <h1 className="padding posts-heading">Posts</h1>
        </div>

        {posts.length > 0
          ? this.getPostsList(posts)
          : this.renderNoPostsView(posts)}
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader" testid="loader">
      <Loader type="TailSpin" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="user-profile-container">
        <Header />
        {isLoading ? this.renderLoader() : this.renderProfile()}
      </div>
    )
  }
}
export default UserProfile
