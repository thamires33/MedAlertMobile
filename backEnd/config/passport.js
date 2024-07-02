const { Strategy, ExtractJwt } = require('passport-jwt');
const Login = require('../models/Login');
const secretOrKey = 'abc'; // Use um segredo forte e seguro

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey
};

module.exports = passport => {
    passport.use(
        new Strategy(opts, async (jwt_payload, done) => {
            try {
                const Login = await Login.findByPk(jwt_payload.id);
                if (Login) {
                    return done(null, Login);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                return done(err, false);
            }
        })
    );
};
