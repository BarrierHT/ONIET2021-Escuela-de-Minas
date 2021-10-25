const User = require('../models/user');
const bcrypt = require('bcryptjs');
const errorHandler = require('../util/errorHandler').errorHandler;
const Neighborhood = require('../models/Neighborhood');

exports.postLogIn = async (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (user) {
                bcrypt
                    .compare(password, user.password)
                    .then(async doMatch => {
                        if (!doMatch) {
                            const err = errorHandler('User-Not-Found', 422, {});
                            throw err;
                        } else {
                            const lastAccess = user.lastAccess;
                            req.session.user = user;
                            req.session.isLoggedIn = true;
                            req.session.save(async err => {
                                if (err) {
                                    const err = errorHandler(
                                        'error-session',
                                        400,
                                        {}
                                    );
                                    throw err;
                                } else {
                                    user = user.toObject();
                                    delete user.password;
                                    user.lastAccess = lastAccess;
                                    return res.status(200).json({ data: user });
                                }
                            });
                        }
                    })
                    .catch(err => next(err));
            } else {
                const err = errorHandler('User-Not-Found', 422, {});
                throw err;
            }
        })
        .catch(err => next(err));
};

exports.postLogOut = (req, res, next) => {
    if (req.session.user._id.toString() == req.user._id.toString()) {
        req.session.destroy(err => {
            console.log('err(session): ', err);
            res.json({ message: 'user-logged-out' });
        });
    }
};

exports.postGetUser = (req, res, next) => {
    if (!req.session.user)
        return res.status(200).json({ message: 'Not-Logged', data: null });
    User.findOne({ _id: req.session.user._id })
        .then(async user => {
            if (user) {
                user = user.toObject();
                delete user.password;
                res.status(200).json({
                    message: 'User succesfully logged',
                    data: user,
                });
            } else {
                const err = errorHandler('User-Not-Found', 422, {});
                throw err;
            }
        })
        .catch(err => next(err));
};

exports.getNeighborhood = async (req, res, next) => {
    //info barrio
    const { barrioId } = req.params;
    console.log(barrioId);

    let neighbourhood = req.neighbourhood.find(
        item => item.id_renabap == barrioId
    );

    if (!neighbourhood) {
        const err = errorHandler('id-not-valid', 422, {});
        return Promise.reject(err);
    } else {
        neighbourhood.paquetes = await Neighborhood.findOne({
            id_renabap: neighbourhood.id_renabap,
        }).then(result => {
            if (result) return result.paquetes;
            else return 0;
        });
        res.status(200).json({ data: neighbourhood });
    }
};

exports.filterNeighborhood = async (req, res, next) => {
    //filter neighborhood
    const { provincia, departamento, localidad } = req.query;
    const quantityPerPage = 50;
    const page = Number(req.query.page) || 0;

    req.neighbourhood = req.neighbourhood.filter(item => {
        if (provincia && item.cod_provincia !== provincia) return false;
        if (departamento && item.cod_depto !== departamento) return false;
        if (localidad && item.localidad !== localidad) return false;
        return true;
    });

    req.neighbourhood = req.neighbourhood.slice(
        page * quantityPerPage,
        page * quantityPerPage + quantityPerPage
    );

    for (item of req.neighbourhood) {
        const packages = await Neighborhood.findOne({
            id_renabap: item.id_renabap,
        }).then(result => {
            if (result) return result.paquetes;
            else return 0;
        });
        item.paquetes = packages;
    }

    res.status(200).json({ data: req.neighbourhood });
};

exports.updatePackage = (req, res, next) => {
    //update packages
    const { barrioId } = req.params;
    if (isNaN(barrioId)) {
        const err = errorHandler('id-not-valid', 422, {});
        throw err;
    }

    Neighborhood.findOne({ id_renabap: barrioId })
        .then(neighbourhood => {
            if (!neighbourhood) {
                const newRecord = new Neighborhood({
                    id_renabap: barrioId,
                    paquetes: 1,
                });
                return newRecord.save();
            } else {
                neighbourhood.paquetes++;
                return neighbourhood.save();
            }
        })
        .then(result => {
            if (result) res.status(200).json({ message: 'Package added' });
            else res.status(500).json({ message: 'Package not added' });
        })
        .catch(err => next(err));
};

exports.postStatistic = async (req, res, next) => {
    const { provincia, localidad } = req.body;

    let totalFamilies = 0,
        totalPackages = 0;

    for (const item of req.neighbourhood) {
        if (item.cod_provincia == provincia && localidad == item.localidad) {
            totalFamilies += item.cantidad_familias_estimado;
            // console.log(item.id_renabap);
            const packages = await Neighborhood.findOne({
                id_renabap: item.id_renabap,
            }).then(itemRecord => {
                if (itemRecord) return itemRecord.paquetes;
                else return 0;
            });
            totalPackages += packages;
        }
    }

    res.status(200).json({ totalFamilies, totalPackages });
};

exports.postListedNeighborhood = async (req, res, next) => {
    const { nBarrios } = req.body;

    const result = await Neighborhood.find().then(
        neighbourhood => neighbourhood
    );
    const resultFiltered = [];

    for (const item of req.neighbourhood) {
        const packages = result.find(
            resultItem => resultItem.id_renabap == item.id_renabap
        ).paquetes;
        const proportion = item.cantidad_familias_estimado / packages;
        resultFiltered.push({ proportion, barrioId: id_renabap, packages });
    }
    resultFiltered
        .sort((a, b) => a.proportion - b.proportion)
        .splice(0, nBarrios);
    resultFiltered.slice(0, Math.floor(Math.random() * nBarrios));

    req.neighbourhood.forEach(item => {
        const packages = resultFiltered.find(
            itemResult => itemResult.barrioId == item.id_renabap
        ).packages;
        item.paquetes = packages;
    });

    req.neighbourhood.filter(
        item => item.id_renabap == resultFiltered.barrioId
    );

    res.status(200).json({ data: req.neighbourhood });
};
