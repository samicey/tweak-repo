import mongoose from 'mongoose';
let isConnected;

export const createDatabaseConnection = async () => {
    if (isConnected) {
        console.log('=> using existing database connection');
        return Promise.resolve();
      }
      
    mongoose.Promise = global.Promise;

    return await mongoose.connect(process.env.DB,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      })
    .then(db => { 
      isConnected = db.connections[0].readyState;
    });
}