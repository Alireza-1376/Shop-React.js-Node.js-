import { ErrorMessage } from "formik";

function Error({ name }: { name: string }) {
    return (
        <ErrorMessage name={name}>
            {error => {
                return <p className="text-sm text-red-500 dark:text-red-200 text-start">{error}</p>
            }}
        </ErrorMessage>
    )
}

export default Error;