import PaginationBtns from "../../../ui/Pagination";
import Table from "../../../ui/Table";
import toLocalDateShort from "../../../utils/toLocalDateShort";
import toPersianNumber from "../../../utils/toPersianNumber";
import toPersianPrice from "../../../utils/toPersianPrice";
import OrderActions from "./OrderActions";
import OrderHeader from "./OrderHeader";
import { useGetOrders } from "./useGetAdminOrders";

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
      <OrderHeader />

      <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-4 sm:px-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-800">
                لیست سفارشات
              </h3>

              <p className="mt-1 text-[11px] text-slate-400">
                {toPersianNumber(orders?.orders.length || 0)} سفارش ثبت شده
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
              <Table.RowBody>
                <td
                  colSpan={9}
                  className="px-5 py-10 text-center text-sm text-slate-400"
                >
                  در حال دریافت سفارشات...
                </td>
              </Table.RowBody>
            ) : !orders || orders.orders.length === 0 ? (
              <Table.RowBody>
                <td
                  colSpan={9}
                  className="px-5 py-10 text-center text-sm text-slate-400"
                >
                  سفارشی وجود ندارد
                </td>
              </Table.RowBody>
            ) : (
              orders.orders.map((order, index) => (
                <Table.RowBody key={order._id}>
                  <td className="px-5 py-4 text-center text-sm font-bold text-slate-600">
                    {toPersianNumber(index + 1)}
                  </td>

                  <td className="px-5 py-4 text-center text-sm font-bold text-slate-700">
                    {order.user?.username || "نامشخص"}
                  </td>

                  <td className="px-5 py-4 text-center text-sm font-bold text-slate-700">
                    {toPersianPrice(order.totalPrice)} تومان
                  </td>

                  <td className="max-w-40 px-5 py-4 text-center text-sm text-slate-600">
                    {order.address}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${OrderStatus[order.status]?.class ??
                        "bg-gray-100 text-gray-500"
                        }`}
                    >
                      {OrderStatus[order.status]?.title ?? "نامشخص"}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${PaymentStatus[order.paymentStatus]?.class ??
                        "bg-gray-100 text-gray-500"
                        }`}
                    >
                      {PaymentStatus[order.paymentStatus]?.title ??
                        "نامشخص"}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-center text-sm text-slate-600">
                    {order.transactionId
                      ? toPersianNumber(order.transactionId)
                      : "ندارد"}
                  </td>

                  <td className="px-5 py-4 text-center text-sm text-slate-600">
                    {toLocalDateShort(order.createdAt)}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <OrderActions order={order} />
                  </td>
                </Table.RowBody>
              ))
            )}
          </Table.Body>
        </Table>
      </div>

      {orders && orders.totalOrders != 0 &&
        <PaginationBtns currentPage={orders?.currentPage} lastPage={orders?.totalPages} />
      }

    </div>
  );
}

export default Orders;