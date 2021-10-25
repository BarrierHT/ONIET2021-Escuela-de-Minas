exports.isAuth = (req,res,next) =>{
    if(req.session.isLoggedIn) next();
    else res.status(401).json({error:'Unauthorized'});
}

exports.isNotAuth = (req,res,next) =>{
    if(!req.session.isLoggedIn) next();
    else res.status(401).json({error:'Unauthorized'});
}
