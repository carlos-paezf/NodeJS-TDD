# AVANZADO - API RESTful con MongoDB

Este ejemplo demuestra cómo crear una API RESTful utilizando MongoDB con Mongoose como ORM y Express como framework de servidor web. También incluye pruebas automatizadas para validar la funcionalidad de la API.

## Implementación

### Modelo `User`

Se define un esquema de Mongoose para representar a los usuarios.

```ts
export const User = mongoose.model(
    'User',
    new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
    })
);
```

- Campos:
  - name: Nombre del usuario (requerido).
  - email: Dirección de correo electrónico única (requerido).

### Endpoints

1. Crear Usuario

   ```ts
   app.post('/users', async (req: Request, res: Response) => {
       const user = await User.create(req.body);
       res.status(201).json(user);
   });
   ```

   - *Método*: `POST`
   - *Ruta*: `/users`
   - *Descripción*: Crea un nuevo usuario en la base de datos.
   - *Entrada*: JSON con `name` y `email`.
   - *Respuesta*: Objeto JSON del usuario creado con un código de estado `201`.

2. Obtener Usuarios

   ```ts
   app.get('/users', async (req: Request, res: Response) => {
       const users = await User.find();
       res.status(200).json(users);
   });
   ```

   - *Método*: GET
   - *Ruta*: /users
   - *Descripción*: Obtiene una lista de todos los usuarios en la base de datos.
   - *Respuesta*: Arreglo JSON con todos los usuarios y un código de estado 200.

## Pruebas Automatizadas

### Configuración de Pruebas

```ts
import mongoose from "mongoose";
import app, { User } from "../../src/advanced/api-restful-mongodb";
import st_request from "supertest";
import { expect } from "chai";

process.loadEnvFile();
```

Se utiliza:

- `supertest` para realizar solicitudes HTTP a la API.
- `chai` para realizar aserciones en las pruebas.

### Flujo de las Pruebas

1. Conexión a la Base de Datos

   Antes de ejecutar las pruebas, se establece una conexión con MongoDB usando mongoose.connect.

   ```ts
   before(async () => {
       await mongoose.connect(process.env.DB_URI!);
   });
   ```

2. Limpieza de la Base de Datos

   Después de cada prueba, se eliminan todos los documentos de la colección User para garantizar que las pruebas sean independientes.

   ```ts
   afterEach(async () => {
       await User.deleteMany({});
   });
   ```

3. Desconexión

   Al finalizar, se cierra la conexión con MongoDB.

   ```ts
   after(async () => {
       await mongoose.connection.close();
   });
   ```

### Casos de Prueba

1. Crear Usuario

   ```ts
   it('Debería crear un usuario', async () => {
       const userData = { name: 'John Doe', email: 'john@example.com' };
       const response = await st_request(app).post('/users').send(userData);

       expect(response.status).to.equal(201);
       expect(response.body.name).to.equal(userData.name);
       expect(response.body.email).to.equal(userData.email);
   });
   ```

   - *Objetivo*: Validar que se puede crear un usuario correctamente.
   - *Entrada*: Datos del usuario (name, email).
   - *Salida esperada*:
     - Código de estado: 201.
     - Respuesta JSON con los datos del usuario creado.

2. Obtener Usuarios

   ```ts
   it('Debería obtener la lista de usuarios', async () => {
       const user = await User.create({ name: 'Jane Doe', email: 'jane@example.com' });
       const response = await st_request(app).get('/users');

       expect(response.status).to.equal(200);
       expect(response.body).to.be.an('array');
       expect(response.body).to.have.length(1);
       expect(response.body[0].name).to.equal(user.name);
   });
   ```

   - *Objetivo*: Validar que se pueden obtener todos los usuarios registrados.
   - *Preparación*:
     - Crear un usuario directamente en la base de datos.
   - *Salida esperada*:
     - Código de estado: 200.
     - Respuesta JSON con un arreglo que contiene los usuarios registrados.

## Ejecución de las Pruebas

1. Instalar dependencias:

   ```bash
   pnpm install
   ```

2. Configurar la variable de entorno: Define DB_URI en un archivo .env con la URI de tu base de datos MongoDB.
3. Ejecutar las pruebas:

   ```bash
   pnpm test
   ```

## Objetivos Educativos

1. Integración con MongoDB:
   - Uso de Mongoose para modelar datos y realizar operaciones CRUD.
   - Ejecución de pruebas con una base de datos real.
2. API RESTful:
   - Diseño de rutas y controladores en Express.
   - Respuestas estandarizadas para operaciones exitosas y fallidas.
3. Pruebas Automatizadas:
   - Validación de endpoints con datos dinámicos.
   - Limpieza y configuración del entorno de prueba.
4. Mejores Prácticas:
   - Uso de variables de entorno para configurar la base de datos.
   - Garantizar la independencia entre pruebas.
