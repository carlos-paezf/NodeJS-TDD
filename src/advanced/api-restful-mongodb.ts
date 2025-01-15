import express, { Request, Response } from 'express';
import mongoose from 'mongoose';


export const User = mongoose.model(
    'User',
    new mongoose.Schema( {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
    } )
);


const app = express();
app.use( express.json() );


app.post( '/users', async ( req: Request, res: Response ) => {
    const user = await User.create( req.body );
    res.status( 201 ).json( user );
} );


app.get( '/users', async ( req: Request, res: Response ) => {
    const users = await User.find();
    res.status( 200 ).json( users );
} );


export default app;