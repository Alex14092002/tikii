'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Withdraw extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Withdraw.init(
        {
            order_code: DataTypes.STRING,
            phone: DataTypes.STRING,
            amount: DataTypes.BIGINT,
            full_name: DataTypes.STRING,
            name_bank: DataTypes.STRING,
            number_bank: DataTypes.STRING,
            status: DataTypes.INTEGER,
            is_agent_update: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'Withdraw',
        },
    );
    return Withdraw;
};
