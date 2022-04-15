import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import Youtube from 'react-youtube';
import StarRatingComponent from 'react-star-rating-component';
import { VscStarFull } from "react-icons/vsc";
const Edit=() =>{
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState('');
    const [poster, setPoster] = useState('');
    const [trailer,setTrailer] = useState('');
    const [errors, setErrors] = useState([]);
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
    useEffect(()=>{
        axios.get("http://localhost:8000/api/review/" + id)
        .then(result =>{
            console.log(result.data)
            setTitle(result.data.title)
            setRating(result.data.rating)
            setComment(result.data.comment)
            setPoster(result.data.poster)
            setTrailer(result.data.trailer)
        })
        .catch(err => console.log(err))
    },[errors])
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.put("http://localhost:8000/api/edit/" + id, {title,rating,comment,poster,trailer})
        .then(result =>{
            console.log(result.data)
            navigate(`/view/${id}`);
        })
        .catch(err =>{
            console.log("=======")
                console.log(err.response.data.errors)
                console.log(rating)
                const errArr = [];
                const errResponse = err.response.data.errors;
                for(const key of Object.keys(errResponse)){
                    errArr.push(errResponse[key].message)
                }
                setErrors(errArr);
        })
        setTitle("")
        setRating("")
        setComment("")
        setPoster("")
        setTrailer("")
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
                        <Link className='myReviews' to={`/view/${id}`}>Back</Link>
                    </div>
                </div>
                <div className='formWrapper'>
                    <img className='movie-form-poster' src={`${base_url}${poster}`} alt=''></img>
                    <h2 style={{textAlign:"center", color:"white"}}>{title}</h2>
                    <Youtube videoId={trailer} opts={opts}/>
                    <form className='form' onSubmit={handleSubmit}>
                    <textarea value={comment} style={{resize:"none", width:"300px",height:"150px",backgroundColor:"black", border:"solid", borderColor:"#161b22", color:"white"}} onChange={(e)=>{setComment(e.target.value)}}/>
                        <StarRatingComponent editing={true} name={"stars"} starCount={5} value={rating} onStarClick={starClicked} renderStarIcon={() => <VscStarFull size={"100px"}/>}/>
                        <input className='submit-btn' type={'submit'}></input>
                    </form>
                </div>
                {errors.map((err, index) =><p style={{color:"white"}} key={index}>{err}</p>)}
            </div>
        </div>
    )
}
export default Edit