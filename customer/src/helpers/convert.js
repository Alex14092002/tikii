export default {
    toVND: (price) => {
        if (!price) return;
        return price.toLocaleString();
    },
    bankCard: (card) => {
        // keep 4 first and 4 last digits
        return card.replace(/(?<=\d{4})\d(?=\d{4})/g, '*');
    },

    timeString: (d, h, m, s) => {
        let string = '';
        if (d && d > 0) string += `${d} ngày `;
        if (h && h > 0) string += `${h} giờ `;
        if (m && m > 0) string += `${m} phút `;
        if (s && s > 0) string += `${s} giây `;
        //console.log(string);
        return string;
    },

    replaceCharacters: (str) => {
        if (!str) return;
        return str.replace(/^(\d{4}).*(\d{4})$/, function (match, firstDigits, lastDigits) {
            var replacement = '*'.repeat(str.length - firstDigits.length - lastDigits.length);
            return firstDigits + replacement + lastDigits;
        });
    },
};
