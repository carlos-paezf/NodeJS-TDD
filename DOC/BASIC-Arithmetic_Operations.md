# BÁSICO - Operaciones Aritméticas

Este ejemplo contiene una clase `ArithmeticOperations` que realiza operaciones básicas de aritmética: suma, resta, multiplicación y división. A continuación, explicaremos cómo funcionan estas operaciones y cómo se prueban utilizando Mocha y Chai.

## Estructura del Código

La clase ArithmeticOperations está definida como sigue:

```ts
class ArithmeticOperations {
    add ( a: number, b: number ): number {
        return a + b;
    }

    subtract ( a: number, b: number ): number {
        return a - b;
    }

    multiply ( a: number, b: number ): number {
        return a * b;
    }

    divide ( a: number, b: number ): number {
        if ( b === 0 ) {
            throw new Error( "Cannot divide by zero" );
        }
        return a / b;
    }

}

export default ArithmeticOperations;
```

Cada uno de los métodos realiza una operación matemática estándar:

- add(a, b): Suma a y b.
- subtract(a, b): Resta b de a.
- multiply(a, b): Multiplica a y b.
- divide(a, b): Divide a entre b, lanzando un error si b es 0.

## Pruebas Unitarias

Las pruebas unitarias están escritas utilizando Mocha como framework de pruebas y Chai como librería de aserciones. A continuación se explica cada uno de los tests realizados sobre la clase `ArithmeticOperations`.

1. Suma de dos números

   ```ts
   it('Debería sumar dos números correctamente', () => {
      expect( artOp.add( 2, 3 ) ).to.equal( 5 );
   });
   ```

   - *Objetivo*: Verificar que la operación de suma funcione correctamente.
   - *Prueba*: Suma de 2 y 3, que debe devolver 5.

2. Suma de ceros

   ```ts
   it('Debería retornar 0 si ambos números son 0', () => {
       expect( artOp.add( 0, 0 ) ).to.equal( 0 );
   });
    ```

   - *Objetivo*: Verificar que la suma de dos ceros retorne correctamente 0.
   - *Prueba*: La suma de 0 y 0 debe devolver 0.

3. Resta de números negativos

   ```ts
   it('Debería retornar un número negativo al restar 2 números negativos', () => {
       expect( artOp.subtract( -2, -3 ) ).to.equal( 1 );
   });
    ```

   - *Objetivo*: Verificar que la resta de dos números negativos funcione correctamente.
   - *Prueba*: La resta de -2 y -3 debe devolver 1, ya que -2 - (-3) = 1.

4. Resta de números iguales

   ```ts
   it('Debería retornar un 0 si ambos números son iguales', () => {
       expect( artOp.subtract( 2, 2 ) ).to.equal( 0 );
   });
   ```

    - *Objetivo*: Verificar que la resta de dos números iguales retorne 0.
    - *Prueba*: La resta de 2 y 2 debe devolver 0.

5. Multiplicación de números de 3 dígitos

   ```ts
   it('Debería multiplicar 2 números de 3 dígitos correctamente', () => {
       expect( artOp.multiply( 123, 456 ) ).to.equal( 56088 );
   });
   ```

    - *Objetivo*: Verificar que la multiplicación de números de 3 dígitos se realice correctamente.
    - *Prueba*: La multiplicación de 123 por 456 debe devolver 56088.

6. Multiplicación por cero

   ```ts
   it('Debería retornar un 0 al multiplicar un número por 0', () => {
       expect( artOp.multiply( 123, 0 ) ).to.equal( 0 );
   });
   ```

    - *Objetivo*: Verificar que la multiplicación por cero retorne 0 correctamente.
    - *Prueba*: La multiplicación de 123 por 0 debe devolver 0.

7. División que da un decimal

   ```ts
   it('Debería retornar un decimal al dividir un número impar entre uno par', () => {
       expect( artOp.divide( 55, 2 ) ).to.equal( 27.5 );
   });
   ```

    - *Objetivo*: Verificar que la división de un número impar entre un número par funcione correctamente y devuelva un decimal.
    - *Prueba*: La división de 55 entre 2 debe devolver 27.5.

8. División por cero

   ```ts
   it('Debería retornar un error al intentar dividir por 0', () => {
       expect( () => artOp.divide( 123, 0 ) ).to.throw( Error );
   });
   ```

    - *Objetivo*: Verificar que se lance un error cuando se intente dividir por 0.
    - *Prueba*: La división de 123 entre 0 debe lanzar un error con el mensaje "Cannot divide by zero".

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

## Conclusión

El objetivo de este código y sus pruebas es asegurar que las operaciones básicas de aritmética se comporten como se espera. Cada prueba está diseñada para verificar un caso específico de comportamiento de las funciones y asegurar que se manejan correctamente los posibles errores, como la división por cero. Las pruebas unitarias son una parte fundamental del desarrollo de software y garantizan que el código funcione correctamente incluso cuando se realicen cambios o actualizaciones en el futuro.
