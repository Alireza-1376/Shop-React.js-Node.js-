import { Form, Formik } from 'formik';
import { FiArrowLeft, FiMail, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Error from '../../ui/Error';
import Loading from '../../ui/Loading';
import * as Yup from 'yup';
import type { CompleteProfileValueType, UserItems } from '../../types/auth';
import Input from '../../ui/Input';
import { useUpdateProfile } from './useUpdateProfile';

function EditProfileForm({ user, setEditProfile }: { user: UserItems, setEditProfile: React.Dispatch<React.SetStateAction<boolean>> }) {
    const navigate = useNavigate();
    const { isPending, mutateAsync } = useUpdateProfile();

    const initialValue: CompleteProfileValueType = {
        username: user ? user?.username : "",
        email: user ? user.email : ""
    }

    const validationSchema = Yup.object({
        username: Yup.string().required("لطفا نام کاربری خود را وارد کنید").min(3, "نام کاربری باید بین 3 تا 50 کاراکتر باشد").max(50, "نام کاربری باید بین 3 تا 50 کاراکتر باشد"),
        email: Yup.string().required("لطفا ایمیل خود را وارد کنید").email("ایمیل وارد شده معتبر نیست")
    })

    const onSubmit = async (values: CompleteProfileValueType) => {
        await mutateAsync(values, {
            onSuccess: () => {
                setEditProfile(false)
            }
        })
    }


    return (
        <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form className="space-y-5">
                <div>
                    <label
                        htmlFor="username"
                        className="mb-2 block text-sm font-bold text-slate-700"
                    >
                        نام کاربری
                    </label>

                    <div className="space-y-1">
                        <div className='flex items-center relative'>
                            <FiUser className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <Input
                                name="username"
                                id="username"
                                style="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-4 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                                placeholder="نام کاربری خود را وارد کنید"
                            />
                        </div>
                        <Error name="username" />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-bold text-slate-700"
                    >
                        ایمیل
                    </label>

                    <div className="space-y-1">
                        <div className="relative">
                            <FiMail className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <Input
                                name="email"
                                id="email"
                                style="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-4 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                                placeholder="ایمیل خود را وارد کنید"
                            />
                        </div>
                        <Error name="email" />
                    </div>
                </div>

                <button
                    type="submit"
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/15 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
                >
                    {isPending ? <Loading size={20} /> : <span className="flex items-center gap-2">
                        ویرایش
                    </span>}

                </button>
            </Form>
        </Formik>
    )
}

export default EditProfileForm