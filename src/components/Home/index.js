import {Component} from 'react'

import {RiAlertFill} from 'react-icons/ri'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import UserStoriesSlider from '../UserStoriesSlider'
import Header from '../Header'
import H1 from '../NavBar'
import './index.css'
import EachPost from '../EachPost'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const statusContstants = {
  initial: 'INITIAL',
  userStoriesSuccess: 'SUCCESS',
  userStoriesFailure: 'FAILURE',
  postSuccess: 'SUCCESS',
  postFailure: 'FAIL',
  searchFailure: 'TRUE',
}

class Home extends Component {
  state = {
    userStoriesList: [],
    postsList: [],
    userStoriesStatus: statusContstants.initial,
    postsStatus: statusContstants.initial,
    searchInput: '',
    searchClicked: false,
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
      this.setState({postsStatus: statusContstants.postFailure})
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
    //  const totalPosts = data.total

    const formattedPostsList = postList.map(each => ({
      comments: this.getComments(each.comments),
      createdAt: each.created_at,
      likesCount: each.likes_count,
      postDetails: each.post_details,
      postId: each.post_id,
      profilePic: each.profile_pic,
      userId: each.user_id,
      userName: each.user_name,
      isLiked: false,
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
    <div className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  onClickUserStories = () => {
    this.getHomeData()
  }

  renderStoriesSlider = () => {
    const {userStoriesList, userStoriesStatus} = this.state

    switch (userStoriesStatus) {
      case 'SUCCESS':
        return <UserStoriesSlider userStoriesList={userStoriesList} />
      case 'FAIL':
        return (
          <button type="button" onClick={this.onClickUserStories}>
            Retry
          </button>
        )
      case 'INITIAL':
        return this.renderLoader()

      default:
        return null
    }
  }

  onClickLike = userId => {
    this.setState(prevState => ({
      postsList: prevState.postsList.map(each => {
        if (each.userId === userId) {
          //  console.log(prevState)
          return {
            ...each,

            isLiked: !each.isLiked,
          }
        }
        return each
      }),
    }))
  }

  renderPostsNotfoundview = () => (
    <div className="search-not-found-image">
      <img
        src="https://res.cloudinary.com/dysfydgi3/image/upload/v1665479977/MINI_PROJECT/SearchNotFound_u3ndza.png"
        alt="search not found"
        className="search-image"
      />
      <h1>Search Not Found</h1>
      <p className="try-different">Try different keyword or search again </p>
    </div>
  )

  renderPosts = () => {
    const {postsList} = this.state
    const postsLength = postsList.length

    return postsLength > 0 ? (
      <ul>
        {postsList.map(each => (
          <EachPost
            each={each}
            key={each.postId}
            onClickLike={this.onClickLike}
          />
        ))}
      </ul>
    ) : (
      this.renderPostsNotfoundview()
    )
  }

  onClickPostRetry = () => {
    this.getPostsData()
  }

  onClickSearchInput = value => {
    if (value === '') {
      this.setState({searchClicked: false})
      this.getPostsData()
    } else {
      this.setState({searchInput: value})
    }
  }

  onClickRetrySearchFailure = () => {
    this.onClickSearch()
  }

  renderPostFailure = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dysfydgi3/image/upload/v1665993040/MINI_PROJECT/SearchFailure_iupxnf.png"
        className=""
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button
        onClick={this.onClickRetrySearchFailure}
        className="retry-button"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderPostsSection = () => {
    const {postsStatus} = this.state
    switch (postsStatus) {
      case 'INITIAL':
        return this.renderLoader()
      case 'SUCCESS':
        return this.renderPosts()
      case 'FAIL':
        return (
          <div className="home-retry">
            <RiAlertFill className="alert-triangle" alt="failure view" />
            <p>Something went wrong.Please try again</p>
            <button
              type="button"
              className="retry-button"
              onClick={this.onClickPostRetry}
            >
              Retry
            </button>
          </div>
        )
      case 'TRUE':
        return this.renderPostFailure()

      default:
        return null
    }
  }

  renderSearchResult = data => {
    this.setState({postsStatus: statusContstants.postSuccess})
    const searchPosts = data.posts
    const formattedSearchPosts = searchPosts.map(each => ({
      comments: this.getComments(each.comments),
      createdAt: each.created_at,
      likesCount: each.likes_count,
      postDetails: each.post_details,
      postId: each.post_id,
      profilePic: each.profile_pic,
      userId: each.user_id,
      userName: each.user_name,
    }))

    // console.log(formattedSearchPosts)
    this.setState({postsList: formattedSearchPosts})
  }

  renderSearchFailure = () => {
    this.setState({postsStatus: statusContstants.searchFailure})
  }

  getSearchData = async () => {
    const {searchInput} = this.state
    const token = Cookies.get('jwt_token')
    const searchApi = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(searchApi, options)
    const data = await response.json()
    //  console.log(data)
    if (response.ok === true) {
      this.renderSearchResult(data)
    } else {
      this.renderSearchFailure()
    }
  }

  onClickSearch = () => {
    this.getSearchData()
    this.setState({postsStatus: statusContstants.initial, searchClicked: true})
    /* if (searchInput === '') {
      this.setState({searchClicked: false})
    } */
  }

  render() {
    const {searchClicked, searchInput} = this.state

    return (
      <div className="home-container">
        <Header
          onClickSearchInput={this.onClickSearchInput}
          onClickSearch={this.onClickSearch}
          searchInput={searchInput}
        />

        {searchClicked ? (
          <>
            <h1 className="search-result-heading">Search Results</h1>
            {this.renderPostsSection()}
          </>
        ) : (
          <>
            {this.renderStoriesSlider()}
            {this.renderPostsSection()}
          </>
        )}
      </div>
    )
  }
}

export default Home
