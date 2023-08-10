'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

    async up(queryInterface, Sequelize) {

        await queryInterface.bulkInsert('Banks', [

            {
                "id": 1,
                "phone": "0988765224",
                "full_name": "Bùi Thị Liên",
                "name_bank": "Vietcombank",
                "number_bank": "1018009960",
                "wallet_usdt": "",
                "createdAt": "2023-06-12 10:24:23",
                "updatedAt": "2023-06-12 10:24:23"
            },


            {
                "id": 4,
                "phone": "0962292688",
                "full_name": "VUONG QUOC TUAN",
                "name_bank": "Vietcombank ",
                "number_bank": "00083000720688",
                "wallet_usdt": "",
                "createdAt": "2023-06-12 10:38:22",
                "updatedAt": "2023-06-12 10:38:22"
            },
            {
                "id": 5,
                "phone": "0989314097",
                "full_name": "0989314097",
                "name_bank": "MB bank",
                "number_bank": "BUIMANHHUNG",
                "wallet_usdt": "",
                "createdAt": "2023-06-12 12:01:21",
                "updatedAt": "2023-06-12 12:01:21"
            },
            {
                "id": 6,
                "phone": "0963258147",
                "full_name": "0989314099",
                "name_bank": "vietcombank",
                "number_bank": "NGUYENMINHLONG",
                "wallet_usdt": "",
                "createdAt": "2023-06-12 12:55:43",
                "updatedAt": "2023-06-12 12:55:43"
            },
            {
                "id": 7,
                "phone": "0866107775",
                "full_name": "Nguyễn Thành Đạt ",
                "name_bank": "MB Bank",
                "number_bank": "0989314096",
                "wallet_usdt": "",
                "createdAt": "2023-06-12 13:26:18",
                "updatedAt": "2023-06-12 13:26:18"
            },
            {
                "id": 8,
                "phone": "0356035888",
                "full_name": "NGUYEN TUAN PHONG",
                "name_bank": "MB bank",
                "number_bank": "0935666789",
                "wallet_usdt": "",
                "createdAt": "2023-06-12 13:54:17",
                "updatedAt": "2023-06-12 13:54:17"
            },

            {
                "id": 10,
                "phone": "0337479979",
                "full_name": "Phạm thị lý ",
                "name_bank": "Sacombank ",
                "number_bank": "050027336296",
                "wallet_usdt": "",
                "createdAt": "2023-06-12 14:42:01",
                "updatedAt": "2023-06-12 14:42:01"
            },
            {
                "id": 11,
                "phone": "0911313318",
                "full_name": "Lê Thị Tuyết Nhung ",
                "name_bank": "ACB- Ngân hàng Á Châu ",
                "number_bank": "2744427",
                "wallet_usdt": "",
                "createdAt": "2023-06-12 21:28:39",
                "updatedAt": "2023-06-12 21:28:39"
            },
            {
                "id": 12,
                "phone": "0906068230",
                "full_name": "BUI THI LIEN",
                "name_bank": "Vietcombank",
                "number_bank": "1018009960",
                "wallet_usdt": "",
                "createdAt": "2023-06-12 22:01:31",
                "updatedAt": "2023-06-12 22:01:31"
            },
            {
                "id": 13,
                "phone": "0986460915",
                "full_name": "NGUYEN THI YEN NHI",
                "name_bank": "VIETINBANK",
                "number_bank": "108869889099",
                "wallet_usdt": "",
                "createdAt": "2023-06-13 11:35:11",
                "updatedAt": "2023-06-13 11:35:11"
            },
            {
                "id": 14,
                "phone": "0334497924",
                "full_name": "Trần Thị Ngọc Giàu",
                "name_bank": "Sacombank",
                "number_bank": "070050422702",
                "wallet_usdt": "",
                "createdAt": "2023-06-13 14:31:50",
                "updatedAt": "2023-06-13 14:31:50"
            },
            {
                "id": 15,
                "phone": "0337610436",
                "full_name": "Dương Thanh Thủy ",
                "name_bank": "Ngân hàng ACB ",
                "number_bank": "13186",
                "wallet_usdt": "",
                "createdAt": "2023-06-13 15:42:45",
                "updatedAt": "2023-06-13 15:42:45"
            },
            {
                "id": 16,
                "phone": "0373986085",
                "full_name": "Bùi  Thị Liên ",
                "name_bank": "Vietcombank",
                "number_bank": "1018009960",
                "wallet_usdt": "",
                "createdAt": "2023-06-13 21:41:09",
                "updatedAt": "2023-06-13 21:41:09"
            }

        ])
    }
}