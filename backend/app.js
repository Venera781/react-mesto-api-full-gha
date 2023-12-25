import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index.js';
import { errors } from 'celebrate';
import checkErrors from './errors/checkErrors.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';

const app = express();
const { PORT = 3000 } = process.env;

await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
console.log('MongoDB connected');

app.use(requestLogger); // подключаем логгер запросов
app.use(express.json());
app.use(routes);
app.use(errorLogger); // подключаем логгер ошибок

app.use(errors({ statusCode: 400 }));
app.use((err, req, res, next) => {
  checkErrors(err, res, next);
});
app.listen(PORT);
