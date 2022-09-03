export const errorsFirebase = (errorCode) => {
    switch(errorCode){
        case 'auth/email-already-in-use':
            //return('El correo ya existe');
            return {
                code: 'email',
                message: 'El correo ya existe'
            }
        case 'auth/invalid-email':
            //return('Formato de email no valido');
            return {
                code: 'email',
                message: 'Formato de email no valido'
            }
        case 'auth/user-not-found':
            //return('Correo no encontrado');
            return {
                code: 'email',
                message: 'Correo no encontrado'
            }
        case 'auth/wrong-password':
            //return('Contraseña incorrecta');
            return {
                code: 'password',
                message: 'Contraseña incorrecta'
            }
        default:
            //return('Error con el servidor');
            return {
                code: 'email',
                message: 'Error con el servidor'
            }
    }
}