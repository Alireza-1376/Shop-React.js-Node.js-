import { useUser } from "../../hooks/useUser";
import CheckoutHeader from "./CheckoutHeader";
import ReceiverInfo from "./ReceiverInfo";
import AddressForm from "./AddressForm";
import OrderSummary from "./OrderSummary";
import type { CartItem } from "../../types/cart";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { useSendAddress } from "./useSendAddress";
import type { AddressType } from "../../types/order";

function Checkout() {
    const { user } = useUser();
    const { isPending, mutateAsync } = useSendAddress();

    const address = {
        address: ""
    }

    if (!user) {
        return;
    }

    const cart: CartItem[] = user.cart || [];

    const totalPrice = cart.reduce((total, item) => {
        const price = item.product.price;
        const discount = item.product.discount || 0;

        const finalPrice =
            price - (price * discount) / 100;

        return total + finalPrice * item.quantity;
    }, 0);

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const validationSchema = Yup.object({
        address: Yup.string().required("لطفا آدرس خود را وارد کنید")
    })

    const handleSubmit = async (values: AddressType) => {
        await mutateAsync(values, {
            onSuccess: (data) => {
                window.location.assign(data.data.paymentUrl);
            }
        })
    }

    return (
        <Formik
            initialValues={address}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <div dir="rtl" className="min-h-screen bg-gray-50 px-4 py-8 pt-30 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <CheckoutHeader />
                    <Form>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            <div className="space-y-6 lg:col-span-2">
                                <ReceiverInfo />
                                <AddressForm name="address" />
                            </div>

                            <OrderSummary
                                isPending={isPending}
                                cart={cart}
                                totalPrice={totalPrice}
                                totalItems={totalItems}
                            />
                        </div>
                    </Form>
                </div>
            </div>
        </Formik>
    );
}



export default Checkout;