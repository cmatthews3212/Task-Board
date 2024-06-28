// Retrieve tasks and nextId from localStorage



// retrieveTaskList()
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const projectValue = $("#project");
const nameValue = $("#name");
const dateValue = $("#date");
const submitBtn = $("#submit")

function retrieveTaskList () {
    if (taskList == null) {
        taskList = []
    } else {
        return taskList
    }
}

function pushTaskList () {
    
}

// Todo: create a function to generate a unique task id
// Virtual learning assistent helped with this function
function generateTaskId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    const uniqueId = `${timestamp}${random}`;
    return uniqueId
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    // submitBtn.on("click", function (event) {
        // let newDiv = $(".card-body").add("div")
        // // $("#todo-cards").append(newDiv)
        // newDiv.addClass("card-container")
        // let h2El = newDiv.add("h2").textContent = projectValue.val()
        // let h3El = newDiv.add("h3").textContent = nameValue.val()
        // let h4El = newDiv.add("h4").textContent = dateValue.val()
     
    
        tasksObj = {
            id: generateTaskId(),
            project: projectValue.val(),
            name: nameValue.val(),
            date: dateValue.val(),
            status: 'to-do',
        }

        const tasks = retrieveTaskList();

        tasks.push(tasksObj)

        localStorage.setItem("tasks", JSON.stringify(tasks))

      pushTaskList(tasks)



      
  
    
}

submitBtn.on("click", function (event) {
    event.preventDefault();
    createTaskCard();
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
