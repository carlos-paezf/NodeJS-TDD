import { expect } from "chai";
import ArithmeticOperations from "../../src/basic/arithmetic-operations";


describe( 'Operaciones Aritméticas', () => {
    const artOp = new ArithmeticOperations();

    it( 'Debería sumar dos números correctamente', () => {
        expect( artOp.add( 2, 3 ) ).to.equal( 5 );
    } );

    it( 'Debería retornar 0 si ambos números son 0', () => {
        expect( artOp.add( 0, 0 ) ).to.equal( 0 );
    } );

    it( 'Debería retornar un número negativo al restar 2 números negativos', () => {
        expect( artOp.subtract( -2, -3 ) ).to.equal( 1 );
    } );

    it( 'Debería retornar un 0 si ambos números son iguales', () => {
        expect( artOp.subtract( 2, 2 ) ).to.equal( 0 );
    } );

    it( 'Debería multiplicar 2 números de 3 dígitos correctamente', () => {
        expect( artOp.multiply( 123, 456 ) ).to.equal( 56088 );
    } );

    it( 'Debería retornar un 0 al multiplicar un número por 0', () => {
        expect( artOp.multiply( 123, 0 ) ).to.equal( 0 );
    } );

    it( 'Debería retornar un decimal al dividir un número impar entre uno par', () => {
        expect( artOp.divide( 55, 2 ) ).to.equal( 27.5 );
    } );

    it( 'Debería retornar un error al intentar dividir por 0', () => {
        expect( () => artOp.divide( 123, 0 ) ).to.throw( Error );
    } );
} );