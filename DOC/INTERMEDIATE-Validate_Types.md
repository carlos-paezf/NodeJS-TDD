# INTERMEDIO - Validación de Types

Este ejemplo incluye varias funciones genéricas y específicas que trabajan con diferentes tipos de datos, y valida cómo interactúan con sus parámetros y retornan valores. Además, incluye un conjunto de pruebas unitarias para verificar el comportamiento esperado en diferentes escenarios.

## Funciones Implementadas

1. `sum`

   ```ts
   export const sum = (a: number, b: number): number => {
       return a + b;
   };
   ```

   - *Descripción*: Realiza la suma de dos números y retorna el resultado.
   - *Tipo de parámetros*: Dos números (a y b).
   - *Tipo de retorno*: Número.

2. `greet`

   ```ts
   export function greet(name: string): string {
       if (typeof name !== 'string') {
           throw new Error("Invalid type for name");
       }
       return `Hello, ${name}!`;
   }
   ```

   - *Descripción*: Genera un saludo personalizado basado en el nombre proporcionado.
   - *Validaciones*: Lanza un error si el parámetro `name` no es un `string`.
   - *Tipo de retorno*: String.

3. `parseValue`

   ```ts
   export function parseValue(value: string | number): string {
       if (typeof value === 'number') {
           return value.toFixed(2);
       } else if (typeof value === 'string') {
           return value.toUpperCase();
       }
       throw new Error("Invalid Type");
   }
   ```

   - *Descripción*:
     - Si recibe un número, retorna una representación con dos decimales.
     - Si recibe un string, lo transforma a mayúsculas.
   - *Validaciones*: Lanza un error si el tipo no es `string` ni `number`.
   - *Tipo de retorno*: String.

4. `identity`

   ```ts
   export function identity<T>(value: T): T {
       return value;
   }
   ```

   - *Descripción*: Retorna el mismo valor que recibe, independientemente del tipo.
   - *Uso Genérico*: La función acepta y retorna valores del mismo tipo (`T`).

## Pruebas Unitarias

Las pruebas se han escrito con Mocha y Chai para validar el comportamiento de cada función en diferentes escenarios.

1. `sum`

   ```ts
   describe( 'sum - Validar tipo de retorno', () => {
      it( 'Debería retornar un número', () => {
         expect( sum( 2, 3 ) ).to.be.a( 'number' );
      } );
   } );
   ```

   - *Prueba*: Comprueba que la función retorna un valor de tipo number al sumar dos números.

2. `greet`

   ```ts
   describe( 'greet - Validar que se lanza un error si los tipos de parámetros son incorrectos', () => {
      it( 'Debería retornar un string', () => {
         expect( greet( 'David' ) ).to.be.a( 'string' );
      } );

      it( 'Debería lanzar un error si el nombre no es un string', () => {
         expect( () => greet( 123 as any ) ).to.throw( Error );
      } );
   } );
   ```

   - *Prueba 1*: Verifica que la función retorna un string cuando se pasa un nombre válido.
   - *Prueba 2*: Valida que lanza un error al recibir un parámetro de tipo no válido (ejemplo: un número).

3. `parseValue`

   ```ts
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
   ```

   - *Prueba 1*: Valida que los números se formatean correctamente con dos decimales.
   - *Prueba 2*: Verifica que los strings se transforman a mayúsculas.
   - *Prueba 3*: Lanza un error al pasar un tipo no soportado como boolean.

4. `identity`

   ```ts
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
   ```

   - *Prueba 1 y 2*: Verifican que la función retorna el mismo valor para diferentes tipos de entrada.
   - *Prueba 3*: Asegura que no hay conversión de tipo implícita.

## ¿Cómo ejecutar las pruebas?

1. Instala las dependencias:

   ```bash
   pnpm install
   ```

2. Ejecuta las pruebas:

   ```bash
   pnpm test
   ```

Esto ejecutará Mocha y ejecutará todas las pruebas definidas en el archivo de pruebas.

## Objetivo Educativo

Este ejemplo es ideal para enseñar los siguientes conceptos:

- *Validación de Tipos*: Cómo asegurar que las funciones manejan correctamente los tipos de entrada y salida.
- *Manejo de Errores*: Uso de excepciones (throw) para gestionar errores en tiempo de ejecución.
- *Funciones Genéricas*: Uso de funciones que se adaptan a múltiples tipos (identity).
- *Pruebas Unitarias*: La importancia de escribir tests para verificar el comportamiento esperado en escenarios normales y excepcionales.
