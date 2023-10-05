const form = document.querySelector('form'),
     input = form.querySelector('.form-control'),
        ul = document.querySelector('.list-group');

let tasks = [];


const renderList = (taskText, taskId) => {
    
    ul.innerHTML += `
        <li class="list-group-item" data-task-id="${taskId}">
            <label class="form-check-label">
                <input class="form-check-input me-3" type="checkbox">${taskText}
            </label> 
            <button class="btn btn-outline-danger delete">Удалить</button>
        </li>
        `;
  }


const markChecked = (taskElements) => {
    taskElements.forEach((li, i) => {
        const checkbox = li.querySelector('.form-check-input');
        checkbox.checked = tasks[i].status;
        li.classList.toggle('list-group-item-success', tasks[i].status);

    checkbox.addEventListener('change', () => {
        tasks[i].status = checkbox.checked;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        li.classList.toggle('list-group-item-success', checkbox.checked);

        }); 
    });
}

const deleteTask = (closeBtns) => {
    closeBtns.forEach((btn) => {
       btn.addEventListener('click', () => {
            const taskElement = btn.closest('li');
            const taskId = taskElement.dataset.taskId;
            taskElement.remove();
            tasks = tasks.filter((task) => task.id !== taskId);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            });
    });
};

if(localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(task => {
        renderList(task.text, task.id);
    });
    markChecked(ul.querySelectorAll('.list-group-item'));
    deleteTask(ul.querySelectorAll('.delete'));

}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskId = Date.now().toString();
    tasks.push({ id: taskId, text: input.value, status: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
     renderList(input.value, taskId);
    input.value = '';
    markChecked(ul.querySelectorAll('.list-group-item'));
    deleteTask(ul.querySelectorAll('.delete'));
})
       