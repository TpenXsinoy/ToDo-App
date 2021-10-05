//getting all required elements
const taskInput = document.querySelector(".taskIn input");
const addBtn = document.querySelector(".taskIn button");
const todo = document.querySelector(".todo");
var checks = document.getElementsByClassName('taskCheck');
const removeBtn = document.querySelector(".removeChecked button");
const taskNum = document.querySelector(".taskNum"); // the number of tasks
const taskDone = document.querySelector(".progressNum"); // the number checked of tasks
const lastSection = document.querySelector(".lastSection");
const progressBar =  document.querySelector(".progress");

taskInput.onkeyup = ()=>{
		let userInput = taskInput.value; 	//getting user entered value
		
		if(userInput.trim() != 0){ 	//if user values are not only spaces
			addBtn.classList.add("active"); //active the add button
		}else{
			addBtn.classList.remove("active");//unactive the add button
		}
}

 showTasks(); //calling showTasks function so that tasks still show when refreshed

function getStorage(){
		let getLocalStorage = localStorage.getItem("New Task");
		
		if(getLocalStorage == null){ //if localstorage is null
			taskArray = [];  //creating blank array
		}else{
			taskArray = JSON.parse(getLocalStorage);  //transforming json string into a js object
		}
}

//if user click on the add button
addBtn.onclick = ()=>{
		let userInput = taskInput.value; //getting user entered value
		getStorage();	//calling getStorage function

		taskArray.push(userInput); //adding user data
		localStorage.setItem("New Task" , JSON.stringify(taskArray));  //transforming js object into a json string

		showTasks(); //calling showTasks function
		addBtn.classList.remove("active");//unactive the add button
}


//function to add task list inside ul
function showTasks(){
		//let userInput = taskInput.value; 
		getStorage();

		let NewTask = '';
		taskArray.forEach((element, index)=> {
			NewTask += `<li class ="texts">
							<input onclick="checkDone(this)" class="taskCheck" type= "checkbox" /> 
								
								${element} 	<span class="edit" id="editBtn" onclick="editTask(this)">
												
												<i class="fas fa-edit"></i> 
											
											</span>

											<span class="trash" onclick="deleteTask(this)">
										 		
										 		<i class="fas fa-trash" ></i>

										 	</span>
										 			</li>`
		});

		
		taskNum.textContent = taskArray.length; //passing the number of tasks in taskNum
		if(taskArray.length != 0 ){
			lastSection.style.visibility = "visible"
		}else{
			lastSection.style.visibility = "hidden"	//hides the last section if there are no tasks
		}
		//console.log(taskArray.length);

		todo.innerHTML = NewTask; // adding new li tag inside ul tag
		taskInput.value = ""; //once task added leave the input field blank		
}

//delete task function
function deleteTask(index){
		let getLocalStorage = localStorage.getItem("New Task");
		taskArray = JSON.parse(getLocalStorage);  
		taskArray.splice(index, 1); // delete or remove the partiruclar indexed li in the local storage
		
		//after remove the li again update the local storage
		localStorage.setItem("New Task", JSON.stringify(taskArray));  //transforming js object into a json string
		var closestLi = index.closest("li"); 
		closestLi.remove();	//remove the list that is displayed
		
		// for the progress bar after deleting 
		
		taskNum.textContent = taskArray.length;  //counting the number of remaining task
		//console.log(textList.length);
		if(taskArray.length != 0 ){
			lastSection.style.visibility = "visible"
		}else{
			lastSection.style.visibility = "hidden" //hides the last section if there are no tasks remaining
		}
		var count = 0;   
		for(let i =0; i < taskArray.length ; i ++){
			if(checks[i].checked){
			count++;  //count for number of checked box
			}
		}
		taskDone.textContent = count; //  number of tasks done or checked
		if(taskDone.textContent == 0 ){
			removeBtn.classList.remove("active");  //unactive remove all checked button if there is no checked box
		}else{
			removeBtn.classList.add("active");		//active remove all checked button if there is a checked box
		}

}

//edit task function
function editTask(index){
		var closestLi = index.closest("li"); 
		var closestSpan = index.closest("span"); 
		//var textList = document.querySelectorAll('.texts');

		closestLi.toggleAttribute('contenteditable');
		
	  	if( closestLi.hasAttribute('contenteditable') ){
		// Currently editing, change the button
			closestSpan.innerHTML =`<i class="fas fa-check-circle"></i>`;	
			closestLi.style.color = "red";
			closestLi.style.backgroundColor = "#f2f2f2";
		
	  	} else {
		// We just "saved". run "save functions" here
			closestSpan.innerHTML =`<i class="fas fa-edit"></i>`;
			closestLi.style.color = "black";
			closestLi.style.backgroundColor = "#DAD2D2";
		
	   	//console.log(closestLi.textContent);
	}	
}


//function for checking the boxes if checked and putting a line-through to the text
function checkDone(index){
		var closestLi = index.closest("li"); 
		var count = 0;   //count for number of checked box
		
		for(let i =0; i < taskArray.length ; i ++){
			if(checks[i].checked){
				count++;  //count for number of checked box
			}
		}
			taskDone.textContent = count; //  number of tasks done or checked

			if(index.checked){  //if checkbox is checked
				//Add class nga linethrough
				closestLi.classList.add("line-through");
			}else{
				//remove linethrough class
				closestLi.classList.remove("line-through");
			} 

			if(taskDone.textContent == 0 ){
				removeBtn.classList.remove("active"); //unactive remove all checked button if there is no checked box
			}else{
				removeBtn.classList.add("active");	//active remove all checked button if there is a checked box
			}

}

//removing the checked boxes
removeBtn.onclick = () => {
		var textList = document.querySelectorAll('.texts');
		var indexToDelete = [];
		for(let i=0; i < textList.length; i++){
			var checkbox = textList[i].querySelectorAll('.taskCheck');
			if(checkbox[0].checked){
				indexToDelete.push(i); //pushing the index that needs to be deleted in the local storage
				textList[i].remove();	//remove the list that is displayed
			}
		}
		let getLocalStorage = localStorage.getItem("New Task");
		taskArray = JSON.parse(getLocalStorage); 
		for (var i = indexToDelete.length -1; i >= 0; i--){
			taskArray.splice(indexToDelete[i],1);	// remove the partiruclar indexed li in the local storage
		}
		//after remove the li again update the local storage
		localStorage.setItem("New Task", JSON.stringify(taskArray));  //transforming js object into a json string	


		// for the progress bar after deleting all checked lists
		taskNum.textContent = taskArray.length; //counting the number of remaining task
		if(taskArray.length != 0 ){
			lastSection.style.visibility = "visible"
		}else{
			lastSection.style.visibility = "hidden" //hides the last section if there are no tasks remaining
		}
		var count = 0;   
		for(let i =0; i < taskArray.length ; i ++){
			if(checks[i].checked){
			count++;  //count for number of checked box
			}
		}
		taskDone.textContent = count; //  number of tasks done or checked

		if(taskDone.textContent == 0 ){
			removeBtn.classList.remove("active");  //unactive remove all checked button if there is no checked box
		}else{
			removeBtn.classList.add("active");	//active remove all checked button if there is a checked box
		}
}


