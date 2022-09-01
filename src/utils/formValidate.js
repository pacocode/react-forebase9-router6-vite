export const formValidate = (getValues) => {
    return {
        required: {
            value: true,
            message: 'Campo Obligatorio'
        },
        patternEmail: {
            value: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
            message: 'Formato de email incorrecto'
        },
        minLength: {
            value: 6,
            message: 'Minimo 6 caracteres'
        },
        checkSpaces: {
            trimCheck: (v) => {
                if(!v.trim()){
                    return "escribe algo"
                }
            return true;
            }
        },
        samePassword(getValues) {
            return {
                CustomErrorequals: (v) =>
                    v === getValues('password') ||
                    "No coinciden las contraseñas"
            }
        }
    }
}