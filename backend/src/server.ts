import { server } from './app';
import { db } from './models';

const PORT = process.env.PORT || 5000;

// Test Database Connection
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
