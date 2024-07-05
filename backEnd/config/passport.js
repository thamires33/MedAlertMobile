const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Usuario = require('../models/Login'); // Ajuste o caminho conforme necessário
const keys = require('./keys'); // Arquivo onde você guarda suas chaves secretas

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        Usuario.findByPk(jwt_payload.id)
            .then(usuario => {
                if (usuario) {
                    return done(null, usuario);
                }
                return done(null, false);
            })
            .catch(err => console.error(err));
    }));
};