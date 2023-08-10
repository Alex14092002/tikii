'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn(
                'Recharges', // table name
                'is_agent_update', // new field name
                {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                },
            )
        ]);
    },

    async down(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.removeColumn('Recharges', 'is_agent_update')
        ]);
    },
};
