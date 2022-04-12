import React, {useEffect, useState} from 'react';
import instance from '../axios';
import '../Home.css'
import {Link} from 'react-router-dom';
const Home = () =>{
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
    const handleSubmit=(e) =>{
        e.preventDefault()
    }
    return(
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <input type={'search'} value={search} onChange={(e) => setSearch(e.target.value)}></input>
            </form>
            <div >
                <div className='movies'>
                    {
                        movies.length > 0 ?
                        movies.map((movie, index) => {
                            return (
                                <Link to={`/review/${movie.id}`}>
                                    <img key={index} className={movie.poster_path != null ? `movie`: null} src={movie.poster_path != null ? `${base_url}${movie.poster_path}`: null} alt={''} />
                                </Link>
                            )
                        })
                        : <p>search for a movie to see results</p>
                    }
                </div>
            </div>
        </div>
    )
}
export default Home