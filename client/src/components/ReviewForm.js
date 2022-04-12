import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import instance from '../axios';

const ReviewForm =() =>{
    const {id} = useParams();
    const [movie, setmovie] = useState('');
    const base_url = "https://image.tmdb.org/t/p/original";
    useEffect(() =>{
        instance.get(`https://api.themoviedb.org/3/movie/${id}?api_key=57510183ff9bd9537c8abd46f8c71e19&language=en-US`)
        .then(result =>{
            setmovie(result.data)
        })
        .catch(err =>console.log(err))
    })
    return(
        <div>
            <img src={`${base_url}${movie.poster_path}`} alt=''></img>
        </div>
    )
}
export default ReviewForm;