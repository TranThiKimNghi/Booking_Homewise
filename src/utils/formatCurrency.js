const formatCurrency = (amount) => {
    if (typeof amount !== 'number' || isNaN(amount)) {
        return "Liên hệ giá";
    }

    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    }).format(amount);
};

export default formatCurrency;