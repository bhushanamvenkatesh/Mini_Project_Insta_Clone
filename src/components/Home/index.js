import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import UserStoriesSlider from '../UserStoriesSlider'
import Header from '../Header'
import './index.css'
import EachPost from '../EachPost'
// import InstaContext from '../../Context/InstaContext'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const statusContstants = {
  initial: 'INITIAL',
  userStoriesSuccess: 'SUCCESS',
  userStoriesFailure: 'FAILURE',
  postSuccess: 'SUCCESS',
  postFailure: 'FAIL',
}

class Home extends Component {
  state = {
    userStoriesList: [],
    postsList: [],
    userStoriesStatus: statusContstants.initial,
    postsStatus: statusContstants.initial,
  }

  componentDidMount() {
    this.getHomeData()
    this.getPostsData()
  }

  getPostsData = async () => {
    const token = Cookies.get('jwt_token')
    const userStoriesUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(userStoriesUrl, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      this.onGetPostsDataSuccess(data)
    } else {
      this.setState({postsDataStatusError: true})
    }
  }

  getComments = comments => {
    const formattedComments = comments.map(each => ({
      userName: each.user_name,
      userId: each.user_id,
      comment: each.comment,
    }))
    return formattedComments
  }

  onGetPostsDataSuccess = data => {
    const postList = data.posts
    const totalPosts = data.total

    const formattedPostsList = postList.map(each => ({
      comments: this.getComments(each.comments),
      createdAt: each.created_at,
      likesCount: each.likes_count,
      postDetails: each.post_details,
      postId: each.post_id,
      profilePic: each.profile_pic,
      userId: each.user_id,
      userName: each.user_name,
    }))
    // console.log(formattedPostsList)
    this.setState({
      postsList: formattedPostsList,
      postsStatus: statusContstants.postSuccess,
    })
  }

  getHomeData = async () => {
    const token = Cookies.get('jwt_token')
    const userStoriesUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(userStoriesUrl, options)
    const data = await response.json()
    //  console.log(data)
    const usersStories = [...data.users_stories]

    const formattedData = usersStories.map(each => ({
      userId: each.user_id,
      userName: each.user_name,
      storyUrl: each.story_url,
    }))
    this.setState({
      userStoriesList: formattedData,
      userStoriesStatus: statusContstants.userStoriesSuccess,
    })
    if (response.ok !== true) {
      this.setState({userStoriesStatus: statusContstants.userStoriesFailure})
    }
  }

  renderLoader = () => (
    <div className="loader">
      <Loader type="TailSpin" colour="#00bfbfbf" height={50} width={50} />
    </div>
  )

  renderStoriesSlider = () => {
    const {userStoriesList, userStoriesStatus} = this.state

    switch (userStoriesStatus) {
      case 'SUCCESS':
        return <UserStoriesSlider userStoriesList={userStoriesList} />
      case 'FAIL':
        return <button>Retry</button>
      case 'INITIAL':
        return this.renderLoader()

      default:
        return null
    }
  }

  renderPosts = () => {
    const {postsList} = this.state
    console.log(postsList)
    return (
      <ul>
        {postsList.map(each => (
          <EachPost each={each} key={each.postId} />
        ))}
      </ul>
    )
  }

  renderPostsSection = () => {
    const {postsStatus} = this.state
    switch (postsStatus) {
      case 'INITIAL':
        return this.renderLoader()
      case 'SUCCESS':
        return this.renderPosts()
      case 'FAIL':
        return <button>Retry</button>

      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        <Header />
        {this.renderStoriesSlider()}
        {this.renderPostsSection()}
      </div>
    )
  }
}

export default Home
