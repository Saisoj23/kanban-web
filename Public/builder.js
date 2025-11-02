import { Mocks } from './mocks.js';
import { COLORS } from './constants.js';

const mainBoard = document.getElementById('main-board');
const addTaskForm = document.getElementById('add-task-form');
const addColumnButton = document.getElementById('add-column-button');
const addColumnButtonContainer = document.getElementById('add-column-button-container');

let colTaskGroups = [];

addColumnButton.addEventListener('click', () => {
    const newCol = colTaskGroups.length;

    let colName = `Column ${newCol + 1}`;
    if (Object.values(Mocks.cols).includes(colName)) {
        let index = 1;
        while (Object.values(Mocks.cols).includes(`Column ${index}`)) {
            index++;
        }
        colName = `Column ${index}`;
    }

    colTaskGroups[newCol] = BuildColumn(colName, newCol);

    Mocks.cols[newCol] = colName;

    mainBoard.appendChild(addColumnButtonContainer);

    if (colTaskGroups.length >= Object.keys(COLORS).length && !addColumnButtonContainer.classList.contains('hidden')) {
        addColumnButtonContainer.classList.add('hidden');
    }
    else if (colTaskGroups.length < Object.keys(COLORS).length && addColumnButtonContainer.classList.contains('hidden')) {
        addColumnButtonContainer.classList.remove('hidden');
    }
});

addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let taskName = e.target['add-task-input'].value;

    if (Object.keys(Mocks.tasks).includes(taskName))
    {
        let index = 1
        while (Object.keys(Mocks.tasks).includes(taskName + `${index}`)) {
            index++
            console.log(taskName + `${index}`)
        }
        taskName = taskName + `${index}`
    }

    BuildTask(0, taskName);

    Mocks.tasks[taskName] = 0;

    e.target.reset();
});

function MoveTaskLeft (e) {
    const task = e.target.closest('.task');
    let targetCol = parseInt(task.dataset.col) - 1;
    if (targetCol < 0) targetCol = colTaskGroups.length - 1;
    task.classList.replace(`bg-${COLORS[task.dataset.col]}-400`, `bg-${COLORS[targetCol]}-400`);
    task.dataset.col = targetCol;

    const taskName = task.querySelector('.task-text').innerText;
    delete Mocks.tasks[taskName];
    Mocks.tasks[taskName] = targetCol;

    colTaskGroups[targetCol].appendChild(task);
}

function MoveTaskRight (e) {
    const task = e.target.closest('.task');
    let targetCol = parseInt(task.dataset.col) + 1;
    if (targetCol >= colTaskGroups.length) targetCol = 0;
    task.classList.replace(`bg-${COLORS[task.dataset.col]}-400`, `bg-${COLORS[targetCol]}-400`);
    task.dataset.col = targetCol;

    const taskName = task.querySelector('.task-text').innerText;
    delete Mocks.tasks[taskName];
    Mocks.tasks[taskName] = targetCol;

    colTaskGroups[targetCol].appendChild(task);
}

function RemoveTask (e) {
    const task = e.target.closest('.task');
    delete Mocks.tasks[task.querySelector('.task-text').innerText];
    task.remove();
}

function MoveColumnLeft (e) {
    const column = e.target.closest('.column');
    let targetCol = parseInt(column.dataset.col) - 1;
    if (targetCol < 0) targetCol = colTaskGroups.length - 1;

    for (const key in Mocks.tasks) {
        if (Mocks.tasks[key] == column.dataset.col) {
            Mocks.tasks[key] = targetCol;
        }
        else if (Mocks.tasks[key] == targetCol) {
            Mocks.tasks[key] = column.dataset.col;
        }
    }

    [Mocks.cols[column.dataset.col], Mocks.cols[targetCol]] = [Mocks.cols[targetCol], Mocks.cols[column.dataset.col]];

    mainBoard.innerHTML = '';
    colTaskGroups = [];
    BuildBoard();
}

function MoveColumnRight (e) {
    const column = e.target.closest('.column');
    let targetCol = parseInt(column.dataset.col) + 1;
    if (targetCol >= colTaskGroups.length) targetCol = 0;   

    for (const key in Mocks.tasks) {
        if (Mocks.tasks[key] == column.dataset.col) {
            Mocks.tasks[key] = targetCol;
        }
        else if (Mocks.tasks[key] == targetCol) {
            Mocks.tasks[key] = column.dataset.col;
        }   
    }

    [Mocks.cols[column.dataset.col], Mocks.cols[targetCol]] = [Mocks.cols[targetCol], Mocks.cols[column.dataset.col]];

    mainBoard.innerHTML = '';
    colTaskGroups = [];
    BuildBoard();
}

function RemoveColumn (e) {
    const column = e.target.closest('.column');

    for (const key in Mocks.tasks) {
        if (Mocks.tasks[key] == column.dataset.col) {
            delete Mocks.tasks[key];
        }
        else if (Mocks.tasks[key] > column.dataset.col) {
            Mocks.tasks[key] -= 1;
        }
    }

    for (let i = parseInt(column.dataset.col); i < Object.keys(Mocks.cols).length - 1; i++) {
        Mocks.cols[i] = Mocks.cols[i + 1];
    }
    delete Mocks.cols[Object.keys(Mocks.cols).length - 1];

    mainBoard.innerHTML = '';
    colTaskGroups = [];
    BuildBoard();
}

function BuildBoard () {
    if (Mocks.cols[0] == null) { Mocks.cols[0] = 'Column 1'; }
    for (const key in Mocks.cols) {
        colTaskGroups[key] = BuildColumn(Mocks.cols[key], key);
    }

    mainBoard.appendChild(addColumnButtonContainer);

    if (colTaskGroups.length >= Object.keys(COLORS).length && !addColumnButtonContainer.classList.contains('hidden')) {
        addColumnButtonContainer.classList.add('hidden');
    }
    else if (colTaskGroups.length < Object.keys(COLORS).length && addColumnButtonContainer.classList.contains('hidden')) {
        addColumnButtonContainer.classList.remove('hidden');
    }

    for (const key in Mocks.tasks) {
        BuildTask(Mocks.tasks[key], key);
    }
}

function BuildColumn (col, key = 0) {
    let mainDiv = document.createElement('div');
    let headerDiv = document.createElement('div');
    let titleH2 = document.createElement('h2');
    let tasksDiv = document.createElement('div');

    mainDiv.className = `column flex flex-col text-slate-900 bg-${COLORS[key]}-300 w-3/10 min-w-80 min-h-40 rounded-lg`;
    headerDiv.className = `column-header relative bg-${COLORS[key]}-400 w-full rounded-lg`;
    titleH2.className = 'column-title text-center font-bold text-xl p-2';
    titleH2.innerText = col;
    tasksDiv.className = 'tasks-group flex items-start gap-3 w-full flex-wrap justify-around h-full p-2';

    mainDiv.dataset.col = key;

    headerDiv.appendChild(titleH2);
    mainDiv.appendChild(headerDiv);
    mainDiv.appendChild(tasksDiv);
    mainBoard.appendChild(mainDiv);

    headerDiv.appendChild(BuildButtons(true));

    return tasksDiv;
}

function BuildTask (task = 0, key) {
    let mainDiv = document.createElement('div');
    let taskP = document.createElement('p');

    mainDiv.className = `task relative bg-${COLORS[task]}-400 rounded-sm min-h-25 w-9/20 z-11 hover:z-19 text-center content-center p-1`;
    taskP.className = 'task-text text-ellipsis break-words overflow-hidden';

    mainDiv.dataset.col = task;

    if (key.length < 15) {
        mainDiv.className += ' text-4xl font-semibold';
    }
    else if (key.length < 25) {
        mainDiv.className += ' text-2xl font-semibold';
    }
    else if (key.length < 50) {
        mainDiv.className += ' text-xl font-medium';
    }
    else if (key.length < 150) {
        mainDiv.classList.add('text-base');
    }
    else if (key.length < 250) {
        mainDiv.classList.add('text-sm');
    }
    else {
        mainDiv.classList.add('text-xs');
    }

    taskP.innerText = key;

    mainDiv.appendChild(taskP);
    mainDiv.appendChild(BuildButtons());

    colTaskGroups[task].appendChild(mainDiv);
}

function BuildButtons (large = false) {
    let buttonsGroup = document.createElement('div');
    let moveLeft = document.createElement('button');
    let moveRight = document.createElement('button');
    let edit = document.createElement('button');
    let remove = document.createElement('button');

    let moveLeftImg = document.createElement('img');
    let moveRightImg = document.createElement('img');
    let editImg = document.createElement('img');
    let removeImg = document.createElement('img');

    buttonsGroup.className = 'button-map-group absolute z-11 hover:z-19 w-full h-full right-0 top-0 opacity-0 hover:opacity-100 transition-opacity duration-100';

    moveLeft.className = `move-left absolute ${large ? 'w-6 h-6' : 'w-5 h-5'} bg-slate-800 rounded-l-full top-[50%] left-0 translate-x-[-100%] translate-y-[-50%] justify-center items-center cursor-pointer hover:bg-slate-500 focus:ring-2 focus:ring-slate-300`;
    moveRight.className = `move-right absolute ${large ? 'w-6 h-6' : 'w-5 h-5'} bg-slate-800 rounded-r-full top-[50%] right-0 translate-x-[100%] translate-y-[-50%] justify-center items-center cursor-pointer hover:bg-slate-500 focus:ring-2 focus:ring-slate-300`;
    edit.className = `edit absolute ${large ? 'w-6 h-6' : 'w-5 h-5'} bg-slate-800 rounded-full top-0 right-0 translate-x-[50%] translate-y-[-50%] cursor-pointer hover:bg-slate-500 focus:ring-2 focus:ring-slate-300`;
    remove.className = `remove absolute ${large ? 'w-6 h-6' : 'w-5 h-5'} bg-slate-800 rounded-full top-0 left-0 translate-x-[-50%] translate-y-[-50%] cursor-pointer hover:bg-slate-500 focus:ring-2 focus:ring-slate-300`;

    moveLeftImg.src = './Public/SVGs/arrow-left-3-svgrepo-com.svg';
    moveRightImg.src = './Public/SVGs/arrow-right-2-svgrepo-com.svg';
    editImg.src = './Public/SVGs/edit-2-svgrepo-com.svg';
    removeImg.src = './Public/SVGs/bag-svgrepo-com.svg';

    moveLeftImg.className = 'w-full h-full';
    moveRightImg.className = 'w-full h-full';
    editImg.className = 'w-7/10 h-7/10 place-self-center';
    removeImg.className = 'w-7/10 h-7/10 place-self-center';

    moveLeft.appendChild(moveLeftImg);
    moveRight.appendChild(moveRightImg);
    edit.appendChild(editImg);
    remove.appendChild(removeImg);

    if (large) {
        moveLeft.addEventListener('click', MoveColumnLeft);
        moveRight.addEventListener('click', MoveColumnRight);
        remove.addEventListener('click', RemoveColumn);
    }
    else {
        moveLeft.addEventListener('click', MoveTaskLeft);
        moveRight.addEventListener('click', MoveTaskRight);
        remove.addEventListener('click', RemoveTask);
    }

    buttonsGroup.appendChild(moveLeft);
    buttonsGroup.appendChild(moveRight);
    buttonsGroup.appendChild(edit);
    buttonsGroup.appendChild(remove);

    return buttonsGroup;
}

export { BuildBoard, BuildTask, BuildColumn };

