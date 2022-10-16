import {Component} from 'react'
import Slider from 'react-slick'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'

/* Add css to your project */
import './index.css'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class UserStoriesSlider extends Component {
  renderSlider = () => {
    const {userStoriesList} = this.props

    return (
      <Slider {...settings}>
        {userStoriesList.map(eachLogo => {
          const {userId, userName, storyUrl} = eachLogo
          // console.log(eachLogo)
          return (
            <li className="item" key={userId}>
              <div className="story-image-container">
                <img className="story-image" src={storyUrl} alt="user story" />
              </div>

              <p>{userName}</p>
            </li>
          )
        })}
      </Slider>
    )
  }

  render() {
    return (
      <div className="main-container d-col">
        <div className="slick-container">{this.renderSlider()}</div>
      </div>
    )
  }
}

export default UserStoriesSlider
