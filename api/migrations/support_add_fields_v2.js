'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn(
                'Supports', // table name
                'is_guest', // new field name
                {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                },
            )
        ]);
    },

    async down(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.removeColumn('Supports', 'is_guest')
        ]);
    },
};
