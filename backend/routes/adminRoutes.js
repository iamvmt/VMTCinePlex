import express from 'express';
import { protectAdmin } from '../middleware/auth.js';
import { isAdmin, getDashboardData, getAllShows, getAllBookings } from '../controllers/adminController.js';


const adminRouter = express.Router();

adminRouter.get('/is-admin', protectAdmin, isAdmin); //To check if the user is admin
adminRouter.get('/dashboard', protectAdmin, getDashboardData); //To get dashboard data
adminRouter.get('/all-shows', protectAdmin, getAllShows); //To get all shows
adminRouter.get('/all-bookings', protectAdmin, getAllBookings); //To get all bookings

export default adminRouter;