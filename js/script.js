'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.input.value = '';
        this.todoData.forEach(this.createElem, this);
        this.addToStorage();
    }

    createElem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
            	<span class="text-todo">${todo.value}</span>
                      <div class="todo-buttons">
                          <button class="todo-edit"></button>
				    	  <button class="todo-remove"></button>
				    	  <button class="todo-complete"></button>
              </div>
    `);
        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(event) {
        event.preventDefault();

        if (this.input.value.trim()) {
            const NewTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(NewTodo.key, NewTodo);
            this.render();
        } else {
            alert('Введите текст!');
        }

    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    
    deleteElem(elem) {

        this.todoData.forEach((item, i) => {

            if (item.key === elem.key) {

                    this.todoData.delete(i);
            }
        });

        this.render();
    }

    completedElem(elem) {

        this.todoData.forEach(item => {

            if (item.key === elem.key) {

                item.completed = !item.completed;
            }
        });

        this.render();

    }

    editElem(elem) {
        if (!elem.hasAttribute('contenteditable')) {
            elem.setAttribute('contenteditable', true);
            elem.focus();
        } else {
            elem.removeAttribute('contenteditable');

            this.todoData.forEach(item => {

                if (item.key === elem.closest('.todo-item').key) {
                   
                   item.value = elem.textContent;
                   this.addToStorage();
                }
            });
        }
    }

    animateElem(elem) {
        const animate = () => {
            requestAnimationFrame(animate);
            elem.style.transition = '1s all';
            elem.style.transform = 'translateX(110%)';
        };
        animate();
    }

    handler() {
        document.addEventListener('click', event => {
            const target = event.target;

            if (target.matches('.todo-complete')) {
                this.animateElem(target.closest('.todo-item'));
                setTimeout(() => {
                 this.completedElem(target.closest('.todo-item')); 
               }, 1000);
            }
            if (target.matches('.todo-remove')) {
                this.animateElem(target.closest('.todo-item'));
               setTimeout(() => {
                 this.deleteElem(target.closest('.todo-item')); 
               }, 1000); 
            }
            if (target.matches('.todo-edit')) {
                this.editElem(target.closest('.todo-item').querySelector('.text-todo'));
            }
        });
    }

    init() {

        this.form.addEventListener('submit', this.addTodo.bind(this)); 
        this.handler();
        this.render();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();
