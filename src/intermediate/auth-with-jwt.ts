import jwt from 'jsonwebtoken';


export type User = {
    id: number;
    username: string;
    password: string;
};


export const login = async ( user: User ): Promise<string> => {
    if ( !user ) {
        throw new Error( "Credenciales invalidas" );
    }

    return jwt.sign( { ...user }, 'secret-key', { expiresIn: '1h' } );
};