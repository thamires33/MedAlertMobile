const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { Clerk } = require('@clerk/clerk-sdk-node');
const keys = require('./keys'); // Atualize conforme necessário

const clerk = new Clerk({ apiKey: process.env.CLERK_API_KEY });

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey; // Se necessário

// Estratégia com Clerk
passport.use('clerk', new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        // Verifique o usuário com Clerk
        const user = await clerk.users.getUser(jwt_payload.sub);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        console.error('Erro na autenticação com Clerk:', error);
        return done(error, false);
    }
}));

// Estratégia com JWT tradicional
passport.use('jwt', new JwtStrategy(opts, (jwt_payload, done) => {
    console.log('funioona?', jwt_payload);
    Usuario.findByPk(jwt_payload.id)
        .then(usuario => {
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
