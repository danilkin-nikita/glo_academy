'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

const loadingFromLocalStorage = function() {
  if (todoData === []) {
    return;
  } else {
    todoData = JSON.parse(localStorage.getItem('todoData'));
  }
}

const conversionJson = function() {      
  localStorage.setItem('todoData', JSON.stringify(todoData));
}

const render = function() {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function(item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
        '<div class="todo-buttons">' +
          '<button class="todo-remove"></button>' +
          '<button class="todo-complete"></button>' +
        '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoComplete = li.querySelector('.todo-complete');
    btnTodoComplete.addEventListener('click', function() {
      item.completed = !item.completed;
      conversionJson();
      render();
      
    });
    
    const btnTodoDelete = li.querySelector('.todo-remove');
    btnTodoDelete.addEventListener('click', function() {
      li.parentNode.removeChild(li);
      for(var i = todoData.length - 1; i >= 0; i--) {
        if(todoData[i] === item) {
         todoData.splice(i, 1);
        }
      }
      conversionJson();
      render();  
    });

  });
};

todoControl.addEventListener('submit', function(event){
  event.preventDefault();

  const newTodo = {
    value: headerInput.value,
    completed: false
  };
  if (headerInput.value === '') {
    return;
  } else {
    todoData.push(newTodo);
  }

  headerInput.value = '';

  conversionJson();
  render();
});

loadingFromLocalStorage();
render();