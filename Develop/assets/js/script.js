// Retrieve tasks and nextId from localStorage

const projectValue = $("#project");
const nameValue = $("#name");
const dateValue = $("#date");




// https://getbootstrap.com/docs/4.0/components/modal/#via-javascript 
$('#modal').on('shown.bs.modal', function () {
    $('#modal').modal('show')

})





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
    console.log(tasksStored); 
    if (tasksStored){
            const tasksParsed = JSON.parse(tasksStored);
            return tasksParsed
        } else {
            const tasksStored = [];
            return tasksStored;
        }
}

function saveToStorage (tasks) {
    let tasksString = JSON.stringify(tasks);
    localStorage.setItem("tasks", tasksString);
}

// Todo: create a function to create a task card
function createTaskCard(task) {

     
    
        tasksObj = {
            id: generateTaskId(),
            project: projectValue.val(),
            name: nameValue.val(),
            date: dateValue.val(),
            status: 'to-do',
        }


        const tasks = readStorage();
        tasks.push(tasksObj);
        saveToStorage(tasks)

 
    
}

const submit = $('#submitBtn')

submit.on("click", function (event) {
    event.preventDefault();
createTaskCard()
});

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
