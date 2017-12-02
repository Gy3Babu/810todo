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
    this.message = this.user.firstName+"'s To Do List "
    this.title = "Ross Has Things ToDo!"
    this.editTodoForm = false;
    this.showCompleted = false;
    this.modalTitle = '';
    this.selected = [];
    this.priorities = ['Low', 'Medium', 'High', 'Critical'];
  }

  logout(){
    sessionStorage.removeItem('user');
    this.auth.logout();
  }

  selectAction(id,event){
    var index = this.selected.indexOf(id);
    if (index >= 0) {
      this.selected.splice(index,1);
    } else {
      this.selected.push(id);
    }

    $(event.target).toggleClass('active');
  }

  createTodo(){	
    this.todoObj = {
      todo: "",
      description: "",
      dateDue: new Date(),
      userID: this.user._id,
      priority: this.priorities[0]
    }
    this.modalTitle = 'New ToDo';
    $('#mainModal').modal();
  }


  showTodo(todo){
    this.todoObj = todo;
    $('#showModal').modal();
  }

  editTodo(todo){
    this.todoObj = todo;
    $('#mainModal').modal();
    this.modalTitle = 'Edit ToDo';
  }

  deleteTodo(){

    for(var i = 0, l = this.selected.length; i < l; i ++) {
      this.todos.deleteTodo(this.selected[i]);
    }
    this.selected = [];
  }

  completeTodo(todo){ 
    todo.completed = !todo.completed;
    this.todoObj = todo;
    this.saveTodo(false);
  }

  changeFiles(){
    this.filesToUpload = new Array(); 
    this.filesToUpload.push(this.files[0]);
  }
   removeFile(index){
    this.filesToUpload.splice(index,1);
  }


  async saveTodo(close){
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
      if (close) {
        $('#mainModal').modal('toggle');
      }
    }
  }

  async activate(){
    await  this.todos.getUserTodos(this.user._id);
  }
}