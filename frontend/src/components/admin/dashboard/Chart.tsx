import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { Order } from '../../../types/order';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);
ChartJS.defaults.font.family = 'Vazir';

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: "نمودار فروش سالانه",
            font: {
                size: 20,
            }
        },
    },
    scales: {
        y: {
            min: 0,
            max: 10000000,
            title: {
                display: true,
                text: 'ریال',
                font: { size: 14 },
            },
        },
    },
};

const labels = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];


function getPersianMonth(date: string): string {
    return String(
        new Date(date).toLocaleString("fa-IR", { month: "long" })
    );
}

function getPersianYear(date: string): string {
    return String(
        new Date(date).toLocaleString("fa-IR", { year: "numeric" })
    );
}

export function Chart({ orders }: { orders: Order[] }) {
    let priceArr = new Array(12).fill(0);

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label:  'کل فروش این ماه (ریال)',
                data: priceArr,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const now = new Date();
    const paidOrders = orders.filter((item) => {
        return item.paymentStatus == "paid"
    })

    paidOrders.forEach((order) => {
        const currentYear = getPersianYear(String(now))
        if (getPersianYear(order.createdAt) !== currentYear) return;
        const orderMonth = getPersianMonth(order.createdAt)
        const indexMonth = labels.findIndex((month) => {
            return month == orderMonth
        })
        priceArr[indexMonth] = priceArr[indexMonth] + order.totalPrice
    })

    return <Line options={options} data={data} />;
}
