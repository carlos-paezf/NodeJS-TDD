import mongoose from "mongoose";
import app, { User } from "../../src/advanced/api-restful-mongodb";
import st_request from "supertest";
import { expect } from "chai";


process.loadEnvFile()

describe( 'ADVANCED - API RESTful con MongoDB', () => {
    const DB_URI = process.env.DB_URI

    before( async () => {
        await mongoose.connect( DB_URI! );
    } );

    after( async () => {
        await mongoose.connection.close();
    } );

    afterEach( async () => {
        await User.deleteMany( {} );
    } );

    it( 'Debería crear un usuario', async () => {
        const userData = { name: 'John Doe', email: 'john@example.com' };
        const response = await st_request( app ).post( '/users' ).send( userData );

        expect( response.status ).to.equal( 201 );
        expect( response.body.name ).to.equal( userData.name );
        expect( response.body.email ).to.equal( userData.email );
    } );

    it( 'Debería obtener la lista de usuarios', async () => {
        const user = await User.create( { name: 'Jane Doe', email: 'jane@example.com' } );
        const response = await st_request( app ).get( '/users' );
        expect( response.status ).to.equal( 200 );
        expect( response.body ).to.be.an( 'array' );
        expect( response.body ).to.have.length( 1 );
        expect( response.body[ 0 ].name ).to.equal( user.name );
    } );
} );