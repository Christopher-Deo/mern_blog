const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();


//app
const app = express();

//database connection
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

//cors handling
if (process.env.NODE_ENV == 'development') {
    app.use(cors({origin: `${process.env.CLIENT_URL}`}));
};



//routes
app.get('/api', (req, res) => {
    res.json({time: Date().toString()});
});


//port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});