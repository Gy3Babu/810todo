import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {ToDos} from '../resources/data/todos';
import {AuthService} from 'aurelia-auth';

@inject(AuthService, Router)
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

  logout(){
  	this.router.navigate('home');
  }

  createTodo(){	
    this.todoObj = {
      todo: "",
      description: "",
      dateDue: new Date(),
      userId: 0,//this.user._id,
      priority: this.priorities[0]
    }
  	this.showList = false;		
  }

  async saveTodo(){
    if(this.todoObj){   
      let response = await this.todos.save(this.todoObj);
      if(response.error){
        alert("There was an error creating the ToDo");
      } else {
        //Could provide feeback                 
      }
      this.showList = true;
    }
  }

  async activate(){
    await  true //this.todos.getUserTodos(this.user._id);
  }



}