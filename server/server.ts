import path from 'path';
import express from "express";
import {Request,Response} from "express";
import routes from './lib/routes';
const port = 8080;
const app = express();
const reactFolder = path.resolve(__dirname, '../client/dist')
import { Server } from "socket.io";
import {initSocket} from "./lib/socket";
import cors from "cors"
app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/', (req: Request<{}, {},{}>, res: Response) => {
    res.sendFile(path.resolve(reactFolder, 'index.html'));
});
app.use(express.static(reactFolder));
export const server = require('http').createServer(app);
const ioServ = new Server(server,  { cors: { origin: '*' } });

export const io = initSocket(ioServ);
server.listen(port);
console.log(`Server listening on port ${port}`)

