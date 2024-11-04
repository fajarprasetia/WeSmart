import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import User, { initUser } from './User';
import Customer, { initCustomer } from './Customer';
import Conversation, { initConversation } from './Conversation';
import Message, { initMessage } from './Message';

dotenv.config();

export const db = new Sequelize(process.env.DATABASE_URL as string, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
});

// Initialize Models
initUser(db);
initCustomer(db);
initConversation(db);
initMessage(db);

// Associations
Customer.hasMany(Conversation, { foreignKey: 'customerId' });
Conversation.belongsTo(Customer, { foreignKey: 'customerId' });

Conversation.hasMany(Message, { foreignKey: 'conversationId' });
Message.belongsTo(Conversation, { foreignKey: 'conversationId' });

// Synchronize Models
db.sync({ alter: true })
  .then(() => console.log('Database synchronized'))
  .catch(err => console.log('Error synchronizing database:', err));

export { User, Customer, Conversation, Message };
