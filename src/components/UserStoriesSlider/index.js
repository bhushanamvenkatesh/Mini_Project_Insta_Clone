import {Component} from 'react'
import Slider from 'react-slick'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'

/* Add css to your project */
import './index.css'

const companyLogosData = [
  {
    id: 'd14af630-5d22-4bfb-85dd-bb507b139b82',
    companyLogoUrl:
      'https://res.cloudinary.com/do4qwwms8/image/upload/v1639475819/Company%20Logos%20/netflix-img_keqbbh.png',
  },
  {
    id: '0a932287-8002-4fc8-95d1-8cbed3224e37',
    companyLogoUrl:
      'https://res.cloudinary.com/do4qwwms8/image/upload/v1639475818/Company%20Logos%20/facebook-img_fxqbxv.png',
  },
  {
    id: '8211ce0c-d7dc-4d2b-8468-5e48ad9ae985',
    companyLogoUrl:
      'https://res.cloudinary.com/do4qwwms8/image/upload/v1639475818/Company%20Logos%20/google-img_cnnaol.png',
  },
  {
    id: 'daa48153-3f16-4797-8469-5d63c9cba938',
    companyLogoUrl:
      'https://res.cloudinary.com/do4qwwms8/image/upload/v1639475818/Company%20Logos%20/zomato-img_gb1k9w.png',
  },
  {
    id: '2f4b518e-29b3-45c3-a7a5-80929f7898d9',
    companyLogoUrl:
      'https://res.cloudinary.com/do4qwwms8/image/upload/v1639475818/Company%20Logos%20/swiggy-img_jgxg6g.png',
  },
  {
    id: '895b9b4d-a283-4ee1-9fb8-933a3c4b449c',
    companyLogoUrl:
      'https://res.cloudinary.com/do4qwwms8/image/upload/v1639475818/Company%20Logos%20/amazon-img_yvggab.png',
  },
  {
    id: 'a8c67fd0-bab9-46ec-95de-cbfa2e3473f6',
    companyLogoUrl:
      'https://res.cloudinary.com/do4qwwms8/image/upload/v1639475818/Company%20Logos%20/flipkart-img_cb70ic.png',
  },
]

const settings = {
  dots: false,
  infinite: false,
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
  renderSlider = () => (
    <Slider {...settings}>
      {companyLogosData.map(eachLogo => {
        const {id, companyLogoUrl} = eachLogo
        return (
          <div key={id}>
            <img
              className="logo-image"
              src={companyLogoUrl}
              alt="company logo"
            />
            <p>Name</p>
          </div>
        )
      })}
    </Slider>
  )

  render() {
    return (
      <div className="main-container d-col">
        <div className="slick-container">{this.renderSlider()}</div>
      </div>
    )
  }
}

export default UserStoriesSlider
