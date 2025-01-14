import { expect } from "chai";
import { hasPermission } from "../../src/intermediate/role-permission-system";


describe( 'INTERMEDIATE - Sistema de Roles y Permisos', () => {
    const roles: Record<string, string[]> = {
        admin: [ '*' ],
        manager: [ 'create', 'read', 'update', 'delete' ],
        user: [ 'read' ],
        supervisor: [ 'view_reports', 'edit_users' ]
    };

    const roleHierarchy = {
        manager: [ 'supervisor', 'user' ],
        user: [ 'supervisor' ]
    };

    it( 'Debería permitir acceso si el usuario tiene permisos', () => {
        expect( hasPermission( 'admin', 'create', roles ) ).to.be.true;
    } );

    it( 'Debería denegar acceso si el usuario no tiene permisos', () => {
        expect( hasPermission( 'user', 'delete', roles ) ).to.be.false;
    } );

    it( 'Debería manejar roles inexistentes', () => {
        expect( hasPermission( 'guest', 'read', roles ) ).to.be.false;
    } );

    it( 'Debería lanzar un error cuando el role no es un string', () => {
        expect( () => hasPermission( 123 as any, 'read', roles ) ).to.throw( 'Invalid input: role and action must be a string' );
    } );

    it( 'Debería lanzar un error cuando los roles no son un objeto', () => {
        expect( () => hasPermission( 'user', 'read', null as any ) ).to.throw( 'Invalid input: roles must be an object' );
    } );

    it( 'Debería permitir acceso cuando el role tiene permiso comodín (*) para una acción no relacionada', () => {
        expect( hasPermission( 'admin', 'delete', roles ) ).to.be.true;
    } );

    it( 'Debería permitir acceso cuando un role tiene permisos heredados de múltiples roles principales', () => {
        expect( hasPermission( 'manager', 'view_reports', roles, roleHierarchy ) ).to.be.true;
    } );

    it( 'Debería denegar acceso cuando un role no tiene el permiso heredados', () => {
        expect( hasPermission( 'user', 'create', roles, roleHierarchy ) ).to.be.false;
    } );
} );