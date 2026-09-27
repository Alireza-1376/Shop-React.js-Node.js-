export default function toPersianPrice(n: number): string {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const formattedNumber = n.toLocaleString('en-US');
    const farsiPrice = formattedNumber.toString().replace(/\d/g, x => farsiDigits[Number(x)])

    return farsiPrice;
}