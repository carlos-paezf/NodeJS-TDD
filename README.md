# Test Driven Development (TDD) con Mocha en Node con TS

[![wakatime](https://wakatime.com/badge/user/8ef73281-6d0a-4758-af11-fd880ca3009c/project/039b7e37-553d-459b-bbc2-40eeda22e85e.svg?style=for-the-badge)](https://wakatime.com/badge/user/8ef73281-6d0a-4758-af11-fd880ca3009c/project/039b7e37-553d-459b-bbc2-40eeda22e85e)

## Pasos iniciales del proyecto

Para inicializar el proyecto con node debemos ejecutar el siguiente comando en una terminal:

```bash
npm init -y
```

Ya que se quiere trabajar con TypeScript necesitamos realizar su instalación, la podemos hacer de manera global, o en este caso, cómo una dependencia de desarrollo dentro del proyecto:

```bash
pnpm i -D typescript
```

Inicializamos la configuración de TS con el siguiente comando:

```bash
tsc --init
```

En el archivo `tsconfig.json` generado del paso anterior, cambiamos el valor de algunas opciones, esto con el fin de determinar el directorio donde se guardará el código y donde se guardará el transpilado en JS.

```json
{
    "compilerOptions": {
        "rootDir": ".", /* Specify the root folder within your source files. */
        ...
        "outDir": "./dist", /* Specify an output folder for all emitted files. */
        ...
    }
}
```

Es necesario realizar la instalación de la siguiente dependencia (puede ser global o local), ya que nos ayudará a conectar entre TS y Node:

```bash
pnpm i ts-node
```

Adicional, creamos el comando que se encarga de transpilar el código de TS a JS:

```json
{
    ...
    "scripts": {
        "build": "tsc",
    },
    ...
}
```

## Paquetes necesarios para el proyecto

Vamos a instalar algunos paquetes que usaremos a través de cada ejemplo ya sea cómo su lógica central, o como la herramienta que nos servirá como framework de pruebas y aserciones:

```bash
pnpm i -S express jsonwebtoken mongoose bull
```

```bash
pnpm i -D ts-mocha mocha chai@4.5.0 supertest
```

También se puede añadir un paquete para generar un informe de cobertura de código:

```bash
pnpm i -D nyc
```

Por último, para añadir los tipos correspondientes a los paquetes anteriores debemos ejecutar el siguiente comando:

```bash
pnpm i -D @types/express @types/jsonwebtoken @types/mocha @types/chai @types/supertest @types/expect
```

## Configuración para ejecutar las pruebas

En este paso vamos a indicarle al nuevo comando que queremos realizar las pruebas de la carpeta `test` con ts-mocha de manera recursiva, paralela y con un reporte de cobertura de los test:

```json
{
    ...
    "scripts": {
        "test": "nyc ts-mocha --recursive --parallel test/**/*.spec.ts",
    },
    ...
}
```

Con lo anterior vamos a poder ejecutar el siguiente comando, observar los resultados en consola y tener un reporte de nyc en la carpeta `.nyc_output` en la raíz del proyecto:

```bash
pnpm test
```

## Empezamos con los ejemplos

1. Básico
   - [Operaciones Aritméticas](./DOC/BASIC-Arithmetic_Operations.md)
   - [Validación de Email](./DOC/BASIC-Validate_Email.md)
2. Intermedio
   - [Validación de Types](./DOC/INTERMEDIATE-Validate_Types.md)
   - [API REST para Gestión de Tareas](./DOC/INTERMEDIATE-API_REST_Task_Management.md)
   - [Autenticación con JWT](./DOC/INTERMEDIATE-Auth_with_JWT.md)
   - [Sistema de Roles y Permisos](./DOC/INTERMEDIATE-Role_and_Permission_System.md)
3. Avanzado
   - [API RESTful con MongoDB](./DOC/ADVANCED-API_RESTful_with_MongoDB.md)
   - [API RESTful con Paginación y Filtros](./DOC/ADVANCED-API_RESTful_with_Pagination_and_Filters.md)
