'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));


    }

    addToStorage(){
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
        
    }

    todoStatus(todoData, event) {
        const target = event.target.closest('.todo-item');
        todoData.forEach((item, index) => {
            if (item.key === target.key) {
                item.completed = !item.completed;
            }
        });
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }
    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
			<div class="todo-buttons">
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
			</div>
        `);

        if(todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(e) {
        e.preventDefault();
        
        if(this.input.value.trim()){
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            this.input.value = '';
            this.render();
        } else {
            alert('пустое дело добавить нельзя!');
        }
        
    }
    generateKey() {
        return Math.random().toString(32).substring(2, 9) + (+new Date()).toString(32);
    }

    deleteItem(todoData, event) {
        const target = event.target.closest('.todo-item');
        todoData.forEach((item, index) => {
            if (item.key === target.key) {
                todoData.delete(item.key);
            }
        });

    }

    completedItem(todoData, event) {
        const target = event.target.closest('.todo-item');
        todoData.forEach((item, index) => {
            if (item.key === target.key) {
                item.completed = !item.completed;
            }
        });
    }


    

    handler() {
        document.querySelector('.todo-container').addEventListener('click', event => {
                const target = event.target;
                if (target.matches('.todo-complete')) {
                    this.completedItem(this.todoData, event);
                    this.render();
                } else if (target.matches('.todo-remove')) {
                    this.deleteItem(this.todoData, event);
                    this.render();
                } else {
                    return;
                }
            });
    }


    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
        this.handler();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');
todo.init();
