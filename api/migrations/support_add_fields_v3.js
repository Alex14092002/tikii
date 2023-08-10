'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn(
                'Supports', // table name
                'status_sort', // new field name
                {
                    type: Sequelize.INTEGER,
                    defaultValue: 1,
                },
            )
        ]);
    },

    async down(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.removeColumn('Supports', 'status_sort')
        ]);
    },
};
