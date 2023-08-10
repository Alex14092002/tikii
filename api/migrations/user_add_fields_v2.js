'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn(
                'Users', // table name
                'status_pay', // new field name
                {
                    type: Sequelize.INTEGER,
                    defaultValue: 1
                },
            )
        ]);
    },

    async down(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.removeColumn('Users', 'status_pay')
        ]);
    },
};
