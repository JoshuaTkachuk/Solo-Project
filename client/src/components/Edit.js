import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import Youtube from 'react-youtube';
const Edit=() =>{
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState([]);
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
            navigate('/');
        })
        .catch(err =>{
            console.log("=======")
                console.log(err.response.data.errors)
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
        <div onSubmit={handleSubmit}>
            <Link to={`/view/${id}`}>cancel</Link>
            <img src={`${base_url}${poster}`} alt=''></img>
            <Youtube videoId={trailer} opts={opts}/>
            <form>
                {errors.map((err, index) =><p key={index}>{err}</p>)}
                <label> Comment:</label>
                <input type={"text"} value={comment} onChange={(e)=>{setComment(e.target.value)}}/>
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
export default Edit