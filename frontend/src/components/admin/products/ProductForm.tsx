import { Field, Form, Formik } from "formik";
import Input from "../../../ui/Input";
import Error from "../../../ui/Error";
import * as Yup from 'yup';
import type { InitialValueType, ProductType } from "../../../types/product";
import { useGetCategories } from "../categories/useGetCategories";
import { useAddCategory } from "./useAddProduct";
import Loading from "../../../ui/Loading";
import { useEffect, useState } from "react";
import { useUpdateProduct } from "./useUpdateProduct";

function ProductForm({ setOpenModal, product }: { setOpenModal: React.Dispatch<React.SetStateAction<boolean>>, product?: ProductType }) {
    const { isLoading, data } = useGetCategories();
    const { isUpdating, update } = useUpdateProduct()
    const { isAdd, add } = useAddCategory();
    let [initialValues, setInitialValues] = useState({
        title: "",
        description: "",
        price: "",
        stock: "",
        discount: "",
        category: ""
    });

    useEffect(() => {
        if (product) {
            setInitialValues({
                title: product.title,
                description: product.description,
                price: String(product.price),
                stock: String(product.stock),
                discount: String(product.discount),
                category: product.category._id
            })
        }
    }, [])

    const validationSchema = Yup.object({
        title: Yup.string()
            .required("عنوان محصول الزامی است")
            .min(3, "عنوان محصول باید حداقل 3 کاراکتر باشد"),

        description: Yup.string()
            .required("توضیحات محصول الزامی است")
            .min(3, "توضیحات محصول باید حداقل 3 کاراکتر باشد"),

        price: Yup.number()
            .typeError("قیمت محصول باید عدد باشد")
            .required("قیمت محصول الزامی است"),

        stock: Yup.number()
            .typeError("موجودی محصول باید عدد باشد")
            .required("موجودی محصول الزامی است"),

        category: Yup.string()
            .required("دسته بندی محصول الزامی است"),

        discount: Yup.number()
            .required("تخفیف محصول الزامی است")
            .typeError("تخفیف محصول باید عدد باشد")
            .min(0, "تخفیف محصول نمی‌تواند کمتر از 0 باشد")
            .max(100, "تخفیف محصول باید بین 0 تا 100 باشد")
    });

    const onSubmit = async (values: InitialValueType) => {
        if (product) {
            await update({ id: product._id, data: values }, {
                onSuccess: () => {
                    setOpenModal(false)
                }
            })
        } else {
            await add(values, {
                onSuccess: () => {
                    setOpenModal(false)
                }
            })
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {formik => {
                return <Form className="space-y-6">
                    <div>
                        <label htmlFor="title" className="mb-2 text-start block text-sm font-bold text-slate-700">
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
                        <label htmlFor="price" className="mb-2 text-start block text-sm font-bold text-slate-700">
                            قیمت
                        </label>
                        <Input
                            name="price"
                            id="price"
                            style="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-4 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                            placeholder=""
                        />
                        <Error name="price" />
                    </div>
                    <div>
                        <label htmlFor="stock" className="mb-2 text-start block text-sm font-bold text-slate-700">
                            تعداد
                        </label>
                        <Input
                            name="stock"
                            id="stock"
                            style="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-4 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                            placeholder=""
                        />
                        <Error name="stock" />
                    </div>
                    <div>
                        <label htmlFor="discount" className="mb-2 text-start block text-sm font-bold text-slate-700">
                            تخفیف
                        </label>
                        <Input
                            name="discount"
                            id="discount"
                            style="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-4 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                            placeholder=""
                        />
                        <Error name="discount" />
                    </div>
                    <div>
                        <label htmlFor="category" className="mb-2 text-start block text-sm font-bold text-slate-700">
                            دسته بندی
                        </label>
                        {isLoading ? <div className="flex items-center justify-center"><Loading size={20} /></div> :
                            <select value={formik.values.category} id="category" name="category" onChange={(e) => { formik.setFieldValue("category", e.target.value) }} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-4 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10">
                                <option value="">انتخاب دسته بندی</option>
                                {data?.map((category) => {
                                    return <option key={category._id} value={category._id}>{category.title}</option>
                                })}
                            </select>
                        }
                        <Error name="category" />
                    </div>
                    <div>
                        <label htmlFor="description" className="mb-2 text-start block text-sm font-bold text-slate-700">
                            توضیحات
                        </label>
                        <Field className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-4 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10" as="textarea" name="description" id="" />
                        <Error name="description" />
                    </div>
                    <div>
                        <button type="submit" className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/15 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none">
                            {isAdd || isUpdating ? <Loading size={20} /> : <span className="flex items-center gap-2">
                                {product ? "ویرایش" : "افزودن"}
                            </span>}
                        </button>
                    </div>
                </Form>
            }}

        </Formik>
    )
}

export default ProductForm;