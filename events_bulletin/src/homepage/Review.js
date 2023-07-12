import { FaStar } from 'react-icons/fa'
import './Review.css'
import Homepage from './Homepage.js'
import { useState, useEffect } from 'react'

function Review() {
  const [rating, setRating] = useState(null);
  const[hover, setHover] = useState(null);
  const [reviewDetails, setReviewDetails] = useState('');
  const [pastReviews, setPastReviews] = useState(false);
  const [dummy, setDummy] = useState(true)

  useEffect(()=>{
   fetch('http://localhost:8081/reviews')
      .then(res => res.json())
      .then(data => setPastReviews(data))
      .then(()=> console.log('crap'))
  }, [dummy])

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

         />
        </label>
      )
     })

     }
       <h2>How Satisfied Are You? </h2>
       <h2> {rating} {(rating>1)?'Stars':(rating==1)?'Star':''}</h2>
       <section id="input">
         <textarea id='reviewBody' type='text' placeholder='Leave a comment'  onChange={e => setReviewDetails(e.target.value)}/>
         <button className="subButton" onClick = {() => {
            let currentdate = new Date();
            let datetime =  (currentdate.getMonth()+1)  + "/"
                           + currentdate.getDate() + "/"
                           + currentdate.getFullYear() + " @ "
                           + currentdate.getHours() + ":"
                           + currentdate.getMinutes() + ":"
                           + currentdate.getSeconds();
            let resBody = [{
               "stars": rating,
               "review": reviewDetails,
               "posted": datetime

            }]
         // create fetch init object
         const init = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(resBody)
         };



         fetch('http://localhost:8081/reviews', init)
            // .then(response => response.json())
            .then(data => console.log(data))
            .catch((error) => console.error('Error:', error))
            .then(()=>setDummy(!dummy))

         }}>Submit Review</button>
       </section>

       <section className='pastReviews'>
         <h2>Past User Reviews</h2>
         {(pastReviews) ? pastReviews.toReversed().map((review, index) => {
            return (
               <article className='singleReview'>
                  <h3>Stars: {review.stars}</h3>
                  <p>Posted: {review.posted}</p>
                  <p>{review.review}</p>
               </article>
            )
         }) : <p></p>
         }
       </section>


    </p>




 )
}

export default Review;