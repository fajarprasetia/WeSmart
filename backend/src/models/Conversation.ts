import { Model, DataTypes, Sequelize } from 'sequelize';
import Customer from './Customer';

class Conversation extends Model {
    public id!: number;
    public customerId!: number;
    public agentId!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default Conversation;

export const initConversation = (sequelize: Sequelize) => {
    Conversation.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Customer,
                key: 'id',
            },
        },
        agentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'conversations',
    });
};
