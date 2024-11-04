import { Model, DataTypes, Sequelize } from 'sequelize';
import Conversation from './Conversation';

class Message extends Model {
    public id!: number;
    public conversationId!: number;
    public sender!: string;
    public content!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default Message;

export const initMessage = (sequelize: Sequelize) => {
    Message.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        conversationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Conversation,
                key: 'id',
            },
        },
        sender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'messages',
    });
};
