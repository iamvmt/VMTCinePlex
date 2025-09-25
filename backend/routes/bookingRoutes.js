import express from 'express';
import { createBooking, getOccupiedSeats } from '../controllers/bookingController.js';


const bookingRouter = express.Router();

bookingRouter.post('/create', createBooking); 
bookingRouter.get('/seats/:showId',getOccupiedSeats ); //To get the seat layout of a particular show

export default bookingRouter;