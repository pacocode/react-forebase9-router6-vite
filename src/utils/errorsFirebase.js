export const errorsFirebase = (errorCode) => {
    switch(errorCode){
        case 'auth/email-already-in-use':
            return('El correro ya existe');
        case 'auth/invalid-email':
            return('Formato de email no valido');
        case 'auth/user-not-found':
            return('Correo no encontrado');
        case 'auth/wrong-password':
            return('Contraseña incorrecta');
        default:
            return('Error con el servidor');
    }
}