let toDoInput;
let errorInfo;
let addBtn;
let ulList;
let newTodo;
let popup;
let popupInfo;
let toDoToEdit;
let popupInput;
let popupAddBtn;
let popupCloseBtn;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	toDoInput = document.querySelector('.todo-input');
	errorInfo = document.querySelector('.error-info');
	addBtn = document.querySelector('.btn-add');
	ulList = document.querySelector('.todolist ul');
	popup = document.querySelector('.popup');
	popupInfo = document.querySelector('.popup-info');
	popupInput = document.querySelector('.popup-input');
	popupAddBtn = document.querySelector('.accept');
	popupCloseBtn = document.querySelector('.cancel');
};

const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewToDo);
	ulList.addEventListener('click', checkClick);
	popupCloseBtn.addEventListener('click', closePopup);
	popupAddBtn.addEventListener('click', changeTodoText);
	toDoInput.addEventListener('keyup', enterKeycheck)
};

const addNewToDo = () => {
	if (toDoInput.value !== '') {
		newTodo = document.createElement('li');
		newTodo.textContent = toDoInput.value;
		createToolsArea();
		ulList.append(newTodo);

		toDoInput.value = '';
		errorInfo.textContent = '';
	} else {
		errorInfo.textContent = 'Type item name!';
	}
};
const createToolsArea = () => {
	const toolsPanel = document.createElement('div');
	toolsPanel.classList.add('tools');
	newTodo.append(toolsPanel);
	const completeBtn = document.createElement('button');
	completeBtn.classList.add('complete');
	completeBtn.innerHTML = '<i class="fas fa-check"></i>';
	const editBtn = document.createElement('button');
	editBtn.classList.add('edit');
	editBtn.textContent = 'EDIT';
	const deleteBtn = document.createElement('button');
	deleteBtn.classList.add('delete');
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
	toolsPanel.append(completeBtn, editBtn, deleteBtn);
};

const checkClick = (e) => {
	if (e.target.matches('.complete')) {
		e.target.classList.toggle('completed');
		e.target.closest('li').classList.toggle('completed');
	} else if (e.target.matches('.edit')) {
		editTodo(e);
	} else if (e.target.matches('.delete')) {
		console.log('delete');
		deleteTodo(e)
	}
};

const editTodo = (e) => {
	toDoToEdit = e.target.closest('li');

	popupInput.value = toDoToEdit.firstChild.textContent;
	console.log(toDoToEdit.firstChild);
	popup.style.display = 'flex';
};

const closePopup = () => {
	popup.style.display = 'none';
};

const changeTodoText = () => {
	if (popupInput.value !== '') {
		toDoToEdit.firstChild.textContent = popupInput.value;
		popup.style.display = 'none';
		popupInfo.textContent = '';
	} else {
		popupInfo.textContent = 'Must enter a product!';
	}
};

const deleteTodo = (e) => {
	e.target.closest('li').remove()
	const allTodos = document.querySelectorAll('li')
	
	if(allTodos.length === 0) {
		errorInfo.textContent = 'No items in list'
	}
}

const enterKeycheck = (e) => {
	if(e.key==='Enter') {
		addNewToDo()
	}
}




document.addEventListener('DOMContentLoaded', main);
