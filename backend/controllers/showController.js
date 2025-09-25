import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import Movie from '../models/Movie.js';
import Show from '../models/Show.js';


export const getNowPlayingMovies = async (req, res) =>{
    try{
        const { data } = await axios.get('https://api.themoviedb.org/3/movie/now_playing',
             { headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` } })
             const movies = data.results;
             res.json({success: true, movies: movies});
    } catch(error){
        res.status(500).json({message: error.message});
    }
}

//API to add a new show to database
export const addShow = async (req, res) => {
    try{
        const { movieId, showsInput, showPrice } = req.body;

        // Add validation
        if (!movieId || !showsInput || !showPrice) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing required fields: movieId, showsInput, and showPrice are required" 
            });
        }

        if (!Array.isArray(showsInput) || showsInput.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: "showsInput must be a non-empty array" 
            });
        }

        let movie = await Movie.findById(movieId);
        if(!movie){
           const[movieDetailsResponse, movieCreditsResponse] = 
           await Promise.all([axios.get(`https://api.themoviedb.org/3/movie/${movieId}`,
             { headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` } }),
             axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`,
             { headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` } })]);

             const movieApiData = movieDetailsResponse.data;
             const movieCreditsData = movieCreditsResponse.data;

             const movieDetails = {
                _id: movieId,
                title: movieApiData.title,
                overview: movieApiData.overview,
                poster_path: movieApiData.poster_path,
                backdrop_path: movieApiData.backdrop_path,
                genres: movieApiData.genres,
                release_date: movieApiData.release_date,
                original_language: movieApiData.original_language,
                tagline: movieApiData.tagline || "",
                vote_average: movieApiData.vote_average,
                runtime: movieApiData.runtime,
            
             }

             //Add movie to the database

             movie = await Movie.create(movieDetails);

        }

        const showsToCreate = [];
        showsInput.forEach(show => {
            const showDate = show.date;
            show.times.forEach(time => {
                const dateTimeString = `${showDate}T${time}`;
                showsToCreate.push({
                    movie: movieId,
                    showDateTime: new Date(dateTimeString),
                    showPrice,
                    occupiedSeats: {}
                });
            }) 
        });

            if(showsToCreate.length > 0){
                 await Show.insertMany(showsToCreate);
            }
            res.status(201).json({ success: true, message: "Show(s) added successfully" });
        } catch (error){
            res.status(500).json({message: error.message});
        }
    }