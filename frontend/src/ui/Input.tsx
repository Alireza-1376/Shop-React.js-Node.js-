import { Field } from "formik";

type InputType = {
    name: string
    id: string
    placeholder: string
    style: string
}

function Input({ name, id, placeholder, style }: InputType) {
    return (
        <Field
            name={name}
            id={id}
            placeholder={placeholder}
            className={style}
        />
    )
}

export default Input;