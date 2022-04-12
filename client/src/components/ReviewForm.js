import React, {useEffect, useState} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import instance from '../axios';
import Youtube from 'react-youtube';
import axios from 'axios';

const ReviewForm =(props) =>{
    const {id} = useParams();
    const {review, setReview} = props;
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState([]);
    const [comment, setComment] = useState('');
    const [poster, setPoster] = useState('');
    const [trailer,setTrailer] = useState('');
    const [errors, setErrors] = useState([]);
    const [movie, setmovie] = useState({});
    const base_url = "https://image.tmdb.org/t/p/original";
    const navigate = useNavigate();
    const opts = {
        heigth:"400",
        width: "100%",
        playerVars:{
            
        }
    }
    useEffect(() =>{
        instance.get(`https://api.themoviedb.org/3/movie/${id}?api_key=57510183ff9bd9537c8abd46f8c71e19&language=en-US`)
        .then(result =>{
            setmovie(result.data)
        })
        .catch(err =>console.log(err))
    },[])
    useEffect(() =>{
        instance.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=57510183ff9bd9537c8abd46f8c71e19&language=en-US`)
        .then(result =>{
            console.log(result.data.results)
            setTrailer(result.data.results[0].key)
        })
        .catch(err =>console.log(err))
    },[])
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:8000/api/review",{title: movie.title,rating,comment,poster: movie.poster_path,trailer})
        .then(result =>{
            console.log(result.data)
            setReview([...review, result.data])
            console.log(review)
            navigate('/')
        })
        .catch(err => {
            console.log(err)
            const errArr =[];
            const errResponse = err.response.data.errors;
            for(const key of Object.keys(errResponse)){
                errArr.push(errResponse[key].message)
            }
            setErrors(errArr);
        })
        setComment('')
    }
    return(
        <div onSubmit={handleSubmit}>
            <img src={`${base_url}${movie.poster_path}`} alt=''></img>
            <Youtube videoId={trailer} opts={opts}/>
            <form>
                {errors.map((err, index) =><p key={index}>{err}</p>)}
                <label> Comment:</label>
                <input type={"text"} onChange={(e)=>{setComment(e.target.value)}}/>
                <div>
                    <img src='https://www.freeiconspng.com/thumbs/stars-png/star-png-image--star-png-image-4.png' alt='' onClick={(e) => setRating([1])}/>
                    <img src='https://www.freeiconspng.com/thumbs/stars-png/star-png-image--star-png-image-4.png' alt=''onClick={(e) => setRating([2,2])}/>
                    <img src='https://www.freeiconspng.com/thumbs/stars-png/star-png-image--star-png-image-4.png' alt=''onClick={(e) => setRating([3,3,3])}/>
                    <img src='https://www.freeiconspng.com/thumbs/stars-png/star-png-image--star-png-image-4.png' alt=''onClick={(e) => setRating([4,4,4,4])}/>
                    <img src='https://www.freeiconspng.com/thumbs/stars-png/star-png-image--star-png-image-4.png' alt=''onClick={(e) => setRating([5,5,5,5,5])}/>
                </div>
                <input type={'submit'}></input>
            </form>
        </div>
    )
}
export default ReviewForm;