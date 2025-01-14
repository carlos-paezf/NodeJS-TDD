import express, { Request, Response } from 'express';


const app = express();
app.use( express.json() );

export type Task = {
    title: string;
    completed: boolean;
};

let tasks: Task[] = [];

app.get( '/tasks', ( req: Request, res: Response ) => {
    res.json( tasks );
} );

app.post( '/tasks', ( req: Request, res: Response ) => {
    const task = req.body;
    tasks.push( task );
    res.status( 201 ).json( task );
} );


export default app;