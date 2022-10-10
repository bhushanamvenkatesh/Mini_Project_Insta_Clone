import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import {AiFillCamera} from 'react-icons/ai'

import Header from '../Header'

class Profile extends Component {
  state = {profileData: [], isLoading: true}

  componentDidMount() {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    // const {match} = this.props
    //  const {params} = match
    // const {userId} = params
    const token = Cookies.get('jwt_token')
    // console.log(token)
    const url = `https://apis.ccbp.in/insta-share/my-profile`
    const options = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessProfile(data)
    }
  }

  onSuccessProfile = data => {
    const profile = {...data.profile}
    //  console.log(profile)

    const formattedData = {
      followersCount: profile.followers_count,
      followingCount: profile.following_count,
      id: profile.id,
      posts: profile.posts,
      postsCount: profile.posts_count,
      profilePic: profile.profile_pic,
      stories: profile.stories,
      userBio: profile.user_bio,
      userId: profile.user_id,
      userName: profile.user_name,
    }
    //  console.log(formattedData)

    this.setState({profileData: formattedData, isLoading: false})
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
          <img src={each.image} alt="post" className="post-image" />
        </li>
      ))}
    </ul>
  )

  renderPosts = () => {
    const {profileData} = this.state
    const {stories, posts} = profileData

    return (
      <>
        {this.getStories(stories)}
        <hr className="h-line" />
        <div className="grid-post">
          <BsGrid3X3 />
          <p className="padding">Posts</p>
        </div>
        {this.getPostsList(posts)}
      </>
    )
  }

  renderNoPostsView = () => (
    <>
      <div className="grid-post">
        <BsGrid3X3 />
        <p className="padding">Posts</p>
      </div>
      <div className="no-post-container">
        <div className="no-post-image">
          <AiFillCamera className="no-post-camera" />
        </div>

        <p className="no-posts">No Posts Yet</p>
      </div>
    </>
  )

  renderProfile = () => {
    const {profileData} = this.state
    const {
      profilePic,
      userName,
      postsCount,
      followersCount,
      followingCount,
      userId,
      userBio,
      posts,
      // stories,
    } = profileData
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
            <p className="padding user-name">{userName}</p>
            <div className="post-followers-following-count ">
              <p className="count padding">{`${postsCount} Posts`}</p>
              <p className="count padding">{`${followersCount} followers`}</p>
              <p className="count padding">{`${followingCount} following`}</p>
            </div>
            <p className="padding user-id">{userId}</p>
            <p className="padding">{userBio}</p>
          </div>
        </div>

        {posts.length > 0 ? this.renderPosts() : this.renderNoPostsView(posts)}
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader">
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
export default Profile
