# INTERMEDIO - Autenticación con JWT (JSON Web Token)

Este ejemplo implementa una funcionalidad básica de autenticación utilizando JSON Web Tokens (JWT). Incluye una función para generar tokens a partir de las credenciales del usuario y un conjunto de pruebas automatizadas para validar su comportamiento.

## Implementación

### Tipo de Datos: `User`

```ts
export type User = {
    id: number;
    username: string;
    password: string;
};
```

- `id`: Un identificador único para el usuario.
- `username`: Nombre de usuario.
- `password`: Contraseña del usuario (sin cifrar para fines educativos).

### Función `login`

```ts
export const login = async (user: User): Promise<string> => {
    if (!user) {
        throw new Error("Credenciales invalidas");
    }

    return jwt.sign({ ...user }, 'secret-key', { expiresIn: '1h' });
};
```

- *Validación de entrada*:
  - Si el usuario proporcionado es null o undefined, se lanza un error con el mensaje "Credenciales invalidas".
- *Generación del Token*:
  - Se utiliza jwt.sign para crear un token a partir de las propiedades del usuario.
  - La clave secreta utilizada es 'secret-key'.
  - El token generado expira en 1 hora (expiresIn: '1h').

## Pruebas Unitarias

Las pruebas garantizan el correcto funcionamiento de la función login en distintos escenarios.

```ts
import { expect } from "chai";
import jwt from "jsonwebtoken";
import { login, User } from "../../src/intermediate/auth-with-jwt";
```

- *Librerías utilizadas*:
  - Chai: Para realizar aserciones.
  - jsonwebtoken: Para verificar tokens generados durante las pruebas.

### Pruebas Implementadas

1. Error para credenciales inválidas

   ```ts
   it('Debería lanzar un error de tipo Error', async () => {
       try {
           await login(null as any);
       } catch (error: any) {
           expect(error).to.be.instanceOf(Error);
       }
   });
   ```

   - *Objetivo*: Validar que la función lanza un error cuando no se proporcionan credenciales.
   - *Validaciones*:
     - El error lanzado debe ser una instancia de Error.

2. Mensaje de error para credenciales incorrectas

   ```ts
   it('Debería lanzar un error para credenciales incorrectas', async () => {
       try {
           await login(null as any);
           expect.fail('Expected error to be thrown');
       } catch (error: any) {
           expect(error.message).to.equal('Credenciales invalidas');
       }
   });
   ```

   - *Objetivo*: Asegurarse de que el mensaje de error sea claro y específico.
   - *Validaciones*:
     - El mensaje del error debe ser "Credenciales invalidas".

3. Generación de un token válido

   ```ts
   it('Debería generar un token válido para credenciales correctas', async () => {
       const user: User = { id: 1, username: 'user1', password: 'password1' };
       const token = await login(user);
       const decoded = jwt.verify(token, 'secret-key');
       expect(decoded).to.be.a('object');
       expect((decoded as any).id).to.equal(user.id);
       expect((decoded as any).username).to.equal(user.username);
   });
   ```

   - *Objetivo*: Verificar que se genera un token válido con la información correcta.
   - *Validaciones*:
     - El token debe ser verificable con la clave secreta 'secret-key'.
     - El token decodificado debe contener las propiedades id y username del usuario.
  
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

## Objetivos Educativos

1. Conceptos de Autenticación con JWT:
   - Uso de jsonwebtoken para crear y verificar tokens.
   - Importancia de una clave secreta segura.
2. Gestión de Errores:
   - Validación de entrada y manejo de errores claros y específicos.
3. Pruebas Automatizadas:
   - Validación de errores lanzados mediante aserciones.
   - Verificación del contenido de los tokens generados.
4. Buenas Prácticas:
   - Estructuración de funciones de autenticación.
   - Uso de pruebas para asegurar el correcto funcionamiento.
