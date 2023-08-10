export default {
    calculateDiscount: (price, sale) => {
        return 100 - ((parseInt(price) / parseInt(sale)) * 100).toFixed(0);
    },
    calculateTime: (time) => {
        const date = new Date(time);
        const now = new Date();
        const distance = date - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (60 * 60 * 1000));
        return `${days} ngày ${hours} giờ`;
    },
};
