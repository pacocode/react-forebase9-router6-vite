import ButtonLoading from "./ButtonLoading";

const Button = ({text, type, color = 'purple', loading, onClick}) => {

    if(loading) return <ButtonLoading />

    const className = `focus:outline-none text-white bg-${color}-700 hover:bg-${color}-800 focus:ring-4 focus:ring-${color}-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-900`;

    return (
        <>
            <button
                onClick={onClick}
                className={className}
                type={type}
            >
                {text}
            </button>
        </>
    )
}

export default Button;