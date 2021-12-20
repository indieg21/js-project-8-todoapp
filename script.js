// 1. function to dipslay todos: Function Render the todos list (Line 93)
// 2. function to add todos. function addTodo() to add item and id to list (line 20)
// 3. function to store todos to localstorage. (lines 33-36)
// 4. Fucntion delete (line 42-52)
// 5. Funtion to update (line 56-92)
// 6. Selecting data from localStorage (line 9-16)
let todos;

let getData = JSON.parse(localStorage.getItem("todos")); //selecting data from localStorage (retrieving data & store in todos)
if (Array.isArray(getData)) { // checking if it has the data (if the data shows up will run & save data)
  todos = getData; // saving data to todos 
} else {
  todos = []; // if it is not getting any data from the localStorage it will save an empty array
  localStore(todos); // update the localStorage to the empy array
}

let submitBtn = document.getElementById("add-todo"); //adding todo function.
submitBtn.addEventListener("click", addTodo); // onclick the function will execute (run)

function addTodo() { 
  let title = document.getElementById("todo-title").value; //  1st step is to read the value from the input field(todo list window)
  let id = "" + new Date().getTime(); // creating a new id everytime we add a new task. Every task will have its own id. The reason is to perform for the update & delete function 

  todos.push({ title: title, id: id }); // pushing (the objects) to the todos array (basically saving)
  document.getElementById("todo-title").value=""; // this empty string clears the input field

  console.log(todos);
  localStore(todos); //  the local storage will run & save the todos list or(tasks) to the local storage
  render(); // displaying the list from the local storage. 
}

//  local storage fucntion
function localStore(todos) {
  // everytime you add,update & delete the todos. It will be receieved and updated to the localStorage. localStorage is to hold saved data
  localStorage.setItem("todos", JSON.stringify(todos)); // object has to be converted to a string (attached to Json..) for
  //local storage to accept it
  
}

function deleteTodo(e) { // Event(e) Delete by clicking delete button
  // deleting tasks from the todo list
  let targetId = e.target.id; // target id is the object(todo item) that is being deleted
  todos = todos.filter((todo) => { // filter will remove todo object which matches the target Id
    return todo.id != targetId; // acts as if/else statement returning true/false. Keep all id's that
    //don't match the todo that is being deleted.
  });
  localStore(todos); // saving the new list to the local storage
  render(); // run function to now display the new list.
}

let saveIndex; // to store target Id in global( will need for line 82)

function updateTodo(e) {
  // updating the list
  let targetIndex = e.target.id; // everything needs to be updated so that the new edit shows properly
  let saveEdit = document.getElementById("saveEdit"); // selecting the edit button
  let addTodo = document.getElementById("add-todo"); // selecting the add submit button
  let title = document.getElementById("todo-title"); // selecting the input field(todo object)
  todos.forEach((todo) => { // loop through the todos field(array)
    if (targetIndex === todo.id) { // if targetIndex matches to the todo (the if statment will return true)
      saveIndex = targetIndex; // storing the id
      title.value = todo.title; // display the title into input field
    }
    saveEdit.style.display = "inline-block"; // displaying the saveEdit button
    addTodo.style.display = "none"; // hiding the submit buttonh
  });
}

let saveEdit = document.getElementById("saveEdit"); // seleting the edit button from the dom

saveEdit.addEventListener("click", saveUpdate); // adding onclick eventListener & it will run save update function

function saveUpdate(e) { 

  let title = document.getElementById("todo-title"); // selecting the input field (todo object)

  todos.map((todo, index) => { // the map will loop through each todo object
    if (saveIndex === todo.id) { // if the todo id matches we will update the todo object
      todos[index] = { title: title.value, id: saveIndex }; // update and save new todo object
    }
  });
  let saveEdit = document.getElementById("saveEdit"); //select saveedit button
  let addTodo = document.getElementById("add-todo"); //select submit button
  saveEdit.style.display = "none"; // to hide the edit button (so submit button is visable)
  addTodo.style.display = "inline-block"; // display the sumbit button
  title.value = ""; // empty the input field window
  localStore(todos);// call (execute) the localStorage
  render(); //Call the render function(display the todos data)
}

function render() { 
  // creating buttons (update, delete) also displaying the task list.
  document.getElementById("display-todo").innerHTML = "";
  todos.map((todo) => {
    // map function to loop through the todo list (Array)
    // todos variable holds all data from localStorage
    let element = document.createElement("p"); // creating the Paragraph
    element.innerText = todo.title;
    let btn = document.createElement("button");// line 100 to 104 is the update button
    btn.innerText = "Update";
    btn.id = todo.id;
    btn.style = "margin-left:10px";
    btn.onclick = updateTodo; // line 95 to 99 is the update button
    let btnDelete = document.createElement("button"); // line 109-115 is the delete button
    btnDelete.innerText = "Delete";
    btnDelete.id = todo.id;
    btnDelete.style = "margin-left:10px";
    btnDelete.onclick = deleteTodo;
    element.appendChild(btn); // adding both buttons as a child to paragraph (element)
    element.appendChild(btnDelete);
    let display = document.getElementById("display-todo");
    display.appendChild(element); // Appending paragraph as child to the div
  }); // this block of code will run for every element in the array
}

render();
// breakdown of app: adding, delete, update and render (display/view) CRUD (create read update delete)
// creating: submiting the form. Read: displaying the page Updating: Updating the data Delete: deleting the data