# INTERMEDIO - Sistema de Roles y Permisos

Este ejemplo implementa un sistema de roles y permisos que evalúa si un rol tiene acceso a una acción específica. Es una funcionalidad útil en aplicaciones que manejan autorización y control de acceso.

## Implementación

### Función `hasPermission`

```ts
export function hasPermission(
    role: string,
    action: string,
    roles: Record<string, (string | '*')[]>,
    roleHierarchy?: Record<string, string[]>
): boolean {
    if (typeof role !== "string" || typeof action !== 'string') {
        throw new Error('Invalid input: role and action must be a string');
    }
    if (!roles || typeof roles !== 'object') {
        throw new Error('Invalid input: roles must be an object');
    }

    if (!roles[role]) return false;

    const permissions = roles[role];

    if (permissions.includes('*') || permissions.includes(action)) return true;

    if (roleHierarchy) {
        const parentRoles = roleHierarchy[role];
        if (parentRoles && parentRoles.length > 0) {
            return parentRoles.some(parentRole =>
                hasPermission(parentRole, action, roles, roleHierarchy)
            );
        }
    }

    return false;
}
```

### Parámetros

1. `role`: Rol del usuario que se evalúa.
2. `action`: Acción que el rol desea realizar.
3. `roles`: Objeto que define las acciones permitidas para cada rol.
   - Las acciones pueden incluir el comodín '*' para permisos globales.
4. `roleHierarchy` (opcional): Objeto que define la jerarquía de roles, donde un rol puede heredar permisos de roles principales.

### Lógica

1. *Validaciones iniciales*:
   - Se verifica que role y action sean cadenas.
   - Se asegura que roles sea un objeto.
2. *Acceso directo*:
   - Si el rol tiene un permiso explícito para la acción o el comodín '*', se permite el acceso.
3. *Jerarquía de roles*:
   - Si se proporciona una jerarquía, se verifica si algún rol principal tiene el permiso necesario, utilizando recursividad.
4. Retorno final:
   - Devuelve false si no se cumplen las condiciones anteriores.

## Pruebas Unitarias

Las pruebas aseguran que la función hasPermission se comporte correctamente en diversos escenarios.

```ts
import { expect } from "chai";
import { hasPermission } from "../../src/intermediate/role-permission-system";
```

### Datos de Prueba

```ts
const roles: Record<string, string[]> = {
    admin: ['*'],
    manager: ['create', 'read', 'update', 'delete'],
    user: ['read'],
    supervisor: ['view_reports', 'edit_users']
};

const roleHierarchy = {
    manager: ['supervisor', 'user']
};
```

### Pruebas Implementadas

1. Permisos directos

   ```ts
   it('Debería permitir acceso si el usuario tiene permisos', () => {
       expect(hasPermission('admin', 'create', roles)).to.be.true;
   });
   ```

   - *Objetivo*: Verificar que los roles con permisos explícitos acceden correctamente.

2. Acceso denegado

   ```ts
   it('Debería denegar acceso si el usuario no tiene permisos', () => {
       expect(hasPermission('user', 'delete', roles)).to.be.false;
   });
   ```

   - *Objetivo*: Validar que los roles sin permisos explícitos sean bloqueados.

3. Roles inexistentes

   ```ts
   it('Debería manejar roles inexistentes', () => {
       expect(hasPermission('guest', 'read', roles)).to.be.false;
   });
   ```

   - *Objetivo*: Comprobar que roles no definidos en el sistema no tienen acceso.

4. Validación de tipos

   ```ts
   it('Debería lanzar un error cuando el role no es un string', () => {
       expect(() => hasPermission(123 as any, 'read', roles)).to.throw('Invalid input: role and action must be a string');
   });
   ```

   - *Objetivo*: Garantizar que se lanza un error al recibir tipos inválidos.

5. Permiso comodín (*)

   ```ts
   it('Debería permitir acceso cuando el role tiene permiso comodín (*) para una acción no relacionada', () => {
       expect(hasPermission('admin', 'delete', roles)).to.be.true;
   });
   ```

   - *Objetivo*: Confirmar que el comodín proporciona acceso global.

6. Jerarquía de roles

   ```ts
   it('Debería permitir acceso cuando un role tiene permiso sobre múltiples roles principales', () => {
       expect(hasPermission('manager', 'view_reports', roles, roleHierarchy)).to.be.true;
   });
   ```

   - *Objetivo*: Validar que los permisos de roles principales son heredados correctamente.

7. Denegar acceso a permisos no heredados

   ```ts
   it( 'Debería denegar acceso cuando un role no tiene el permiso heredados', () => {
      expect( hasPermission( 'user', 'create', roles, roleHierarchy ) ).to.be.false;
   } );
   ```

   - *Objetivo*: Validar que se deniega el acceso si no se heredo el permiso de un rol superior

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

1. Control de Acceso:
   - Uso de roles y jerarquías para gestionar permisos de manera flexible.
   - Implementación de comodines (*) para permisos globales.
2. Jerarquías:
   - Validación de herencia de permisos entre roles.
3. Manejo de Errores:
   - Validación de parámetros para prevenir fallos en tiempo de ejecución.
4. Pruebas Automatizadas:
   - Cobertura de escenarios comunes y excepciones.
