/**
 * Định dạng số thành chuỗi tiền tệ Việt Nam Đồng (VND)
 * Sử dụng API chuẩn của JavaScript (Intl.NumberFormat)
 * @param {number} amount - Số tiền cần định dạng
 * @returns {string} - Chuỗi tiền tệ đã được định dạng
 */
const formatCurrency = (amount) => {
    // 1. Kiểm tra nếu giá trị không phải là số hợp lệ
    if (typeof amount !== 'number' || isNaN(amount)) {
        return "Liên hệ giá"; // Trả về thông báo nếu dữ liệu không hợp lệ
    }
    
    // 2. Sử dụng Intl.NumberFormat để định dạng
    // 'vi-VN': Locale (Ngôn ngữ/Khu vực) là Tiếng Việt - Việt Nam
    // style: 'currency': Định dạng tiền tệ
    // currency: 'VND': Đơn vị tiền tệ là Việt Nam Đồng
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0 // Bỏ phần thập phân (vd: ,00 đ)
    }).format(amount);
};

export default formatCurrency;