import { expect } from "chai";
import st_request from "supertest";
import app, { Task } from "../../src/intermediate/api-rest-task-management";


describe( 'INTERMEDIATE - API REST para Gestión de Tareas', () => {
    it( 'Debería devolver una lista de tareas', async () => {
        const response = await st_request( app ).get( '/tasks' );
        expect( response.status ).to.equal( 200 );
        expect( response.body ).to.be.a( 'array' );
    } );

    it( 'Debería crear una nueva tarea', async () => {
        const task: Task = { title: 'Nueva tarea', completed: false };
        const response = await st_request( app ).post( '/tasks' ).send( task );
        expect( response.status ).to.equal( 201 );
        expect( response.body ).to.be.a( 'object' );
        expect( response.body ).to.include( task );
    } );
} );