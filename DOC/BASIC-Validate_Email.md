# BÁSICO - Validar Email

Este ejemplo incluye una función llamada `validateEmail`, diseñada para validar si un string es un email válido según un patrón de expresión regular. También incluye pruebas unitarias escritas con Mocha y Chai para verificar que la función se comporte correctamente en distintos escenarios.

## Función `validateEmail`

La función `validateEmail` se encarga de validar un email usando una expresión regular. Su implementación es la siguiente:

```ts
export function validateEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
```

### Desglose del código

- Expresión regular (regex):

  ```regex
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  ```

  - `^[^\s@]+`: Asegura que el email comience con uno o más caracteres que no sean espacios (`\s`) ni el carácter `@`.
  - `@`: Requiere que el email contenga exactamente un carácter `@`.
  - `[^\s@]+`: Asegura que haya una sección después del `@` que no contenga espacios ni otro `@`.
  - `\.`: Requiere un punto (`.`) como separador para el dominio.
  - `[^\s@]+$`: Asegura que el email termine con uno o más caracteres válidos después del punto.

- `regex.test(email)`: Verifica si el email cumple con el patrón definido por la expresión regular. Retorna true si cumple y false en caso contrario.

## Pruebas Unitarias

Las pruebas están diseñadas para cubrir diferentes casos de uso de la función. Estas son las pruebas definidas:

1. Email válido

   ```ts
   it('Debería retornar true para un email válido', () => {
       expect(validateEmail('<test@example.com>')).to.be.true;
   });
   ```

   - *Objetivo*: Verificar que la función retorna true para un email correctamente formado.
   - *Prueba*: Se valida el email <test@example.com>, que es un formato válido.

2. Email inválido (sin @)

   ```ts
   it('Debería retornar false para email inválido', () => {
       expect(validateEmail('test.com')).to.be.false;
   });
   ```

   - *Objetivo*: Verificar que la función retorna false para un email que no tiene el carácter @.
   - *Prueba*: El email test.com no tiene @, por lo que debe retornar false.

3. Email vacío

   ```ts
   it('Debería retornar false si está vacío', () => {
       expect(validateEmail('')).to.be.false;
   });
   ```

   - *Objetivo*: Verificar que la función no acepta un string vacío como email válido.
   - *Prueba*: Al pasar un string vacío (''), la función debe retornar false.

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

## Explicación General: Validación de Emails

Este proyecto es ideal para enseñar cómo validar entradas de usuario, en este caso emails, con expresiones regulares. También demuestra cómo escribir pruebas unitarias para cubrir escenarios comunes y límites:

1. *Caso ideal*: Emails válidos como `test@example.com`.
2. *Errores comunes*: Falta del carácter `@`, dominios mal formados, o emails vacíos.
3. *Importancia de las pruebas unitarias*: Las pruebas aseguran que cualquier cambio en la función no afectará la funcionalidad básica.

**Extensión de las pruebas:**

Si deseas extender las pruebas, puedes incluir casos adicionales como:

- Emails con caracteres especiales permitidos (<test.user+123@example.com>).
- Emails con dominios largos (<user@subdomain.example.co.uk>).
- Emails con espacios o caracteres no válidos (`user @example.com`, `user@ example.com`).

Estas pruebas te permitirán cubrir más escenarios y garantizar que la función sea robusta frente a entradas inesperadas.
