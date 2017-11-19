var express = require('express'),
router = express.Router(),
logger = require('../../config/logger'),
mongoose = require ('mongoose'),
User = mongoose.model ('Users'); 


module.exports = function (app, config) {
    app.use('/api', router);

    router.get('/users', function (req, res, next){
        logger.log('Get all users', 'verbose');

        var query = User.find()
        .sort(req.query.order)
        .exec()
        .then(result => {
            if(result && result.length) {
                res.status(200).json(result);
            }else{
                res.status(404).json({message: "No Users"});
            }
        })
        .catch(err => {
            return net(err); 
        });
    }); 

    router.get('/users/:userID', function (req, res, next){
        logger.log('Get user'+ req.params.userID, 'verbose');

        User.findById(req, params, userId)
        .then(user => {
            if(user){
                res.status(200).json(user);
            } else {
                res.status(404).json({message: "No user found"});
            }
            
        })
        .catch(error => {
            return next(error); 
        });

    });


    router.post('/users', function(req, res, next){
        logger.log('Create user', 'verbose');

        var user = new User(req.body);
        user.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            return next (err);
        });
    });

    router.put('/users/:userId', function (req, res, next){
        logger.log('Update user'+ req.params.userId, 'verbose');

        user.findOneAndUpdate({_id: req, params, userId},
        req.body, {new:true, multi:false})
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => {
            return next(error);
        });
    });

    router.put('/user/password/:userId', function(req, res, next) {
        logger.log('Update user' +req.params.userId, 'verbose');

        User.findById(req,params,userId)
        .exec()
        .then(function(user){
            if (req,body,password !==undefined) {
                user.password = req, body, password;
            }

            user.save()
            .then(function(user){
                res.status(200).json(user);
            })
            .catch(function(err) {
                return next(err); 
            });

        });
    });
    router.delete('/users/:userId', function(req, res, next){
        logger.log('Delete user'+ req,params,userId, 'verbose')

        User.remove ({_id: req.params.userId})
        .then(user => {
            res.status(200).json({msg: "User Deleted"});
        })
        .catch(error => {
            return next(error);
        });
    });
};