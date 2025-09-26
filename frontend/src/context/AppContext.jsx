import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import {useAuth} from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000/api";

export const AppContext = createContext()

export const AppProvider = ({children}) => {

    const [isAdmin, setIsAdmin] = useState(false);
    const [shows, setShows] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const {user} = useUser();
    const {getToken} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const fetchIsAdmin = async () => { // Remove req, res parameters
        try {
            const {data} = await axios.get('/api/admin/is-admin', { // Fixed URL
                headers: {Authorization: `Bearer ${await getToken()}`}
            });
            
            setIsAdmin(data.isAdmin);

            if(!data.isAdmin && location.pathname.startsWith('/admin')){
                navigate('/');
                toast.error("Access Denied");
            }
        } catch (error) {
            console.log(error.message);   
            setIsAdmin(false); // Set to false on error
            if(location.pathname.startsWith('/admin')){
                navigate('/');
                toast.error("Access Denied");
            }
        }
    }

    const fetchShows = async () => {
        try {
            const { data } = await axios.get('/api/show/all');
            if(data.success){
                setShows(data.shows);
            } else {
                toast.error(data.message);
            }
            
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    const fetchFavoriteMovies = async () => {
        try {
            const { data } = await axios.get('/api/user/favorites', {headers:
                 {Authorization: `Bearer ${await getToken()}`}});

                 if (data.success) {
                    setFavoriteMovies(data.movies);
                 } else {
                    toast.error(data.message);
                 }
            
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    useEffect (() => {
        fetchShows();
    })

    useEffect (() => {
        if(user){
            fetchIsAdmin();
            fetchFavoriteMovies();
        }
    }, [user, location.pathname])

    const value = {axios,
        fetchIsAdmin,
        user, getToken, navigate, isAdmin, shows,
        favoriteMovies, fetchFavoriteMovies
    }

    return (
        <AppContext.Provider value = {value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);

