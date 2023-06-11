const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler.middleware');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', routes);

app.use(errorHandler);

require('./config/database');

app.listen(PORT, () => console.log(`Server started on the port ${PORT}`));
