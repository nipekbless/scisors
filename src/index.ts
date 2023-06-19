import express from 'express';
import {config} from './config/config'
import routes from './routes/app';
import db from './db'
import bodyParser from 'body-parser';



const app = express();
const PORT = config.server.port;
app.use(express.json())

app.listen(PORT, () =>{
console.log(`listening on ${PORT}`);
routes(app)
db()
});
