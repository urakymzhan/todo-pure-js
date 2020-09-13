const ifEmpty = document.querySelector('.if-empty');
const todos = document.querySelector('.todos');
const todosList = document.querySelector('.todosList');
const input = document.querySelector('input');
const body = document.querySelector('body');
const doneCounter = document.getElementById('done');
const notDoneCounter = document.getElementById('not-done');
const allCounter = document.getElementById('all');
const lastTask = document.getElementById('last-task');

class Todo {
  constructor(text, completed) {
    this.text = text;
    this.completed = completed;
  }
}
const iconSource = 'https://rb.gy/brfgz1';

let singleTodo;
let inputText = '';
let lastTodo;
const allTodosList = [];
const error = document.createElement('p');

const checkIfEmpty = () => {
  if (todosList.children.length === 0) {
    ifEmpty.style.display = 'block';
  }
};
checkIfEmpty();

input.addEventListener('input', getInputData);

function getInputData(event) {
  inputText = event.target.value;
  singleTodo = new Todo(inputText, false);
}

body.addEventListener('keypress', function (e) {
  if (e.keyCode === 13 && inputText.length === 0) {
    error.textContent = 'Write Some Todo!';
    todos.appendChild(error);
    input.value = '';
    return;
  }
  const isExists = allTodosList.some((t) => t.text === inputText);
  if (e.keyCode === 13 && isExists) {
    error.textContent = 'Already Exists!';
    todos.appendChild(error);
    input.value = '';
    return;
  }

  if (e.keyCode === 13) {
    if (error.parentNode == todos) {
      todos.removeChild(error);
    }

    allTodosList.push(singleTodo);

    getCounter();
    createTodo(singleTodo);

    ifEmpty.style.display = 'none';
    input.value = '';
  }
});

lastTask.addEventListener('click', function () {
  if (lastTodo) {
    allTodosList.push(lastTodo);
    createTodo(lastTodo);
    lastTodo = undefined;
    ifEmpty.style.display = 'none';
  } else {
    return;
  }
});

const createTodo = (whichTodo) => {
  let todo = document.createElement('li');
  todo.classList.add('todo');
  todo.textContent = whichTodo.text;

  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('click', (e) => onCheckClick(e, todo));

  let deleteIcon = document.createElement('img');
  deleteIcon.src = iconSource;
  deleteIcon.classList.add('deleteIcon');
  deleteIcon.addEventListener('click', deleteTodo);

  let rightBlock = document.createElement('div');
  rightBlock.appendChild(checkbox);
  rightBlock.appendChild(deleteIcon);

  todo.appendChild(rightBlock);
  todosList.appendChild(todo);
};

const deleteTodo = (e) => {
  let parentDiv = e.target.parentNode.parentNode;
  todosList.removeChild(parentDiv);
  console.log(parentDiv.textContent);
  lastTodo = allTodosList.filter((t) => t.text === parentDiv.textContent);
  lastTodo = lastTodo[0];
  lastIndex = allTodosList.indexOf(lastTodo);
  allTodosList.splice(lastIndex, 1);
  // lastTodo = allTodosList.pop();
  console.log('lastTodo', lastTodo);
  console.log(allTodosList);
  getCounter();
  checkIfEmpty();
};

const onCheckClick = (e, todo) => {
  if (e.target.checked) {
    allTodosList.forEach((t) => {
      if (t.text === todo.textContent) {
        todo.style.textDecoration = 'line-through';
        t.completed = true;
      }
    });
  }
  if (e.target.checked === false) {
    allTodosList.forEach((t) => {
      if (t.text === todo.textContent) {
        todo.style.textDecoration = 'none';
        t.completed = false;
      }
    });
  }
  getCounter();
};

const getCounter = () => {
  allCounter.textContent = allTodosList.length;
  doneCounter.textContent = allTodosList.filter((t) => t.completed).length;
  notDoneCounter.textContent = allTodosList.filter((t) => !t.completed).length;
};
