'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn(
                'Messages', // table name
                'agent_id', // new field name
                {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                },
            ),
            queryInterface.addColumn(
                'Messages',
                'customer_id',
                {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                },
            ),
            queryInterface.addColumn(
                'Messages',
                'file',
                {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
            ),
            queryInterface.addColumn(
                'Messages',
                'file_type',
                {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
            ),
        ]);
    },

    async down(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.removeColumn('Messages', 'agent_id'),
            queryInterface.removeColumn('Messages', 'customer_id'),
            queryInterface.removeColumn('Messages', 'file'),
            queryInterface.removeColumn('Messages', 'file_type')
        ]);
    },
};
