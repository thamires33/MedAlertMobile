const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Usuario = require('../models/Login'); 
const keys = require('./keys'); 

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log('funioona?',jwt_payload);
        Usuario.findByPk(jwt_payload.id)
            .then(usuario => {
                console.log('msg2',usuario);
                if (usuario) {
                    return done(null, usuario);
                }
                return done(null, false);
            })
            .catch(err => console.error(err));
    }));
};