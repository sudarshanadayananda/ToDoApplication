import express from 'express';
import DB from './config/db';
import CORS from './config/cors';
import notFound from './config/notFound';
import error from './config/error';
import { restRouter } from './routes';

const app = express();
const PORT = 3001;

// Crate DB Connection.
DB.connect();

app.use(express.json());
app.use(CORS.handleCors);
app.use('/api', restRouter);
app.use(notFound);
app.use(error);

app.listen(PORT, () => console.log(`ToDOApp backend listening on port ${PORT}!`));