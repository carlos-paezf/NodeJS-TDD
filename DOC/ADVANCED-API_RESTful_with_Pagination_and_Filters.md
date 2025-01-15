# AVANZADO - API RESTful con Paginación y Filtros

Este ejemplo demuestra cómo implementar una API RESTful utilizando Express y MongoDB, con soporte para paginación y filtros. También incluye pruebas automatizadas para validar su funcionalidad.

## Implementación

### Modelo `Product`

Se define un modelo de Mongoose para los productos.

```ts
export const Product = mongoose.model(
    'Product',
    new mongoose.Schema({
        name: { type: String, required: true },
        category: { type: String, required: true },
    })
);
```

- *Campos*:
  - `name`: Nombre del producto (requerido).
  - `category`: Categoría del producto (requerido).

### Endpoint

1. Obtener Productos con Paginación y Filtros

   ```ts
   app.get('/products', async (req: Request, res: Response) => {
       const { page = 1, limit = 10, category } = req.query;

       const query = category ? { category } : {};
       const products = await Product.find(query)
           .skip((+page - 1) * +limit)
           .limit(Number(limit));
       const total = await Product.countDocuments(query);

       res.status(200).json({ products, total });
   });
   ```

   - *Método*: `GET`
   - *Ruta*: `/products`
   - *Descripción*: Obtiene una lista de productos con soporte para:
     - Paginación (`page`, `limit`).
     - Filtrado por categoría (`category`).
   - *Parámetros de Consulta*:
     - `page`: Número de página (por defecto: `1`).
     - `limit`: Cantidad de productos por página (por defecto: `10`).
     - `category`: Filtro por categoría (opcional).
   - *Respuesta*:

     ```json
     {
       "products": [ /*Lista de productos*/ ],
       "total": 3 // Total de productos que cumplen el criterio
     }
     ```

## Pruebas Automatizadas

### Configuración de Pruebas

```ts
import mongoose from "mongoose";
import st_request from "supertest";
import app, { Product } from "../../src/advanced/api-restful-pagination-filters";
import { expect } from "chai";

process.loadEnvFile();
```

- *supertest*: Para realizar solicitudes HTTP.
- *chai*: Para realizar aserciones.

### Flujo de las Pruebas

1. Conexión y Desconexión

   Antes de ejecutar las pruebas, se conecta a la base de datos. Al finalizar, se cierra la conexión.

   ```ts
   before(async () => {
       await mongoose.connect(process.env.DB_URI!);
   });

   after(async () => {
       await mongoose.connection.close();
   });
   ```

2. Limpieza

   Después de cada prueba, se eliminan todos los documentos de la colección Product.

   ```ts
   afterEach(async () => {
       await Product.deleteMany({});
   });
   ```

### Casos de Prueba

1. Insertar Productos

   ```ts
   const insertProducts = async () => {
       await Product.insertMany([
           { name: 'Product 1', category: 'A' },
           { name: 'Product 2', category: 'B' },
           { name: 'Product 3', category: 'A' },
       ]);
   };
   ```

   Una función auxiliar para insertar productos en la base de datos antes de las pruebas.

2. Validar Paginación

   ```ts
   it('Debería devolver productos con paginación', async () => {
       await insertProducts();

       const response = await st_request(app).get('/products?page=1&limit=2');
       expect(response.status).to.equal(200);
       expect(response.body.products).to.have.length(2);
       expect(response.body.total).to.equal(3);
   });
   ```

   - *Objetivo*: Verificar que el endpoint maneja correctamente la paginación.
   - *Entrada*: Parámetros de consulta (page=1&limit=2).
   - *Salida esperada*:
     - Código de estado: 200.
     - Respuesta contiene 2 productos y un total de 3.

3. Validar Filtrado

   ```ts
   it('Debería filtrar productos por categoría', async () => {
       await insertProducts();

       const response = await st_request(app).get('/products?category=A');
       expect(response.status).to.equal(200);
       expect(response.body.products).to.have.length(2);
   });
   ```

   - *Objetivo*: Validar que el filtrado por categoría funciona correctamente.
   - *Entrada*: Parámetro de consulta (category=A).
   - *Salida esperada*:
     - Código de estado: 200.
     - Respuesta contiene 2 productos de la categoría A.

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

1. Paginación y Filtros:
   - Implementar paginación con skip y limit.
   - Filtrar resultados dinámicamente según criterios.
2. API RESTful:
   - Diseñar endpoints flexibles y eficientes.
   - Retornar respuestas estandarizadas.
3. Pruebas Automatizadas:
   - Validar la funcionalidad del endpoint en escenarios realistas.
   - Usar datos dinámicos y realizar verificaciones precisas.
4. Manejo de Consultas:
   - Parsear y usar parámetros de consulta en las operaciones de base de datos.
