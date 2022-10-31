import server, { launchServer } from './server.js';
import { sendRequest } from './request.js';

launchServer();
sendRequest().then((res) => console.log(res.data));
