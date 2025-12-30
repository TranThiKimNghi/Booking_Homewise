const formatDate = (dateString) => {
    if (!dateString) return 'N/A'; // Nếu input null, undefined, "" → trả về "N/A"

    try {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',       // 4 chữ số năm
            month: '2-digit',      // 2 chữ số tháng
            day: '2-digit',        // 2 chữ số ngày
            hour: '2-digit',       // 2 chữ số giờ
            minute: '2-digit',     // 2 chữ số phút
        });
    } catch (e) {
        return dateString; // Nếu không parse được → trả về chuỗi gốc
    }
};

export default formatDate;