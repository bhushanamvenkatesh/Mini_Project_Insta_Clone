import './index.css'
import {BsHeartFill} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'

const EachPost = props => {
  const {each} = props
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

  return (
    <div className="post-container">
      <div className="profile-image-container">
        <img src={profilePic} alt="" className="profile-image" />
        <h1 className="user-name ">{userName}</h1>
      </div>
      <img src={formattedPostDetails.imageUrl} alt="" className="post-image" />
      <div className="post-details-container">
        <div className="icons">
          <BsHeartFill className="heart-icon" />
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
