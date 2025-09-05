import {Inngest} from "inngest";
import user from "../models/user.js";


// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

//Inggest function to save user data to database
const syncUserCreation = inngest.createFunction(
    {id: 'sync-user-from-clerk'},
    {event: 'clerk/user.created'},
    async ({ event })=>{
     const {id, first_name, last_name, email_addresses, image_url} = event.data;
     const userData = {
        _id: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        image: image_url
     }
     await user.create(userData);
    }
)


//Inngest function to delete user data from database
const syncUserDeletion = inngest.createFunction(
    {id: 'delete-user-with-clerk'},
    {event: 'clerk/user.deleted'},
    async ({ event })=>{
     const {id} = event.data;
     await user.findByIdAndDelete(id);
    }
)

//Inngest function to update user data in database
const syncUserUpdation = inngest.createFunction(
    {id: 'update-user-from-clerk'},
    {event: 'clerk/user.deleted'},
    async ({ event })=>{
       const {id, first_name, last_name, email_addresses, image_url} = event.data;
        const userData = {
        _id: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        image: image_url
     }
     await user.findbyIdAndUpdate(id, userData);
       
    }
)



// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation,
     syncUserDeletion,
     syncUserUpdation
];