const MA_WEBSITE = 'MXWCJ2KO' //vnp_TmnCode
const HASHSECRET = 'DODOGMIIPEUAOAJXVCNWGDXQEFEKPKGK'//vnp_HashSecret
const HASHSECRET_SHA256 = 'f7057df7d14585dcc677c32b0be6568f64b750f1731b6548652bcedba1f9ebcd2edb7e12cc35c25cd50669980f41b0766f5369e16260ef4e931b46d4f39fb30b'//vnp_HashSecret
const RETURN_BE_URL = process.env.REACT_APP_BACKEND_URL + 'api/vnpay/thanhtoan'
function formatTime() {
    const currentTime = new Date();
    const timeZoneOffset = 7 * 60; // Đổi 7 thành số phút của múi giờ cần thiết
    currentTime.setMinutes(currentTime.getMinutes() + timeZoneOffset);

    // Lấy các thành phần thời gian (năm, tháng, ngày, giờ, phút, giây)
    const year = currentTime.getFullYear();
    const month = String(currentTime.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = String(currentTime.getDate()).padStart(2, '0');
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentTime.getSeconds()).padStart(2, '0');

    // Tạo định dạng "yyyyMMddHHmmss"
    const formattedTime = `${year}${month}${day}${hours}${minutes}${seconds}`;
    return formattedTime
}

export const redirect2VnPay = ({
    giaTien = 0
}) => {

    return `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=${giaTien}&vnp_Command=pay&vnp_CreateDate=${formatTime()}&vnp_CurrCode=VND&vnp_IpAddr=127.0.0.1&vnp_Locale=vn&vnp_OrderInfo=Thanh+toan+don+hang+%3A5&vnp_OrderType=200000&vnp_ReturnUrl=${RETURN_BE_URL}&vnp_TmnCode=${MA_WEBSITE}&vnp_TxnRef=1&vnp_Version=2.1.0&vnp_SecureHash=${HASHSECRET_SHA256}`
}
