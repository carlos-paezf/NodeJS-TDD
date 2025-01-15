import mongoose from "mongoose";
import st_request from "supertest";
import app, { Product } from "../../src/advanced/api-restful-pagination-filters";
import { expect } from "chai";


process.loadEnvFile();

const insertProducts = async () => {
    await Product.insertMany( [
        { name: 'Product 1', category: 'A' },
        { name: 'Product 2', category: 'B' },
        { name: 'Product 3', category: 'A' },
    ] );
};

describe( 'ADVANCED - API RESTful con Paginación y Filtros', () => {
    const DB_URI = process.env.DB_URI;

    before( async () => {
        await mongoose.connect( DB_URI! );
    } );

    after( async () => {
        await mongoose.connection.close();
    } );

    afterEach( async () => {
        await Product.deleteMany( {} );
    } );

    it( 'Debería devolver productos con paginación', async () => {
        await insertProducts();

        const response = await st_request( app ).get( '/products?page=1&limit=2' );
        expect( response.status ).to.equal( 200 );
        expect( response.body.products ).to.have.length( 2 );
        expect( response.body.total ).to.equal( 3 );
    } );

    it( 'Debería filtrar productos por categoría', async () => {
        await insertProducts();

        const response = await st_request( app ).get( '/products?category=A' );
        expect( response.status ).to.equal( 200 );
        expect( response.body.products ).to.have.length( 2 );
    } );
} );
