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
const listEl4 = $('<li>')
listEl4.addClass('list-group-item')
const listEl3 = $('<li>')
const dateFormatter = dayjs(task.date).format('MMM D, YYYY')
listEl3.text(dateFormatter)
listEl3.addClass('list-group-item')

const deleteBtn = $('<button>');
deleteBtn.addClass('btn btn-success delete w-50 m-auto')
deleteBtn.text('Delete')
// deleteBtn.attr('data-task-id', task.id)
deleteBtn.attr('id', task.id)


let today = dayjs()
// console.log(today)
let today2 = new Date()
let threeDays = new Date(today2)
let twoDays = new Date(today2)
let oneDay = new Date(today2)
threeDays.setDate(today2.getDate() + 3);
twoDays.setDate(today2.getDate() + 2);
oneDay.setDate(today2.getDate() + 1);

listEl3Date = dayjs(listEl3[0].innerText)
// console.log(listEl3Date)

// if (listEl3Date.isSame(threeDaysAgo, 'day')) {
//     console.log('its the same')
// }
//  else {
//     console.log('its not the same')
// }

// console.log(listEl3Date)

 if (listEl3Date.isSame(today.format('MMM D, YYYY'))) {
     cardHeader.addClass('bg-warning')
     listEl4.text('Due Today!')
  } else if (today.isAfter(listEl3Date)) {
        cardHeader.addClass('bg-danger text-light')
        listEl4.text('Past Due!')
} else if (listEl3Date.isSame(threeDays, 'day')) {
    cardHeader.addClass('bg-warning')
    listEl4.text('Due in Three Days!')
} else if (listEl3Date.isSame(twoDays, 'day')) {
    cardHeader.addClass('bg-warning')
    listEl4.text('Due in Two Days!')
} else if (listEl3Date.isSame(oneDay, 'day')) {
    cardHeader.addClass('bg-warning')
    listEl4.text('Due in One Day!')
} else if (today.isBefore(listEl3Date)) {
    cardHeader.addClass('bg-success text-light')
    listEl4.text('Due on:')
}


// else if (listEl3[0].innerText === today.format('MMM D, YYYY')) {
//     cardHeader.addClass('bg-warning')
//     console.log('it matches')
// }

// {
//     cardHeader.addClass('bg-warning')
// } else if (listEl3[0].innerText < today.format('MMM D, YYYY')) {
//     cardHeader.addClass('bg-success text-light')

// } else if (listEl3.isAfter(today)){
//     cardHeader.addClass('bg-danger text-light')
// }



cardList.append(listEl1, listEl2, listEl4, listEl3)

cardDiv.append(cardHeader);
cardDiv.append(cardList)
cardDiv.append(deleteBtn)
$('#todo-cards').append(cardDiv)


deleteBtn.on('click', function () {
    const tasks = readStorage();
    for (const btn of deleteBtn) {
        // virtual assistant
            const removeTask = tasks.findIndex(task => task.id === btn.id)
            
            if (removeTask !== -1) {
           tasks.splice(removeTask, 1)
           let tasksString = JSON.stringify(tasks);
           localStorage.setItem("tasks", tasksString);
            }
            
        }
    
        window.location.reload()
})


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

    if (tasksObj.project !== '' && tasksObj.name !== '' && tasksObj.date !== '') {
    tasks.push(tasksObj);
    } else {
        alert('Please enter a task')
    }
    saveToStorage(tasks);

    
    
    renderTaskList();

  
    
}

renderTaskList();
submit.on("click", function (event) {
    // event.preventDefault();
    handleAddTask()
})


// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

    // const tasks = readStorage()
    // const deleteBtn = $('.delete')
    // console.log(deleteBtn)

// console.log(task.id)
// for (const btn of deleteBtn) {
//     // virtual assistant
//         const removeTask = tasks.findIndex(task => task.id === btn.id)
        
//         if (removeTask !== -1) {
//        tasks.splice(removeTask, 1)
//        let tasksString = JSON.stringify(tasks);
//        localStorage.setItem("tasks", tasksString);
//         }
        
//     }

//     window.location.reload()


    // const deleteBtn = $('.delete')
    // const tasks = readStorage()
    // const taskId = $(this).attr('data-task-id')
    // const tasks = readStorage()

    // for (const task of tasks) {
    //     // console.log(task.id)
    //     for (const btn of deleteBtn) {
    //         // console.log(btn.id)
    //         if (btn.id === task.id) {
    //             console.log("it matches")
    //         }
    //     }
    // }

    // for (let i = 0; i < tasks.length; i++) {
    //     if (deleteBtn == "clicked") {
    //         // tasks.splice(tasks[i])
    //         console.log("Delete clicked")
    //     }
    // }

    // saveToStorage(tasks)

    // renderTaskList()

}

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

    submit.on('click', handleAddTask)



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
