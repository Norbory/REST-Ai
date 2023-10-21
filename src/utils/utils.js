const bcrypt = require('bcrypt');  
const jwt = require('jsonwebtoken');

const createHash = (password) => {
    return bcrypt.hashSync(password,10);
    }

const isValidPassword = (password,user ) => {
    return bcrypt.compareSync(password,user.password);
    }


//jwt token
const generateToken = (user) => {
    return jwt.sign({user},process.env.JWT_SECRET,{expiresIn: '7d'});
}

const authToken = (req,res,next) => {
    const tokenBearer = req.headers['authorization'];
    //Eliminar bearer del token
    const token = tokenBearer && tokenBearer.split(' ')[1];
    console.log(token);
    if(!token) return res.status(401).json({message: 'No se ha enviado un token'});
    jwt.verify(token,process.env.JWT_SECRET,(err,decodedToken) => {
        if(err) return res.status(401).json({message: 'Token inválido'});
        req.user = decodedToken.user;
        next();
    })
}

module.exports = { createHash, isValidPassword, generateToken, authToken }