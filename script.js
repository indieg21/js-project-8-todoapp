// 1. function to dipslay todos: Function Render the todos list (Line 93)
// 2. function to add todos. function addTodo() to add item and id to list (line 20)
// 3. function to store todos to localstorage. (lines 33-36)
// 4. Fucntion delete (line 42-52)
// 5. Funtion to update (line 56-92)
// 6. Selecting data from localStorage (line 11-18)
// 7. In line 14 just saving an empty array to local storage

let todos; //todos is my varaible to store data from my local storage

// line 13-20 Is a variable w/ a condition. We need this to verify the data from the localStorage

let getData = JSON.parse(localStorage.getItem("todos")); // Selecting data from the local storage
if (Array.isArray(getData)) {
  // checking if it has the data (if the data shows up will run & save data)
  todos = getData; // saving data to todos variable
  //console.log(getData)
} else {
  todos = []; // if it is not getting any data from the localStorage it will save an empty array
  localStore(todos); // update the localStorage to the empy array
}

let submitBtn = document.getElementById("add-todo"); // Selecting the submit button from the Dom.
submitBtn.addEventListener("click", addTodo); // Create onclick. This function will execute (run)

// Add todo function to add title & Id to todos variable
function addTodo() {
  let title = document.getElementById("todo-title").value; //  1st step is to read the value from the input field(todo list window)
  let id = "" + new Date().getTime(); // creating a new id everytime we add a new task. Every task will have its own id. The reason is to perform for the update & delete function

  todos.push({ title: title, id: id }); // pushing (the objects) to the todos array (basically saving)
  document.getElementById("todo-title").value = ""; // this empty string clears the input field

  localStore(todos); //  the local storage will run & save the todos list or(tasks) to the local storage
  render(); // displaying the list from the local storage.
}

//  local storage fucntion : I need store data this is the use of local storage
function localStore(todos) {
  // everytime you add,update & delete the todos. It will be receieved and updated to the localStorage. localStorage is to hold saved data
  localStorage.setItem("todos", JSON.stringify(todos)); // object has to be converted to a string (attached to Json..) for
  //local storage to accept it (basically has to be converted to a string for LS to read it)
}

// The delete fuction is needed to be able to delete todo item when needed.
function deleteTodo(e) {
  // Event(e) Delete by clicking delete button
  // Remember onClick function is attached to each delete button. Which is in the render section.
  //deleting tasks from the todo list
  let targetId = e.target.id; // target id is the object(todo item) that is being deleted
  //console.log (e)
  todos = todos.filter((todo) => {
    // filter will remove todo object which matches the target Id
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
  todos.forEach((todo) => {
    // loop through the todos field(array)
    if (targetIndex === todo.id) {
      // if targetIndex matches to the todo (the if statment will return true)
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

  todos.map((todo, index) => {
    // the map will loop through each todo object
    if (saveIndex === todo.id) {
      // if the todo id matches we will update the todo object
      todos[index] = { title: title.value, id: saveIndex }; // update and save new todo object
    }
  });
  let saveEdit = document.getElementById("saveEdit"); //select saveedit button
  let addTodo = document.getElementById("add-todo"); //select submit button
  saveEdit.style.display = "none"; // to hide the edit button (so submit button is visable)
  addTodo.style.display = "inline-block"; // display the sumbit button
  title.value = ""; // empty the input field window
  localStore(todos); // call (execute) the localStorage
  render(); //Call the render function(display the todos data)
}

// the render function is to loop through the todo's and display each item (todo's array)
function render() {
  // to display my todo list
  // creating buttons (update, delete) also displaying the task list.
  //console.log(getData)
  document.getElementById("display-todo").innerHTML = ""; // clearing the pervious todos add from the dom
  //(clearing out the todo div) which will allow you to put in a new todo item (lis)
  todos.map((todo) => {
    //
    //todos is my varaible to store data from my local storage
    // map function to loop through the todo list (Array)
    // todos variable holds all data from localStorage

    let element = document.createElement("p"); // creating the Paragraph for each to item
    element.innerText = todo.title; // title for each todo item being displayed
    let btn = document.createElement("button"); // line 107 to 111 is the update button
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
  // creating the paragraph. Adding title, update/delete button. Appending (adding) as a child to
  // to the display todo div
}

render();
// breakdown of app: adding, delete, update and render (display/view) CRUD (create read update delete)
// creating: submiting the form. Read: displaying the page Updating: Updating the data Delete: deleting the data
