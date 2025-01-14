export const sum = ( a: number, b: number ): number => {
    return a + b;
};


export function greet ( name: string ): string {
    if ( typeof name !== 'string' ) {
        throw new Error( "Invalid type for name" );
    }

    return `Hello, ${ name }!`;
}


export function parseValue ( value: string | number ): string {
    if ( typeof value === 'number' ) {
        return value.toFixed( 2 );
    } else if ( typeof value === 'string' ) {
        return value.toUpperCase();
    }
    throw new Error( "Invalid Type" );
}


export function identity<T> ( value: T ): T {
    return value;
}