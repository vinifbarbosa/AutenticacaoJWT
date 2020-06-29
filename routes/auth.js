var express = require('express');
var router = express.Router();

const config = require('../config');

var jwt = require('jsonwebtoken');

var bcryptjs = require('bcryptjs');

var db = require('../db');

router.post('/login', (req, res, next) => {
    console.log(req.body)
    const { email, senha } = req.body.userData;

    if (email === undefined || senha === undefined) {
        res.status(401).json({
            success: false,
            code: 'DD101_API_ERROR_01',
            message: "E-mail ou senha invalido."
        });
    } else {
        const handler = (err, result) => {
            if (!err && result !== null && bcryptjs.compareSync(senha, result.senha)) {
                let tokenData = {
                    name: result.name,
                    email: result.email
                }
                let generatedToken = jwt.sign(tokenData, config.JWT_KEY, { expiresIn: '5m' });
                res.json({
                    success: true,
                    token: generatedToken
                });
            } else {
                res.status(401).json({
                    success: false,
                    code: 'DD101_API_ERROR_02',
                    message: err || 'Usuário não existe.'
                });
            }
        }

        db.findUser({ email }, handler);


    }
});

router.get('/verificar', (req, res, next) => {

    let token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, config.JWT_KEY, (err, decode) => {
        if (!err) {
            res.json({
                success: true,
                message: 'Token is valid.'
            });
        } else {
            res.status(401).json({
                success: false,
                error: err
            });
        }
    })
})


module.exports = router;