'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn(
                'Products', // table name
                'is_lock', // new field name
                {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                },
            ),
        ]);
    },

    async down(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.removeColumn('Products', 'is_lock')
        ]);
    },
};
