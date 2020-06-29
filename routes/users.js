var express = require('express');
var router = express.Router();
var db = require('../db');

var jwt = require('jsonwebtoken');
const config = require('../config');
var bcryptjs = require('bcryptjs');

const handleToken = (req, res, next) => {

    let token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, config.JWT_KEY, (err, decode) => {
        if (!err) {
            next();
        } else {
            res.status(401).json({
                success: false,
                error: err
            });
        }
    })
}


router.post('/registrar', (req, res, next) => {
    const { name, email, senha } = req.body.userData;

    const hash = bcryptjs.hashSync(senha, config.SALT_ROUNDS);

    const dataToInsert = {
        name: name,
        email,
        senha: hash
    };

    const handler = (err, result) => {
        if (!err) {
            res.json({
                success: true,
                message: 'Usuário registrado.',
                data: result
            });
        } else {
            res.json({
                success: false,
                message: 'Usuário não registrado.',
                error: err
            });
        }

    }
    db.register(dataToInsert, handler);

});


module.exports = router;