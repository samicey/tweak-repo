import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
let isConnected: number;

export const createDatabaseConnection = async () => {
    const { DATABASE_CONNECTION_URI } = process.env;

    if (!DATABASE_CONNECTION_URI) {
        console.log('=> no database connection');
        return Promise.reject();
      }
    if (isConnected) {
        console.log('=> using existing database connection');
        return Promise.resolve();
    }

    return await mongoose.connect(DATABASE_CONNECTION_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      })
    .then(db => { 
      isConnected = db.connections[0].readyState;
    });
}