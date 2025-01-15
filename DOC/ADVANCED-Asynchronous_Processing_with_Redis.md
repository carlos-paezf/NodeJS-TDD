# AVANZADO - Procesamiento Asíncrono con Redis

Este ejemplo muestra cómo implementar el procesamiento de tareas asíncronas utilizando la biblioteca Bull y Redis. Incluye ejemplos prácticos de procesamiento de trabajos y pruebas automatizadas para garantizar su funcionalidad.

## Implementación

## Procesador de Colas

```ts
import { Queue } from "bull";

export const queueProcessor = (queue: Queue) => {
    queue.process(async (job) => {
        return `Trabajo procesado: ${job.data.jobData}`;
    });
};
```

- *Función*: `queueProcessor`
  - Recibe una cola (`Queue`) como parámetro.
  - Procesa trabajos de forma asíncrona.
  - Devuelve un mensaje indicando que el trabajo ha sido procesado.
- Lógica:
  - Cada trabajo incluye datos en su propiedad `data.jobData`.
  - La salida es un mensaje formateado con el contenido del trabajo.

## Pruebas Automatizadas

### Configuración de Pruebas

```ts
import Bull, { Queue } from "bull";
import { queueProcessor } from "../../src/advanced/asynchronous_processing_redis";
import { expect } from "chai";
```

- *Bull*: Biblioteca para manejar colas de trabajos.
- *chai*: Herramienta de aserciones para pruebas.

### Flujo de las Pruebas

1. Configuración Inicial

   Antes de las pruebas:
   - Se crea una cola con configuración para conectarse a Redis.
   - Se aplica el procesador a la cola.

   ```ts
   let queue: Queue;

   before(() => {
       queue = new Bull('testQueue', {
           redis: {
               host: '127.0.0.1',
               port: 6379
           }
       });
       queueProcessor(queue);
   });
   ```

2. Limpieza Final

   Después de las pruebas:
   - Se cierra la conexión a la cola para liberar recursos.

   ```ts
   after(async () => {
       await queue.close();
   });
   ```

### Casos de Prueba

1. Procesamiento Correcto de un Trabajo

```ts
it('Debería procesar un trabajo correctamente', (done) => {
    queue.add({ jobData: 'test' });
    queue.on('completed', (job, result) => {
        try {
            expect(result).to.equal('Trabajo procesado: test');
            done();
        } catch (error) {
            done(error);
        }
    });
});
```

- *Objetivo*: Validar que un trabajo se procesa correctamente.
- *Flujo*:
  - Se añade un trabajo a la cola con datos de prueba (jobData: 'test').
  - Se escucha el evento completed para validar el resultado del trabajo.
- *Salida esperada*:
  - El resultado del trabajo debe ser 'Trabajo procesado: test'.

## Ejecución de las Pruebas

1. Instalar Dependencias:

   ```bash
   pnpm install
   ```

2. Configurar Redis:

   Asegúrate de que Redis esté en ejecución en localhost (puerto 6379) o configura los parámetros de conexión según sea necesario:

   ```bash
   wsl -l

   wsl --install -d Ubuntu-22.04

   curl -fsSL <https://packages.redis.io/gpg> | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

   echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] <https://packages.redis.io/deb> $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

   sudo apt-get update

   sudo apt-get install redis

   sudo service redis-server start

   127.0.0.1:6379> ping
   ```

3. Ejecutar las Pruebas:

   ```bash
   pnpm test
   ```

## Objetivos Educativos

1. Procesamiento de Tareas Asíncronas:
   - Cómo procesar trabajos de manera eficiente en segundo plano.
   - Uso de eventos (completed, failed) para manejar el flujo de trabajos.
2. Uso de Bull:
   - Configuración de colas conectadas a Redis.
   - Adición y procesamiento de trabajos en una cola.
3. Pruebas Automatizadas:
   - Validar la funcionalidad de un procesador de colas.
   - Manejo de eventos y validación de resultados.

## Beneficios del Uso de Bull y Redis

- *Desempeño*: Procesamiento rápido y confiable de tareas asíncronas.
- *Escalabilidad*: Soporte para múltiples instancias de trabajadores.
- *Flexibilidad*: Fácil integración con aplicaciones existentes.
