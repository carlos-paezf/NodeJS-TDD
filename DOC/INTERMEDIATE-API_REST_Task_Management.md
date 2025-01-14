# INTERMEDIO - API REST para Gestión de Tareas

Este ejemplo implementa una API REST básica para la gestión de tareas. La API permite crear y listar tareas utilizando Express. Además, incluye un conjunto de pruebas automatizadas para verificar su funcionamiento utilizando las bibliotecas Mocha, Chai y Supertest.

## Implementación

### Servidor y Configuración Básica

```ts
import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());
```

- *Express*: Se utiliza para manejar las solicitudes HTTP.
- *Middleware* JSON: Permite procesar datos enviados en formato JSON.
  
### Tipo de Datos: `Task`

```ts
export type Task = {
    title: string;
    completed: boolean;
};
```

- *title*: Una cadena que representa el título de la tarea.
- *completed*: Un booleano que indica si la tarea está completada.

### Rutas Implementadas

1. GET `/tasks`

   ```ts
   app.get('/tasks', (req: Request, res: Response) => {
       res.json(tasks);
   });
   ```

   - *Descripción*: Devuelve una lista de todas las tareas almacenadas.
   - *Retorno*: Arreglo de objetos de tipo Task.
   - *Código de Respuesta*: 200 OK.

2. POST /tasks

   ```ts
   app.post('/tasks', (req: Request, res: Response) => {
       const task = req.body;
       tasks.push(task);
       res.status(201).json(task);
   });
   ```

   - *Descripción*: Crea una nueva tarea y la agrega a la lista.
   - *Entrada*: Objeto JSON con las propiedades title y completed.
   - *Retorno*: Objeto de la tarea creada.
   - *Código de Respuesta*: 201 Created.

## Pruebas Unitarias

Las pruebas validan el comportamiento de las rutas de la API para garantizar que respondan correctamente en diferentes escenarios.

```ts
import { expect } from 'chai';
import st_request from 'supertest';
import app, { Task } from '../../src/intermediate/api-rest-task-management';
```

Librerías utilizadas:

- *Chai*: Para realizar aserciones.
- *Supertest*: Para realizar solicitudes HTTP al servidor Express.

### Pruebas Implementadas

1. Obtener lista de tareas (GET /tasks)

   ```ts
   it('Debería devolver una lista de tareas', async () => {
       const response = await st_request(app).get('/tasks');
       expect(response.status).to.equal(200);
       expect(response.body).to.be.a('array');
   });
   ```

   - *Objetivo*: Verificar que el endpoint devuelve una lista vacía o con tareas previamente añadidas.
   - *Validaciones*:
     - Código de estado: 200.
     - Tipo de dato retornado: array.

2. Crear una nueva tarea (POST /tasks)

   ```ts
   it('Debería crear una nueva tarea', async () => {
       const task: Task = { title: 'Nueva tarea', completed: false };
       const response = await st_request(app).post('/tasks').send(task);
       expect(response.status).to.equal(201);
       expect(response.body).to.be.a('object');
       expect(response.body).to.include(task);
   });
   ```

   - *Objetivo*: Comprobar que el endpoint crea correctamente una nueva tarea.
   - *Validaciones*:
     - Código de estado: 201.
     - El objeto retornado debe incluir las propiedades de la tarea enviada.

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

Este proyecto es ideal para enseñar los siguientes conceptos:

1. Creación de APIs REST:
   - Cómo estructurar rutas básicas para manejar recursos.
   - Uso de verbos HTTP como GET y POST.
2. Pruebas End-to-End:
   - Uso de Supertest para probar interacciones completas con la API.
   - Validación de códigos de estado y estructuras de respuesta.
3. Manejo de Datos:
   - Uso de un arreglo en memoria para almacenar recursos.
   - Cómo procesar datos enviados como JSON.
4. Buenas Prácticas:
   - Estructuración básica para proyectos Express.
   - Validaciones mediante pruebas automatizadas para asegurar calidad.
