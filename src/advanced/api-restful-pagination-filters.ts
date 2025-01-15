import express, { Request, Response } from 'express';
import mongoose from 'mongoose';


export const Product = mongoose.model(
    'Product',
    new mongoose.Schema( {
        name: { type: String, required: true },
        category: { type: String, required: true },
    } )
);


const app = express();
app.use( express.json() );


app.get( '/products', async ( req: Request, res: Response ) => {
    const { page = 1, limit = 10, category } = req.query;

    const query = category ? { category } : {};
    const products = await Product.find( query )
        .skip( ( +page - 1 ) * +limit )
        .limit( Number( limit ) );
    const total = await Product.countDocuments( query );

    res.status( 200 ).json( { products, total } );
} );


export default app;