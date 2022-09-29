import {Component} from 'react'
import Cookies from 'js-cookie'
import UserStoriesSlider from '../UserStoriesSlider'
import Header from '../Header'

class Home extends Component {
  state = {userStoriesList: []}

  componentDidMount() {
    this.getHomeData()
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
    console.log(data)
    const usersStories = [...data.users_stories]

    const formattedData = usersStories.map(each => ({
      userId: each.user_id,
      userName: each.user_name,
      storyUrl: each.story_url,
    }))
    this.setState({userStoriesList: formattedData})
  }

  renderStoriesSlider = () => <UserStoriesSlider />

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
