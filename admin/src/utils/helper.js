const Helper = {
    formatMoney: (money, type = ',') => {
        return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${type}`);
    }
}
export default Helper;