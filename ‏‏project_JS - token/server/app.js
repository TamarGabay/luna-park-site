const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const nodemon = require('nodemon')
const cors=require('cors');
const app = express();
const routerUser=require('./routes/routerUser')
const routerCard = require('./routes/routerCard')
const jwt = require('jsonwebtoken');//token


dotenv.config();

var corsOptions={
    origion:"*"
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// חיבור למונגו

mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected DB");
    }).catch((err) => console.log('Failed to connect to MongoDB:',err));

//app.use("/users",users)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


// הגדרת מסלול API לקריאת נתונים
app.get('/data', async (req, res) => {
    try {
        const data = await ExampleModel.find();
        res.json(data);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(process.env.PORT, function() {
        console.log(`listen in port ${process.env.PORT}`);
    })

    // פונקציה ליצירת טוקן
function generateToken(user) {
    // נתונים שיכללו בטוקן
    const payload = {
        id: user.id,
        username: user.username
    };
    
    // סוד החתימה (secret key)
    const secret = 'your-secret-key';
    
    // יצירת הטוקן
    const token = jwt.sign(payload, secret, { expiresIn: '1h' }); // הטוקן יפוג לאחר שעה
    return token;
}

// שימוש בפונקציה
const user = { id: 1, username: 'exampleUser' };
const token = generateToken(user);
console.log("-----------------------");
console.log(token);
console.log("-----------------------");

//----------------------------------------------------------------
// פונקציה לאימות הטוקן
function verifyToken(token) {
    const secret = 'your-secret-key';
    
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (err) {
        console.error('Invalid token:', err);
        return null;
    }
}

// שימוש בפונקציה
const decodedToken = verifyToken(token);
if (decodedToken) {
    console.log('Token is valid:', decodedToken);
} else {
    console.log('Token is invalid');
}


    //620e4a1e6819003cf423fe09
app.use(routerUser);
app.use(routerCard);
