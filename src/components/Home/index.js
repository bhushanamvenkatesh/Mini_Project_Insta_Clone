import {Component} from 'react'
import Cookies from 'js-cookie'
import UserStoriesSlider from '../UserStoriesSlider'
import Header from '../Header'
// import InstaContext from '../../Context/InstaContext'

class Home extends Component {
  state = {userStoriesList: [], postsDataStatusError: false, postsList: []}

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
    console.log(data)
    if (response.ok === true) {
      this.onGetPostsDataSuccess(data)
    } else {
      this.setState({postsDataStatusError: true})
    }
  }

  onGetPostsDataSuccess = data => {
    const lista = data.posts
    const totalPosts = data.total
    console.log(lista)
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
    this.setState({userStoriesList: formattedData})
  }

  renderStoriesSlider = () => {
    const {userStoriesList} = this.state

    return <UserStoriesSlider userStoriesList={userStoriesList} />
  }

  render() {
    return (
      <div className="home-container">
        <Header />
        {this.renderStoriesSlider()}
      </div>
    )
  }
}

export default Home
