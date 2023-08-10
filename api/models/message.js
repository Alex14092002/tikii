'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Message extends Model {
        static associate(models) {
            Message.belongsTo(models.Conversation, {
                foreignKey: 'conversation_id',
                as: 'conversation',
            });
        }
    }
    Message.init(
        {
            content: DataTypes.STRING,
            sender: DataTypes.STRING,
            file: DataTypes.STRING,
            file_type: DataTypes.STRING,
            agent_id: DataTypes.INTEGER,
            customer_id: DataTypes.INTEGER,
            support_id: DataTypes.BIGINT
        },
        {
            sequelize,
            modelName: 'Message',
        },
    );

    return Message;
};
