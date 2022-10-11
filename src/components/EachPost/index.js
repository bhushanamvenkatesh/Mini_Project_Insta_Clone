import './index.css'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {Link} from 'react-router-dom'

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
  } = each
  const formattedPostDetails = {
    imageUrl: postDetails.image_url,
    caption: postDetails.caption,
  }

  const onClickHeartSymbol = () => {
    //  console.log(userId)
    onClickLike(userId)
  }

  return (
    <div className="post-container">
      <div className="profile-image-container">
        <img src={profilePic} alt="" className="profile-image" />
        <Link to={`users/${userId}`} className="user-id">
          <h1 className="user-name ">{userName}</h1>
        </Link>
      </div>
      <img src={formattedPostDetails.imageUrl} alt="" className="post-image1" />
      <div className="post-details-container">
        <div className="icons">
          <BsHeart className="heart-icon" onClick={onClickHeartSymbol} />
          <FaRegComment className="comment-icon " />
          <BiShareAlt className="share" />
        </div>
        <p className="likes">{`${likesCount} Likes`}</p>
        <p className="caption">{formattedPostDetails.caption}</p>
        <ul className="comments-list">
          {comments.map(eachComment => (
            <li key={eachComment.userId}>{eachComment.comment}</li>
          ))}
        </ul>
        <p className="time">{createdAt}</p>
      </div>
    </div>
  )
}

export default EachPost
