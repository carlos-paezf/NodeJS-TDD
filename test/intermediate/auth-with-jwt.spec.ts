import { expect } from "chai";
import jwt from 'jsonwebtoken';
import { login, User } from "../../src/intermediate/auth-with-jwt";


describe( 'INTERMEDIATE - Autenticación con JSON Web Token (JWT)', () => {
    it( 'Debería lanzar un error de tipo Error', async () => {
        try {
            await login( null as any );
        } catch ( error: any ) {
            expect( error ).to.be.instanceOf( Error );
        }
    } );

    it( 'Debería lanzar un error para credenciales incorrectas', async () => {
        try {
            await login( null as any );
            expect.fail( 'Expected error to be thrown' );
        } catch ( error: any ) {
            expect( error.message ).to.equal( 'Credenciales invalidas' );
        }
    } );

    it( 'Debería generar un token válido para credenciales correctas', async () => {
        const user: User = { id: 1, username: 'user1', password: 'password1' };
        const token = await login( user );
        const decoded = jwt.verify( token, 'secret-key' );
        expect( decoded ).to.be.a( 'object' );
        expect( ( decoded as any ).id ).to.equal( user.id );
        expect( ( decoded as any ).username ).to.equal( user.username );
    } );
} );