import Show from "../models/Show.js";
import Booking from "../models/Booking.js";

//Function to check availabity of seats
const checkSeatAvailability = async (showId, selectedSeats) => {
    try{
        const showData = await Show.findById(showId)
        if(!showData) return false;

        const occupiedSeats = showData.occupiedSeats;

        const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);

        return !isAnySeatTaken;

    } catch (error) {
         console.log(error.message);
            return false;
    }
}


export const createBooking = async (req, res) =>{
    try{
       const { userId } = req.auth();
       const { showId, selectedSeats } = req.body;
       const { origin } = req.headers;

       //Check if seats are available
       const areSeatsAvailable = await checkSeatAvailability(showId, selectedSeats);

       if(!areSeatsAvailable){
        return res.status(400).json({ message: "Selected seats are already booked. Please choose different seats." });
       }
      // If Available, Get show data
       const showData = await Show.findById(showId).populate('movie');

       //Create a new Booking
       const booking = await Booking.create({
        user: userId,
        show: showId,
        amount: showData.price * selectedSeats.length,
        bookedSeats: selectedSeats
       })

       selectedSeats.map ((seat) => {
        showData.occupiedSeats[seat] = userId;
       })

       showData.markModified('occupiedSeats');
         await showData.save();

         //Stripe Gateway Initialization


         res.json({success: true, message: "Booking created successfully"});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getOccupiedSeats = async (req, res) => {
    try {
        const { showId } = req.params;
        const showData = await Show.findById(showId);

        const occupiedSeats = Object.keys(showData.occupiedSeats);

        res.json({ success: true , occupiedSeats });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}