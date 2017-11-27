import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';

 @inject(DataServices)
export class ToDos {
  constructor(data) {
    this.data = data;
    this.TODOS_SERVICE = 'todos';
    this.todosArray = [];
  }


  updateArray(todo){
    for(var i = 0, l = this.todosArray.length; i < l; i++ ){
      if (this.todosArray[i]._id == todo._id){
        this.todosArray[i] = todo;
        break;
      }
    }
  }

  async save(todo){
    if(!todo._id){
      let response = await this.data.post(todo, this.TODOS_SERVICE);

      if(!response.error){
        this.todosArray.push(response);
      }
      return response;
    } else {
      let response = await this.data.put(todo, this.TODOS_SERVICE + "/" + todo._id);

      if(!response.error){
        this.updateArray(response);
      }
      return response;      
    }
  }

  async uploadFile(files, userId, todoId){
    let formData = new FormData();
     files.forEach((item, index) => {
      formData.append("file" + index, item);
    });
    let response = await this.data.uploadFiles(formData, this.TODOS_SERVICE +   "/upload/" + userId + "/" + todoId);
    return response;
  }

  async deleteTodo(id){
    let response = await this.data.delete(this.TODOS_SERVICE + "/" + id);
      if(!response.error){
        for(let i = 0; i < this.todosArray.length; i++){
        if(this.todosArray[i]._id === id){
          this.todosArray.splice(i,1);
        }
      }
    }
  }
        
  async getUserTodos(id){
    let response = await this.data.get(this.TODOS_SERVICE + "/user/" + id);
    if(!response.error && !response.message){
      this.todosArray = response;
    }
  }
}
