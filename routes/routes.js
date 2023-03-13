
const express = require('express');
const passport = require('passport');
// const jwt = require('jwt');
const router = express.Router();




// router.post(
//     '/signup',
//     passport.authenticate('signup', { session: false }),
//     async (req, res, next) => {
//         res.json({
//             message: 'Signup successful',
//             user: req.user
//         });
//     }
// );

// router.post(
//     '/login',
//     async (req, res, next) => {
//         passport.authenticate(
//             'login',
//             async (err, user, info) => {
//                 try {
//                     if (err || !user) {
//                         const error = new Error('An error occurred.');

//                         return next(error);
//                     }

//                     req.login(
//                         user,
//                         //Cuando no se quiere alamacenar los detalles del usuario en una sesión
                        
//                         { session: false },
//                         async (error) => {
//                             if (error) return next(error);

//                             const body = { _id: user._id, email: user.email };
//                             const token = jwt.sign({ user: body }, 'TOP_SECRET');

//                             return res.json({ token });
//                         }
//                     );
//                 } catch (error) {
//                     return next(error);
//                 }
//             }
//         )(req, res, next);
//     }
// );


module.exports = router;

