const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Usuario = require('../models/Login'); // Certifique-se de que o caminho e o modelo estão corretos
const keys = require('./keys'); // Certifique-se de que o arquivo keys.js está configurado corretamente

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log('jwt_payload', jwt_payload); // Para depuração
        Usuario.findByPk(jwt_payload.id)
            .then(usuario => {
                console.log('Usuario encontrado:', usuario); // Para depuração
                if (usuario) {
                    return done(null, usuario);
                }
                return done(null, false);
            })
            .catch(err => {
                console.error(err);
                return done(err, false);
            });
    }));
};
