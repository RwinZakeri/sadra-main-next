import Image from "next/image";
// Icon
import { IoMdQuote } from "react-icons/io";
// Styles
// import './CommentCard.css'
// I don't know |:
// import image from '/public/assets/prof.jpg'

const CommentCard = ({id , name , job , comment , image}) => {
  return (
    <div className='comment_card'>

      <div className='header'>
        <IoMdQuote style={{color : 'black' , width : 25 , fontSize : 50 }} />
        <div id='header-child'>

        <span>
        <p>{name}</p>
        <p>{job}</p>
        </span>

        <Image width={500} height={500} src={image} alt={image} />
        </div>
      </div>

      <div className='footer' dir='rtl'>
        <p>{comment}</p>
      </div>
    </div>
  )
}

export default CommentCard
