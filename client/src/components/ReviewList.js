import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import instance from '../axios';
const ReviewList=(props)=>{
    const {review, setReview} = props;
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
        <div>
            <Link to={'/'}>Home</Link>
            {
                review.length > 0?
                <div>
                    {
                        review.map((item,index)=>{
                            return <div key={index}>
                                <img src={`${base_url}${item.poster}`} alt=''></img>
                                <h2>{item.title}</h2>
                                <Link to={`/view/${item._id}`}> view </Link>
                                <button onClick={(e) => deleteItem(item._id)}>Delete</button>
                            </div>
                        })
                    }
                </div>
                : <p>loading...</p>
            }
        </div>
    )
}

export default ReviewList