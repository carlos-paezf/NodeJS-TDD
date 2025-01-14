import { expect } from "chai";
import { validateEmail } from "../../src/basic/validate-email";


describe( 'Validación de Email', () => {
    it( 'Debería retornar true para un email válido', () => {
        expect( validateEmail( 'test@example.com' ) ).to.be.true;
    } );

    it( 'Debería retornar false para email inválido', () => {
        expect( validateEmail( 'test.com' ) ).to.be.false;
    } );

    it( 'Debería retornar false si está vacío', () => {
        expect( validateEmail( '' ) ).to.be.false;
    } );
} );