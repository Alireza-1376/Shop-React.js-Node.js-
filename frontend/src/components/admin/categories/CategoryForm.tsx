import { Form, Formik } from "formik";
import Input from "../../../ui/Input";
import Error from "../../../ui/Error";
import * as Yup from 'yup';
import type { InitialValueType } from "../../../types/category";
import { useAddCategory } from "./useAddCategory";
import Loading from "../../../ui/Loading";



function CategoryForm({ setOpenModal }: { setOpenModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { isPending, mutateAsync } = useAddCategory()
    const initialValue = {
        title: "",
        englishTitle: "",
        description: ""
    };

    const validationSchema = Yup.object({
        title: Yup.string()
            .trim()
            .required("لطفا عنوان دسته بندی را وارد کنید")
            .min(3, "عنوان دسته بندی باید حداقل 3 کاراکتر باشد"),

        englishTitle: Yup.string()
            .trim()
            .required("لطفا عنوان انگلیسی دسته بندی را وارد کنید")
            .min(3, "عنوان انگلیسی دسته بندی باید حداقل 3 کاراکتر باشد"),

        description: Yup.string()
            .trim()
            .optional(),
    });

    const onSubmit = async (values: InitialValueType) => {
        await mutateAsync(values, {
            onSuccess: () => {
                setOpenModal(false)
            }
        })
    }

    return (
        <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form className="space-y-6">
                <div>
                    <label htmlFor="title" className="mb-2 block text-sm font-bold text-slate-700">
                        عنوان
                    </label>
                    <Input
                        name="title"
                        id="title"
                        style="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-4 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                        placeholder=""
                    />
                    <Error name="title" />
                </div>
                <div>
                    <label htmlFor="englishTitle" className="mb-2 block text-sm font-bold text-slate-700">
                        عنوان انگلیسی
                    </label>
                    <Input
                        name="englishTitle"
                        id="englishTitle"
                        style="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-4 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                        placeholder=""
                    />
                    <Error name="englishTitle" />
                </div>
                <div>
                    <label htmlFor="description" className="mb-2 block text-sm font-bold text-slate-700">
                        توضیحات
                    </label>
                    <Input
                        name="description"
                        id="description"
                        style="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-4 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                        placeholder=""
                    />
                    <Error name="description" />
                </div>
                <div>
                    <button type="submit" className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/15 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none">
                        {isPending ? <Loading size={20} /> : <span className="flex items-center gap-2">
                            افزودن
                        </span>}
                    </button>
                </div>
            </Form>
        </Formik>
    )
}

export default CategoryForm;