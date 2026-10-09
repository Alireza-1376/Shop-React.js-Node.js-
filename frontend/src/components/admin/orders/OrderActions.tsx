import { IoEye } from "react-icons/io5";
import { MdEditNote } from "react-icons/md";
import type { Order } from "../../../types/order";
import Modal from "../../../ui/Modal";
import { useState } from "react";
import OrderDetail from "./OrderDetail";
import { useChangeStatus } from "./useChangeStatus";
import Loading from "../../../ui/Loading";

type OrderStatusType = "pending" | "shipped" | "delivered";

const OrderStatus = [
    {
        id: 1,
        title: "در حال آماده‌سازی",
        value: "pending"
    },
    {
        id: 2,
        title: "ارسال شده",
        value: "shipped"
    },
    {
        id: 3,
        title: "تحویل داده شده",
        value: "delivered"
    }
]

function OrderActions({ order }: { order: Order }) {
    const [isDetail, setIsDetail] = useState(false);
    const [isStatus, setIsStatus] = useState(false);
    const [orderStatus, setOrderStatus] = useState<OrderStatusType>(order.status);
    const { isPending, mutateAsync } = useChangeStatus();


    async function handleChangeStatus() {
        if (orderStatus.trim().length == 0) {
            return;
        }
        await mutateAsync({ id: order._id, data: { status: orderStatus } })
    }

    return (
        <div className="flex items-center justify-center text-blue-500 gap-1">
            <button onClick={() => { setIsStatus(true) }} type="button" className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-yellow-100 text-yellow-400 transition-all hover:bg-yellow-500 hover:text-white" title="تغییر وضعیت سفارش">
                <MdEditNote size={20} />
            </button>
            <Modal
                isOpen={isStatus}
                onClose={() => { setIsStatus(false) }}
                title="تغییر وضعیت سفارش"
            >
                <div className="text-start flex flex-col gap-2 text-gray-600">
                    <label htmlFor="">وضعیت سفارش</label>
                    <select value={orderStatus} onChange={(e) => { setOrderStatus(e.target.value as OrderStatusType) }} className="w-full border border-gray-300 p-2 rounded-lg cursor-pointer">
                        {OrderStatus.map((item) => {
                            return <option key={item.id} value={item.value}>{item.title}</option>
                        })}
                    </select>
                </div>
                <button className="bg-emerald-500 w-full mt-4 text-white p-2.5 rounded-md cursor-pointer" onClick={() => { handleChangeStatus() }}>
                    {isPending ? <span className="flex items-center justify-center p-0.5"><Loading size={20} /></span> : "ثبت"}
                </button>
            </Modal>


            <button onClick={() => { setIsDetail(true) }} className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-blue-100 text-blue-400 transition-all hover:bg-blue-500 hover:text-white" title="مشاهده سفارش">
                <IoEye size={20} />
            </button>
            <Modal
                isOpen={isDetail}
                onClose={() => { setIsDetail(false) }}
                title="جزئیات سفارش"
            >
                <div className="text-start">
                    <OrderDetail order={order} />
                </div>
            </Modal>
        </div>
    )
}

export default OrderActions;