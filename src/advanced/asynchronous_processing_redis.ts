import { Queue } from "bull";


export const queueProcessor = ( queue: Queue ) => {
    queue.process( async ( job ) => {
        return `Trabajo procesado: ${ job.data.jobData }`;
    } );
};