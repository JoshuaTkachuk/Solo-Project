import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import Youtube from 'react-youtube';
import '../styles/Home.css'
import '../styles/ReviewList.css'
import '../styles/View.css'
import StarRatingComponent from 'react-star-rating-component';
import { VscStarFull } from "react-icons/vsc";
const View =() =>{
    const [review, setReview] = useState({})
    const {id} = useParams();
    const base_url = "https://image.tmdb.org/t/p/original";
    useEffect(()=>{
        axios.get("http://localhost:8000/api/review/" + id)
        .then(result =>{
            console.log(result.data)
            setReview(result.data);
        })
        .catch(err => console.log(err))
    },[])
    return(
        <div className='wrapper'>
            <div className='page'>
                <div className='navBar'>
                    <div className='nav-left'>
                        <h1 style={{paddingRight:"15px"}}>Movie Critic</h1>
                        <img className='logo' src="https://www.mcicon.com/wp-content/uploads/2021/01/Music_Movie_1-copy-10.jpg"></img>
                    </div>
                    <div className='nav-right'>
                        <Link className='myReviews' to={'/'}>Home</Link>
                        <Link className='myReviews' to={'/reviews'}>My Reviews</Link>
                    </div>
                </div>
                <div className='card'>
                    <img className='movie-view' src={`${base_url}${review.poster}`} alt=''></img>
                    <div className='card-right'>
                        <h1 style={{color:'white', fontSize:'60px', margin:0}}>{review.title}</h1>
                        <div className='starView'>
                            <StarRatingComponent editing={false} name={"stars"} starCount={5} value={review.rating} renderStarIcon={() => <VscStarFull size={"100px"}/>}/>
                        </div>
                        <p className='comment' style={{color:'white'}}>{review.comment}</p>
                        <Link className='edit-btn' to={`/edit/${review._id}`}> edit </Link>
                    </div>
                </div>
                <Youtube className='video' videoId={review.trailer} />
            </div>
        </div>
    )
}
export default View