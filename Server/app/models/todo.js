var Mongoose = require('mongoose');
var Schema = Mongoose.Schema; 

var myTodoSchema = new Schema({
    userID:{type: Schema.Types.ObjectId, required:true },
    todo:{type: String, required:true, unique:true },
    description:{type: String, required:true },
    priority:{type: String, required:true },
    datedCreated: {type: Date, default: Date.now },
    dateDue: {type: Date, default: Date.now},
    completed: {type:Boolean, default: false},
    file:{filename: String, originalName: String, dateUploaded: Date}
});

module.exports = Mongoose.model('todos', myTodoSchema);