'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn(
                'Messages', // table name
                'support_id', // new field name
                {
                    type: Sequelize.BIGINT,
                    defaultValue: 0,
                },
            )
        ]);
    },

    async down(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.removeColumn('Messages', 'support_id')
        ]);
    },
};
