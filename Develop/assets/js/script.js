
const projectValue = $("#project");
const nameValue = $("#name");
const dateValue = $("#date");
const submit = $('#submitBtn')




// https://getbootstrap.com/docs/4.0/components/modal/#via-javascript 
$('#modal').on('shown.bs.modal', function () {
    $('#modal').modal('show')
    
})







// Retrieve tasks and nextId from localStorage
function retrieveTaskList () {
 }

// Todo: create a function to generate a unique task id
// Virtual learning assistent helped with this function
function generateTaskId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    const uniqueId = `${timestamp}${random}`;
    return uniqueId
}

function readStorage () {
    const tasksStored = localStorage.getItem('tasks');
    // console.log(tasksStored); 
    if (tasksStored){
            const tasksParsed = JSON.parse(tasksStored);
            return tasksParsed
        } else {
            const tasksStored = [];
            return tasksStored;
        }
}
// tasks = readStorage()
// for (const task of tasks) {
//         if (task.status === 'to-do') {
//             console.log(task)
//         }
// }

function saveToStorage (tasks) {
    let tasksString = JSON.stringify(tasks);
    localStorage.setItem("tasks", tasksString);
}

  




// const cardDiv = $('<div>');
// cardDiv.addClass('card')
// const cardHeader = $('<div>');
// cardHeader.addClass('card-header')
// cardHeader.text('Header');

// const cardList = $('<ul>')
// cardList.addClass('list-group list-group-flush')
// const listEl1 = $('<li>')
// listEl1.addClass('list-group-item')
// listEl1.text('List Element 1')
// const listEl2 = $('<li>')
// listEl2.addClass('list-group-item')
// listEl2.text('List Element 1')
// const listEl3 = $('<li>')
// listEl3.addClass('list-group-item')
// listEl3.text('List Element 1')



// cardList.append(listEl1, listEl2, listEl3)

// cardDiv.append(cardHeader);
// cardDiv.append(cardList)
// $('#todo-cards').append(cardDiv)
 


// Todo: create a function to create a task card
function createTaskCard(task) {


    
const cardDiv = $('<div>');
cardDiv.addClass('card m-4 draggable')
cardDiv.attr('role', 'button')
cardDiv.attr('data-task-id', task.id)


const cardHeader = $('<div>');
cardHeader.addClass('card-header')
cardHeader.text('Task');

const cardList = $('<ul>')
cardList.addClass('list-group list-group-flush')
const listEl1 = $('<li>')
listEl1.text(task.project)
listEl1.addClass('list-group-item')
const listEl2 = $('<li>')
listEl2.text(task.name)
listEl2.addClass('list-group-item')
const listEl3 = $('<li>')
listEl3.text(task.date)
listEl3.addClass('list-group-item')

const deleteBtn = $('<button>');
deleteBtn.addClass('btn btn-success delete w-50 m-auto')
// deleteBtn.attr('id', 'delete-button')
deleteBtn.text('Delete')
deleteBtn.attr('data-task-id', task.id)




cardList.append(listEl1, listEl2, listEl3)

cardDiv.append(cardHeader);
cardDiv.append(cardList)
cardDiv.append(deleteBtn)
$('#todo-cards').append(cardDiv)

// console.log(deleteBtn)

// deleteBtn.on('click', function () {
//     const tasks = readStorage();

//     for (const task of tasks) {
//         for (let i = 0; i < deleteBtn.length; i++) {
//         if (task.id === deleteBtn[i].dataset.taskId) {
//             // console.log(deleteBtn[i].dataset.taskId, "matches", task.id)
//            console.log(task)
            
//         }
//     }
//     }
    
// })



// for (let i = 0; i < deleteBtn.length; i++) {
//     const tasks = readStorage()
// // deleteBtn.on('click', handleDeleteTask)
//     if (deleteBtn[i].dataset.taskId === task.id) {
//     // console.log(deleteBtn[i].dataset.taskId)
//     // console.log(task.id)
//     deleteBtn.on('click', function () {
//         console.log(task)
//     })
// } else {
//     console.log('it doesnt match')
// }
// }

return cardDiv;
}






// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

    const tasks = readStorage();


    const todoList = $('#todo-cards')
    todoList.empty();

    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();
  
    const doneList = $('#done-cards');
    doneList.empty();



    for (const task of tasks) {
        const projectCard = createTaskCard(task);
        if (task.status === 'to-do') {
            todoList.append(projectCard)
        } else if (task.status === "in-progress") {
            inProgressList.append(projectCard)
        } else {
            doneList.append(projectCard)
        }

    }

// class mini project

    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,

        helper: function (e) {
            const original = $(e.target).hasClass('ui-draggable')
            ?$(e.target)
            : $(e.target).closest('.ui-draggable');
            return original.clone().css({
                width: original.outerWidth(),
            })
        }
    })



  
}



// Todo: create a function to handle adding a new task
function handleAddTask(event){
    // event.preventDefault();

    tasksObj = {
        id: generateTaskId(),
        // id: crypto.randomUUID(),
        project: projectValue.val(),
        name: nameValue.val(),
        date: dateValue.val(),
        status: 'to-do',
    }

    
    
    const tasks = readStorage();
    tasks.push(tasksObj);
    saveToStorage(tasks);

    
    
    renderTaskList();

   
    
    
    
    
}

submit.on("click", function (event) {
    event.preventDefault();
    handleAddTask()
})

// renderTaskList()

// deleteBtn.on('click', function () {
//     console.log('clicked')
// })
// console.log(deleteBtn)
// console.log(deleteBtn[0].dataset.taskId)
// let deleteArray = []
// deleteArray.push(deleteBtn)
// console.log(deleteBtn)

// const tasks = readStorage();

// for (const task of tasks) {
//     // console.log('btn id:', btn.dataset.taskId)
//     for (let i = 0; i < deleteBtn.length; i++) { 

//         deleteBtn.on('click', function () {
//             console.log('clicked')
//         })
    
//         // if (task.id === deleteBtn[i].dataset.taskId) {
//         // console.log('It matches')
//         // deleteBtn[i].click(function () {
//         //     console.log('clicked')
//         // })
        
//     }
// }


// for (const task of tasks ) {
//     // console.log('task id:', task.id)
// }




// for (const btn of deleteArray) {
//     console.log(btn)
// }



// const taskarray = readStorage()



// for (const task of taskarray) {

    
// }


// console.log($('#to-do'))

// const deleteButtons = $('.delete')
// console.log(deleteButtons)
// Todo: create a function to handle deleting a task
function handleDeleteTask(event){


//     const tasks = readStorage()
//     // console.log(tasks)

//    for (const task of tasks) {
//     console.log(task)
//    }
    
    
    
    // renderTaskList()
    // const tasks = readStorage();

    // for (const task of tasks) {
    //     for (const btn of deleteBtn) {
    //         if (task.id === btn.dataset.taskId) {
    //             console.log(btn.dataset.taskId)
    //         }
    //     }
    // }
    
    // const taskId = $(this).attr('data-task-id')
    // const tasks = readStorage()
    
    // for (let i = 0; i < tasks.length; i++) {
    //     // console.log(tasks[i])
    // }
    // deleteBtn.on('clicked', function () {
    //     console.log('clicked')
    // })
    
    // saveToStorage(tasks)
    
    // renderTaskList()
    
}

handleAddTask();

// handleDeleteTask()
// deleteBtn.on('click', handleDeleteTask);

// handleDeleteTask();

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    
    const tasks = readStorage()
    
    const taskId = ui.draggable[0].dataset.taskId
    const newStatus = event.target.id;
 
    for (let task of tasks) {
        if (task.id === taskId) {
            task.status = newStatus
            // console.log(task.id)
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTaskList()

    

    // $(document).ready(function () {
    //     renderTaskList(); 

    //     $('#date').datepicker({
    //         changeMonth: true,
    //         changeYear: true,
    //     });

    //     $('.lane').droppable({
    //         accept: '.draggable', 
    //         drop: handleDrop,
    //     });
    // });




}
// handleDrop();
// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    renderTaskList()

    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    })

});
