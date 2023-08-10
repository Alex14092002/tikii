'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn(
                'Supports', // table name
                'createdAt', // new field name
                {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
            ),
            queryInterface.addColumn(
                'Supports',
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
            queryInterface.removeColumn('Supports', 'createdAt'),
            queryInterface.removeColumn('Supports', 'updatedAt')
        ]);
    },
};
