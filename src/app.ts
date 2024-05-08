import mongoose from 'mongoose';
import "reflect-metadata";
import bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './inversify.config'; 

const PORT = 3000;
const MONGO_URI = 'mongodb+srv://kushal:kushal123@backenddb.yac2nn2.mongodb.net/KP';

let server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
});

let app = server.build()

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to Database ');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error('MongoDB connection failed:', error);
        process.exit();
    });
