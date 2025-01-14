import { expect } from "chai";
import { greet, identity, parseValue, sum } from "../../src/intermediate/validate-types";


describe( 'INTERMEDIATE - Validar Tipos de parámetros y retornos', () => {
    describe( 'sum - Validar tipo de retorno', () => {
        it( 'Debería retornar un número', () => {
            expect( sum( 2, 3 ) ).to.be.a( 'number' );
        } );
    } );

    describe( 'greet - Validar que se lanza un error si los tipos de parámetros son incorrectos', () => {
        it( 'Debería retornar un string', () => {
            expect( greet( 'David' ) ).to.be.a( 'string' );
        } );

        it( 'Debería lanzar un error si el nombre no es un string', () => {
            expect( () => greet( 123 as any ) ).to.throw( Error );
        } );
    } );

    describe( 'parseValue - Validar múltiples tipos de parámetros con sobrecarga', () => {
        it( 'Debería aceptar números correctamente', () => {
            const result = parseValue( 22 );
            expect( result ).to.be.a( 'string' );
            expect( result ).to.equal( '22.00' );
        } );

        it( 'Debería aceptar strings correctamente', () => {
            const result = parseValue( 'Hola' );
            expect( result ).to.be.a( 'string' );
            expect( result ).to.equal( 'HOLA' );
        } );

        it( 'Debería lanzar un error para types no soportados', () => {
            expect( () => parseValue( true as any ) ).to.throw( Error );
        } );
    } );

    describe( 'identity - Validar tipos genéricos', () => {
        it( 'Debería retornar el mismo valor para un número', () => {
            const result = identity( 42 );
            expect( result ).to.be.a( 'number' );
            expect( result ).to.equal( 42 );
        } );

        it( 'Debería retornar el mismo valor para un string', () => {
            const result = identity( 'Hola' );
            expect( result ).to.be.a( 'string' );
            expect( result ).to.equal( 'Hola' );
        } );

        it( 'NO Debería retornar un string si se le pasa un número', () => {
            const result = identity( 42 );
            expect( result ).not.to.be.a( 'string' );
        } );
    } );
} );