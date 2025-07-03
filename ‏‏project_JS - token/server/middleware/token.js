const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET;

const generateToken = (req, res, next) => {
    try {
        //
        const nameUser= req.body.nameUser;
        const id= req.body.id;
        console.log("sdsdsdsdsddsdsdsdsdsdsdsdsdsdsdsdsddsdsdsdsddsdsdsdsdsdsdsd"+nameUser,id)
        const token = jwt.sign({ nameUser, id }, secretKey, { expiresIn: '1h' });
        console.log("token"+token)
        req.token = token;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error generating token' });
    }
};
//verifyToken
function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // שליפת הטוקן מהכותרת

    console.log('Received token:', token); // לוג לטוקן שהתקבל

    if (!token) {
        console.log('No token provided');
        return res.status(403).json({ error: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log('Token verification failed:', err); // לוג לשגיאת אימות הטוקן
            return res.status(500).json({ error: 'Failed to authenticate token' });
        }
        //conaole.log(decoded.id)
        req.userId = decoded.id; // שמירת ה-id של המשתמש בבקשה (אם יש צורך)
        next();
    });
}

module.exports = 
{
    generateToken,
    verifyToken
};