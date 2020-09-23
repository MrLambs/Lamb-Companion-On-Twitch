import { CLIENT } from './util/constants/clientConstants';
import { main } from './util/functions/chatFunctions';
import mongoose from 'mongoose';
import { mongoURI } from './util/config/keys'

main(CLIENT);
['command', 'event'].forEach(x => require(`./handlers/${x}`)(CLIENT))

mongoose.connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
.then(() => console.log("[LOGS] MongoDB successfully connected!"))
.catch(err => console.log(`[ERR] ${err.message}`))