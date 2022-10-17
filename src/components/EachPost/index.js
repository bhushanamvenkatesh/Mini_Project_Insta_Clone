import './index.css'
import {BsHeart, BsHeartFill} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

const EachPost = props => {
  const {each, onClickLike} = props
  // console.log(each)
  const {
    comments,
    createdAt,
    likesCount,
    profilePic,
    userId,
    userName,
    postDetails,
    isLiked,
    postId,
  } = each
  const formattedPostDetails = {
    imageUrl: postDetails.image_url,
    caption: postDetails.caption,
  }

  const likeApiCall = async () => {
    const token = Cookies.get('jwt_token')

    const data = {
      like_status: isLiked,
    }

    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`

    const options = {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
    const response = await fetch(url, options)
    const data1 = await response.json()
    console.log(data1)
  }

  const onClickHeartSymbol = () => {
    //  console.log(userId)
    onClickLike(userId)
    likeApiCall()
  }

  const likes = isLiked ? likesCount + 1 : likesCount

  return (
    <li className="post-container" key={each.postId}>
      <div className="profile-image-container">
        <img
          src={profilePic}
          alt="post author profile"
          className="profile-image"
        />
        <Link to={`users/${userId}`} className="user-id">
          <span>
            <h1 className="user-name ">{userName}</h1>
          </span>
        </Link>
      </div>
      <img
        src={formattedPostDetails.imageUrl}
        alt="post"
        className="post-image1"
      />
      <div className="post-details-container">
        <div className="icons">
          <button
            onClick={onClickHeartSymbol}
            type="button"
            className="like-button"
            testid="likeIcon"
          >
            {isLiked ? (
              <BsHeartFill className="heart-icon" testid="likeIcon" />
            ) : (
              <BsHeart className="heart-icon" testid="unLikeIcon" />
            )}
          </button>
          <FaRegComment className="comment-icon " />
          <BiShareAlt className="share" />
        </div>
        <p className="likes">{`${likes} Likes`}</p>
        <p className="caption">{formattedPostDetails.caption}</p>
        <ul className="comments-list">
          {comments.map(eachComment => (
            <li key={eachComment.userId}>
              <p>{eachComment.comment}</p>
            </li>
          ))}
        </ul>
        <p className="time">{createdAt}</p>
      </div>
    </li>
  )
}

export default EachPost
