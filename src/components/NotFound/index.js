import './index.css'

const NotFound = props => {
  const onClickHomePage = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="d-col">
      <img
        src="https://res.cloudinary.com/dysfydgi3/image/upload/v1664390698/MINI_PROJECT/NotFound_rkxrix.png"
        alt="page not found"
        className="not-found-image"
      />
      <h1>Page Not Found</h1>
      <p>
        we are sorry, the page you requested could not be found. Please go back
        to the homepage.
      </p>
      <button
        className="home-page-button"
        type="button"
        onClick={onClickHomePage}
      >
        Home Page
      </button>
    </div>
  )
}

export default NotFound
