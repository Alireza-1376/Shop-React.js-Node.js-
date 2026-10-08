import Table from "../../../ui/Table";
import toLocalDateShort from "../../../utils/toLocalDateShort";
import toPersianNumber from "../../../utils/toPersianNumber";
import { useGetOrders } from "./useGetAdminOrders";
import { IoEye } from "react-icons/io5";

const PaymentStatus = {
  pending: {
    title: "در انتظار پرداخت",
    class: "bg-gray-100 text-gray-500",
  },
  paid: {
    title: "پرداخت شده",
    class: "bg-green-100 text-green-500",
  },
  failed: {
    title: "پرداخت ناموفق",
    class: "bg-red-100 text-red-500",
  }
};

const OrderStatus = {
  pending: {
    title: "در حال آماده‌سازی",
    class: "bg-gray-100 text-gray-500",
  },
  shipped: {
    title: "ارسال شده",
    class: "bg-blue-100 text-blue-500",
  },
  delivered: {
    title: "تحویل داده شده",
    class: "bg-green-100 text-green-500",
  },
};


function Orders() {
  const { isLoading, orders } = useGetOrders();

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-800 sm:text-2xl">
            سفارشات
          </h2>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-4 sm:px-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-800">
                لیست سفارشات
              </h3>

              <p className="mt-1 text-[11px] text-slate-400">
                {toPersianNumber(orders?.length || 0)} سفارش ثبت شده
              </p>
            </div>
          </div>
        </div>

        <Table>
          <Table.Header>
            <Table.RowHead>
              <th className="w-20 px-5 py-4 text-center text-xs font-bold text-slate-400">
                #
              </th>

              <th className="px-5 py-4 text-center text-xs font-bold text-slate-400">
                نام مشتری
              </th>

              <th className="px-5 py-4 text-center text-xs font-bold text-slate-400">
                مبلغ کل
              </th>

              <th className="px-5 py-4 text-center text-xs font-bold text-slate-400">
                آدرس
              </th>

              <th className="px-5 py-4 text-center text-xs font-bold text-slate-400">
                وضعیت سفارش
              </th>

              <th className="px-5 py-4 text-center text-xs font-bold text-slate-400">
                وضعیت پرداخت
              </th>

              <th className="px-5 py-4 text-center text-xs font-bold text-slate-400">
                کد پیگیری
              </th>

              <th className="px-5 py-4 text-center text-xs font-bold text-slate-400">
                تاریخ سفارش
              </th>

              <th className="w-32 px-5 py-4 text-center text-xs font-bold text-slate-400">
                عملیات
              </th>
            </Table.RowHead>
          </Table.Header>

          <Table.Body>
            {isLoading ? (
              <td
                colSpan={9}
                className="px-5 py-10 text-center text-sm text-slate-400"
              >
                در حال دریافت سفارشات...
              </td>
            ) : orders?.length === 0 ? (
              <td
                colSpan={9}
                className="px-5 py-10 text-center text-sm text-slate-400"
              >
                سفارشی وجود ندارد
              </td>
            ) : (
              orders?.map((order, index) => (
                <Table.RowBody key={order._id}>
                  {/* # */}
                  <td className="px-5 py-4 text-center text-sm font-bold text-slate-600">
                    {toPersianNumber(index + 1)}
                  </td>

                  {/* نام مشتری */}
                  <td className="px-5 py-4 text-center text-sm font-bold text-slate-700">
                    {order.user?.username}
                  </td>

                  {/* مبلغ */}
                  <td className="px-5 py-4 text-center text-sm font-bold text-slate-700">
                    {toPersianNumber(
                      order.totalPrice.toLocaleString("fa-IR")
                    )}{" "}
                    تومان
                  </td>

                  {/* آدرس */}
                  <td className="max-w-40 px-5 py-4 text-center text-sm text-slate-600">
                    {order.address}
                  </td>

                  {/* وضعیت سفارش */}
                  <td className="px-5 py-4 text-center">
                    <span className={`${OrderStatus[order.status].class} inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600`}>
                      {OrderStatus[order.status].title}
                    </span>
                  </td>

                  {/* وضعیت پرداخت */}
                  <td className="px-5 py-4 text-center">
                    <span className={`${PaymentStatus[order.paymentStatus].class} inline-flex rounded-full px-3 py-1 text-xs font-bold`}>
                      {PaymentStatus[order.paymentStatus].title}
                    </span>
                  </td>

                  {/* کد پیگیری */}
                  <td className="px-5 py-4 text-center text-sm text-slate-600">
                    {toPersianNumber(order.transactionId ? Number(order.transactionId) : "ندارد")}
                  </td>

                  {/* تاریخ */}
                  <td className="px-5 py-4 text-center text-sm text-slate-600">
                    {toLocalDateShort(order.createdAt)}
                  </td>

                  {/* عملیات */}
                  <td className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center text-blue-500">
                      <button className="cursor-pointer p-1">
                        <IoEye size={20} />
                      </button>
                    </div>
                  </td>
                </Table.RowBody>
              ))
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default Orders;