import { FaStar } from 'react-icons/fa'
import './Review.css'
import Homepage from './Homepage.js'
import { useState } from 'react'


function Review() {
  const [rating, setRating] = useState(null);
  const[hover, setHover] = useState(null);
  return (
   <p className="Review">
      {[...Array(5)].map((review, index) => {
     const currentRating = index + 1;
     return(
        <label>
         <input
         type = "radio"
         name = "rating"
         value ={currentRating}
         onClick = {() => setRating(currentRating) }
         />
         <FaStar
         className = 'review'
         size = {100}
         color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
         onMouseEnter={() => setHover(currentRating)}

         />;
        </label>
      )
     })

     }
       <h1>How Satisfy Are You {rating}</h1>
    </p>




 )
}

export default Review;