var Mongoose = require('mongoose');
var Schema = Mongoose.Schema; 

var myTodoSchema = new Schema({
    userID:{type: Schema.Types.ObjectId, required:true },
    todo:{type: String, required:true },
    description:{type: String, required:true, unique:true },
    datedCreated: {type: Date, default: Date.now },
    datadue: {type: Date, default: Date.now},
    completed: {type:Boolean, default: false},
    file:{fileName: String, originalName: String}
});

module.exports = Mongoose.model('todos', myTodoSchema);