import express, { Request, Response ,NextFunction } from "express"
import {config} from './config/config'
import routes from './routes/app';
import db from './db'
import configurePassport from "./middleware/authentication";
import passport from "passport";
import authRouter from "./routes/auth";


const app = express();
const PORT = config.server.port;
app.use(express.json())
app.use(passport.initialize())
configurePassport(passport);

app.use("/" , authRouter)

// Serve static files
// app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () =>{
console.log(`listening on ${PORT}`);
routes(app)
db()
});


