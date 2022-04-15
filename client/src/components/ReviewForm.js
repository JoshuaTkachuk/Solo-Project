import React, {useEffect, useState} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import instance from '../axios';
import Youtube from 'react-youtube';
import axios from 'axios';
import '../styles/Home.css'
import '../styles/ReviewList.css'
import '../styles/View.css'
import '../styles/Form.css'
import StarRatingComponent from 'react-star-rating-component';
import { VscStarFull } from "react-icons/vsc";

const ReviewForm =(props) =>{
    const {id} = useParams();
    const {review, setReview} = props;
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(null);
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
    const starClicked = (nextValue,prevValue,name)=>{
        setRating(nextValue);
    }
    useEffect(() =>{
        instance.get(`https://api.themoviedb.org/3/movie/${id}?api_key=57510183ff9bd9537c8abd46f8c71e19&language=en-US`)
        .then(result =>{
            console.log(result.data)
            setmovie(result.data)
        })
        .catch(err =>console.log(err))
    },[])
    useEffect(() =>{
        instance.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=57510183ff9bd9537c8abd46f8c71e19&language=en-US`)
        .then(result =>{
            setTrailer(result.data.results[0].key)
        })
        .catch(err =>console.log(err))
    },[])
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:8000/api/review",{title: movie.title,rating,comment,poster: movie.poster_path,trailer, desc: movie.overview})
        .then(result =>{
            console.log(result.data)
            setReview([...review, result.data])
            console.log(review)
            navigate(`/reviews`);
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
        setComment('');
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
                <div className='formWrapper'>
                    <img className='movie-form-poster' src={`${base_url}${movie.poster_path}`} alt=''></img>
                    <h2 style={{textAlign:"center", color:"white"}}>{movie.title}</h2>
                    <Youtube videoId={trailer} opts={opts}/>
                    <form style={{display:"flex", flexDirection:"column", alignItems:"center"}} onSubmit={handleSubmit}>
                        <div className='form'>
                            <textarea placeholder='Leave A Review' style={{resize:"none", width:"300px",height:"150px",backgroundColor:"black", border:"solid", borderColor:"#161b22", color:"white"}} onChange={(e)=>{setComment(e.target.value)}}/>
                            <StarRatingComponent editing={true} name={"stars"} starCount={5} value={rating} onStarClick={starClicked} renderStarIcon={() => <VscStarFull size={"100px"}/>}/>
                        </div>
                        <input className='submit-btn' type={'submit'}></input>
                    </form>
                </div>
                {errors.map((err, index) =><p style={{color:"white"}} key={index}>{err}</p>)}
            </div>
        </div>
    )
}
export default ReviewForm;