const express = require('express');
const Router = express.Router();

const authController = require('../controllers/auth');
const isAuth = require('../middlewares/isAuth').isAuth;
const isNotAuth = require('../middlewares/isAuth').isNotAuth;

Router.post('/getUser', authController.postGetUser);
Router.post('/logIn', isNotAuth, authController.postLogIn);
Router.post('/logOut', isAuth, authController.postLogOut);

Router.get('/barrio/barrios', isAuth, authController.filterNeighborhood);
Router.get('/barrio/:barrioId', isAuth, authController.getNeighborhood);
Router.post('/paquetes/:barrioId', isAuth, authController.updatePackage);
Router.post('/generarEstadistica', isAuth, authController.postStatistic);
Router.post('/nBarrios', isAuth, authController.postListedNeighborhood);

module.exports = Router;
