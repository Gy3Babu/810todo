var express = require('express'),
router = express.Router(),
logger = require('../../config/logger'),
mongoose = require ('mongoose'),
Todo = mongoose.model('todos');

module.exports = function (app, config) {
    app.use('/api', router);

    router.get('/todos/user/:userID', function (req, res, next){
        logger.log('Get all todos', 'verbose');
        
        var query = Todo.find({userID:req.params.userID})
        .sort(req.query.order)
        .exec()
        .then(result => {
          if(result && result.length) {
              res.status(200).json(result);
          } else {
              res.status(404).json({message: "No Todos"});
          }
        })
        .catch(err=> {
            return next(err);
        });
    });

    router.get('/todos/:todoID', function (req, res, next){
        logger.log('Get user' + req.params.todoID, 'verbose');

        Todo.findById(req.params.todoID)
        .then(Todo=> {
            if(Todo){
                res.status(200).json(Todo);
            } else {
                res.status(404).json({message: "No user found"});

            }
        })
        .catch(error => {
                return next(error);
        });
    });

    router.post('/todos', function(req, res, next){
        logger.log('Create a ToDo', 'verbose');

        var todo = new Todo(req.body);
        todo.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch( err => {
            return next(err); 
        });
    });

    router.put('/todos/:todoID', function (req, res, next){
        logger.log('Update Tdoo with id ToDo id'+ req.params.todoID, 'verbose')

        Todo.findOneAndUpdate({_id: req.params.todoID},
        req.body, {new:true, multi:false})
            .then(Todo => {
                res.status(200).json(Todo);
            })
            .catch(error => {
                return next(error);
            });
    });

    router.delete('/todos/:todoID', function (req, res, next){
        logger.log ('Delete ToDo with id ToDoid + req.params.todoID', 'verbose');

        Todo.remove({_id: req.params.todoID})
        .then(Todo => {
            res.status(200).json({mesg:"ToDo Deleted"});
        })
        .catch(error => {
            return next(error);
        });
    });

};





