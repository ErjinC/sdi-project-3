import { FaStar } from 'react-icons/fa'
import './Stars.css'
import Homepage from './Homepage.js'
import { useState } from 'react'


function Stars() {
   const [rating, setRating] = useState(null);
  return (
   <div className="Review">
     {[...Array(5)].map(star, index) => {
    const currentRating = index + 1;
     return(
        <label>
             <input
             type = "radio"
             name = "rating"
             value ={currentRating}
             onClick = {() => setRating(currentRating) }
          />
              <FaStar className = 'star' size = {50} />;
        </label>
      );

     })}

  </div>

  )
})

export default Stars;