import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {ToDos} from '../resources/data/todos';
import {AuthService} from 'aurelia-auth';

@inject(ToDos, AuthService, Router)
export class Wall {
  constructor(todos, auth,router) {
    this.todos = todos;
  	this.router = router;
    this.auth = auth;
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.message = "List"
    this.title = "Ross Has Things ToDo!"
    this.editTodoForm = false;
    this.showCompleted = false;
    this.priorities = ['Low', 'Medium', 'High', 'Critical'];
    this.showList = true;
  }

  back(){
   this.showList = true; 
  }

  logout(){
    sessionStorage.removeItem('user');
    this.auth.logout();
  }

  createTodo(){	
    this.todoObj = {
      todo: "",
      description: "",
      dateDue: new Date(),
      userID: this.user._id,
      priority: this.priorities[0]
    }
  	this.showList = false;		
  }

  toggleShowCompleted(){
    this.showCompleted = !this.showCompleted;
  }

  editTodo(todo){
    this.todoObj = todo;
    console.log(todo);
    this.showList = false;
  }

  deleteTodo(todo){
    this.todos.deleteTodo(todo._id);
  }

  completeTodo(todo){ 
    todo.completed = !todo.completed;
    this.todoObj = todo;
    this.saveTodo();
  }

  changeFiles(){
    this.filesToUpload = new Array(); 
    this.filesToUpload.push(this.files[0]);
  }
   removeFile(index){
    this.filesToUpload.splice(index,1);
  }


  async saveTodo(){
    if(this.todoObj){   
      let response = await this.todos.save(this.todoObj);
      if(response.error){
        alert("There was an error creating the ToDo");
      } else {
        var todoId = response._id;
        if(this.filesToUpload && this.filesToUpload.length){
          await this.todos.uploadFile(this.filesToUpload, this.user._id, todoId);
          this.filesToUpload = [];
        }
      }
      this.showList = true;
    }
  }

  async activate(){
    await  this.todos.getUserTodos(this.user._id);
  }
}