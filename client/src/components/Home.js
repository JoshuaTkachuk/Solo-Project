import React, {useEffect, useState} from 'react';
import instance from '../axios';
import '../styles/Home.css'
import {Link} from 'react-router-dom';
const Home = () =>{
    const [input, setInput] = useState('');
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const base_url = "https://image.tmdb.org/t/p/original";
    useEffect(() => {
        instance.get(`https://api.themoviedb.org/3/search/movie?api_key=57510183ff9bd9537c8abd46f8c71e19&language=en-US&query=${search}&page=1&include_adult=false`)
            .then(list => {
                setMovies(list.data.results);
            })
            .catch(err => console.log(err))
    }, [search])
    useEffect(() => {
        instance.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=57510183ff9bd9537c8abd46f8c71e19&language=en-US&page=1`)
            .then(list => {
                setMovies(list.data.results);
            })
            .catch(err => console.log(err))
    }, [])
    const handleSubmit=(e) =>{
        setSearch(input);
        e.preventDefault()
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
                        <Link className='myReviews' to={'/reviews'}>My Reviews</Link>
                        <form onSubmit={handleSubmit}>
                            <input className="search "type={'search'} placeholder={'search'} value={input} onChange={(e) => setInput(e.target.value)}></input>
                        </form>
                    </div>
                </div>
                <div className='movies'>
                    {
                        movies.length > 0 ?
                        movies.map((movie, index) => {
                            return (
                                <Link to={`/review/${movie.id}`} key={index}>
                                    <img className={movie.poster_path != null ? `movie`: null} src={movie.poster_path != null ? `${base_url}${movie.poster_path}`: null} alt={''} />
                                </Link>
                            )
                        })
                        :<h2 style={{textAlign:"center", color:"white"}}>No results</h2>
                    }
                </div>
            </div>
        </div>
    )
}
export default Home