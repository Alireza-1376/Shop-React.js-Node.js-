import { Field } from "formik";
import { FiMapPin } from "react-icons/fi";
import Error from "../../ui/Error";

function AddressForm({ name }: { name: string }) {
    return (
        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                    <FiMapPin
                        size={19}
                        className="text-emerald-500"
                    />
                </div>

                <div>
                    <h2 className="font-semibold text-gray-800">
                        آدرس ارسال
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                        سفارش شما به این آدرس ارسال می‌شود
                    </p>
                </div>
            </div>

            <label
                htmlFor="address"
                className="mb-2 block text-sm text-gray-600"
            >
                آدرس کامل
            </label>

            <Field
                as="textarea"
                name={name}
                placeholder="استان، شهر، خیابان، کوچه، پلاک و واحد..."
                rows={5}
                className="w-full resize-none rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
            <Error name={name} />
        </div>
    );
}

export default AddressForm;