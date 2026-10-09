import {
  HiOutlineShoppingBag,
  HiOutlineCurrencyDollar,
  HiOutlineClock,
  HiOutlineCreditCard,
} from "react-icons/hi2";
import Stats from "./Stats";
import { useGetOrders } from "../orders/useGetAdminOrders";
import Loading from "../../../ui/Loading";
import toPersianPrice from "../../../utils/toPersianPrice";
import toPersianNumber from "../../../utils/toPersianNumber";


function Dashboard() {
  const { isLoading, orders } = useGetOrders();
  const filterOrders = orders?.orders.filter((order) => {
    return order.paymentStatus == "paid"
  })
  const totalPrice = filterOrders?.reduce((acc, curr) => {
    return acc + curr.totalPrice
  }, 0)
  const pendingOrders = orders?.orders.filter((order) => {
    return order.status == "pending"
  })

  const faildOrders = orders?.orders.filter((order) => {
    return order.paymentStatus != "paid"
  })


  return (
    <div dir="rtl" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {isLoading ? <div className="flex items-center justify-center h-full text-emerald-500"><Loading size={30} /></div>
        :
        <Stats
          title="کل سفارش‌ها"
          Icon={HiOutlineShoppingBag}
          description="تعداد کل سفارش‌های ثبت‌ شده"
          accent="bg-blue-500"
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          unit=""
          value={toPersianNumber(String(orders?.orders.length))}
        />
      }

      {isLoading ? <div className="flex items-center justify-center h-full text-emerald-500"><Loading size={30} /></div>
        :
        <Stats
          title="مجموع فروش"
          Icon={HiOutlineCurrencyDollar}
          description="مجموع سفارش‌های پرداخت‌ شده"
          accent="bg-emerald-500"
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          unit="تومان"
          value={toPersianPrice(Number(totalPrice))}
        />
      }
      {isLoading ? <div className="flex items-center justify-center h-full text-emerald-500"><Loading size={30} /></div>
        :
        <Stats
          title="در انتظار ارسال"
          Icon={HiOutlineClock}
          description="سفارش‌های در حال آماده‌سازی"
          accent="bg-amber-500"
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          unit=""
          value={toPersianNumber(String(pendingOrders?.length))}
        />
      }
      {isLoading ? <div className="flex items-center justify-center h-full text-emerald-500"><Loading size={30} /></div>
        :
        <Stats
          title="سفارش‌های پرداخت‌نشده"
          Icon={HiOutlineCreditCard}
          description="سفارش‌هایی که هنوز پرداخت نشده‌اند"
          accent="bg-rose-500"
          iconBg="bg-rose-50"
          iconColor="text-rose-600"
          unit=""
          value={toPersianNumber(String(faildOrders?.length))}
        />
      }
    </div>
  );
}

export default Dashboard;