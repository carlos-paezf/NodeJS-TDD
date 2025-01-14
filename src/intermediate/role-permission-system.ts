export function hasPermission (
    role: string,
    action: string,
    roles: Record<string, ( string | '*' )[]>,
    roleHierarchy?: Record<string, string[]>
): boolean {
    if ( typeof role !== "string" || typeof action !== 'string' ) {
        throw new Error( 'Invalid input: role and action must be a string' );
    }
    if ( !roles || typeof roles !== 'object' ) {
        throw new Error( 'Invalid input: roles must be an object' );
    }

    if ( !roles[ role ] ) return false;

    const permissions = roles[ role ];

    if ( permissions.includes( '*' ) || permissions.includes( action ) ) return true;

    if ( roleHierarchy ) {
        const parentRoles = roleHierarchy[ role ];
        if ( parentRoles && parentRoles.length > 0 ) {
            return parentRoles.some( parentRole => hasPermission( parentRole, action, roles, roleHierarchy ) );
        }
    }

    return false;
}