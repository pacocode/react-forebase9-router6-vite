export const formValidate = () => {
    return {
        required: {
            value: true,
            message: 'Campo Obligatorio'
        },
        patternEmail: {
            value: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
            message: 'Formato de email incorrecto'
        },
        patternUrl: {
            value: /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
            message: 'Formato url incorrecto'
        },
        minLength(value) {
            return {
                value: value,
                message: 'Minimo 6 caracteres'
            }
            
        },
        checkSpaces: {
            trimCheck: (v) => {
                if(!v.trim()){
                    return "escribe algo"
                }
            return true;
            }
        },
        samePassword(value) {
            return {
                CustomErrorequals: (v) =>
                    v === value || "No coinciden las contraseñas"
            }
        }
    }
}