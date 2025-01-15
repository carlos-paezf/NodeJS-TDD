import Bull, { Queue } from "bull";
import { queueProcessor } from "../../src/advanced/asynchronous_processing_redis";
import { expect } from "chai";


describe( 'ADVANCED - Procesador de Colas', () => {
    let queue: Queue;

    before( () => {
        queue = new Bull( 'testQueue', {
            redis: {
                host: '127.0.0.1',
                port: 6379
            }
        } );
        queueProcessor( queue );
    } );

    after( async () => {
        await queue.close();
    } );


    it( 'Debería procesar un trabajo correctamente', ( done ) => {
        queue.add( { jobData: 'test' } );
        queue.on( 'completed', ( job, result ) => {
            try {
                expect( result ).to.equal( 'Trabajo procesado: test' );
                done();
            } catch ( error ) {
                done( error );
            }
        } );
    } );
} );
