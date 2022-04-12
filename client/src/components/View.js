import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import Youtube from 'react-youtube';
const View =() =>{
    const [review, setReview] = useState({})
    const [rating ,setRating] = useState([])
    const {id} = useParams();
    const base_url = "https://image.tmdb.org/t/p/original";
    const opts = {
        heigth:"400",
        width: "100%",
        playerVars:{
            
        }
    }
    useEffect(()=>{
        axios.get("http://localhost:8000/api/review/" + id)
        .then(result =>{
            console.log(result.data)
            setReview(result.data);
            setRating(result.data.rating);
        })
        .catch(err => console.log(err))
    },[])
    console.log(rating)
    return(
        <div>
            <h1>{review.title}</h1>
            <Link to={`/edit/${review._id}`}> edit </Link>
            <Link to={`/`}> Home </Link>
            <img src={`${base_url}${review.poster}`} alt=''></img>
            {
                rating.length > 0?
                    rating.map((star,index)=>{
                        return <img key={index} src='https://www.freeiconspng.com/thumbs/stars-png/star-png-image--star-png-image-4.png' alt=''/>
                        })
                :null
            }
            <p>{review.comment}</p>
            <Youtube videoId={review.trailer} opts={opts}/>
        </div>
    )
}
export default View