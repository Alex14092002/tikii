'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn(
                'Messages', // table name
                'createdAt', // new field name
                {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
            ),
            queryInterface.addColumn(
                'Messages',
                'updatedAt',
                {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
            ),
        ]);
    },

    async down(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.removeColumn('Messages', 'createdAt'),
            queryInterface.removeColumn('Messages', 'updatedAt')
        ]);
    },
};
