const passport = require('passport');
const local = require('passport-local');
const UserDAO = require('../dao/class/dao.users');
const BusinessDAO = require('../dao/class/dao.company');
const { createHash,isValidPassword } = require('../utils/utils');

const User = new UserDAO();
const Business = new BusinessDAO();



// Configurar la estrategia de autenticación
const LocalStrategy = local.Strategy;
const initializePassport = () => {

    passport.use('register', new LocalStrategy({
        usernameField: 'user_username',
        passwordField: 'user_password',
        passReqToCallback: true
    }, async (req, username, password, done) => {
        const { user_name, user_email, user_age, user_phoneNumber, business_id } = req.body;

        try {
            // Verificar si el usuario ya existe por username
            const existingUser = await User.getUserByUsername(username);
            if (existingUser) {
                return done(null, false, { message: 'El nombre de usuario ya está en uso.' });
            }


            // Crear un nuevo usuario y asignarle el negocio
            const newUser = {
                name: user_name,
                email: user_email,
                username: username,
                password: createHash(password),
                age: user_age,
                phoneNumber: user_phoneNumber,
                businessId: business_id, // Asignar el ID del nuevo negocio al usuario
            };

            const createdUser = await User.create(newUser);

            //obtener el negocio
            const newBusiness = await Business.getCompanyByTelegramID(business_id);

            //agregar el usuario al negocio
            newBusiness.users.push(createdUser._id);

            //actualizar el negocio
            await Business.update(business_id, newBusiness);

            return done(null, createdUser);

        } catch (error) {
            return done(error);
        }
    }));

    passport.use('login', new LocalStrategy({
        usernameField: 'user_username',
        passwordField: 'user_password',
        passReqToCallback: true
    }, async (req,username, password, done) => {
        try {
            // Verificar si el usuario existe por username
            const user = await User.getUserByUsername(username);
            if (!user) {
                return done(null, false, { message: 'El usuario no existe.' });
            }
            console.log(user);
            console.log(user.password);


            // Verificar si la contraseña es correcta
            const isValid = isValidPassword(password, user);
            if (!isValid) {
                return done(null, false, { message: 'Contraseña incorrecta.' });
            }

            console.log(isValid);

            // Verificar si el usuario tiene un negocio
            const business = await Business.getCompanyByUserId(user._id);
            if (!business) {
                return done(null, false, { message: 'El usuario no tiene un negocio asignado.' });
            }

            console.log(business);

            req.business = business;

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
      });
      
    passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.getUserById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
    });
}

module.exports = initializePassport;
