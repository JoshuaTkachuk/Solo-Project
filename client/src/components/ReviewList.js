import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import instance from '../axios';
import '../styles/Home.css'
import '../styles/ReviewList.css'
import StarRatingComponent from 'react-star-rating-component';
import { VscStarFull } from "react-icons/vsc";
const ReviewList=(props)=>{
    const {review, setReview} = props;
    const navigate = useNavigate();
    const base_url = "https://image.tmdb.org/t/p/original";
    useEffect(() =>{
        axios.get("http://localhost:8000/api/review")
            .then(result =>{
                setReview(result.data)
                console.log(result.data)
            })
            .catch(err => console.log(err))
    }, [])
    const deleteItem=(itemId)=>{
        axios.delete('http://localhost:8000/api/delete/' + itemId)
                .then(result =>{
                    setReview(review.filter(review => review._id != itemId))
                })
                .catch(err => console.log(err))
    }
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
                    </div>
                </div>
                    {
                        review.length > 0?
                        <div>
                            {
                                review.map((item,index)=>{
                                    return <div key={index} className='review'>
                                        <img className='movie' src={`${base_url}${item.poster}`} alt='' onClick={(e) => navigate(`/view/${item._id}`)}></img>
                                        <div className='info'>
                                            <h2 style={{color:'white', textAlign:'right', margin:0}}>{item.title}</h2>
                                            <div>
                                                <StarRatingComponent editing={false} name={"stars"} starCount={5} value={item.rating} renderStarIcon={() => <VscStarFull/>}/>
                                            </div>
                                            <button className='delete-btn' onClick={(e) => deleteItem(item._id)}>Delete</button>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                        : <p style={{color:"white"}}>Looks like you've got no reviews</p>
                    }
            </div>
        </div>
    )
}

export default ReviewList