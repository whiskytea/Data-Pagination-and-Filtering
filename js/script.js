/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

//snag the containers for the students and the pagination buttons
const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');
const header = document.querySelector('.header');

//determine number of students per page, and the number of pages needed
let itemsPerPage = 9;
let numberOfPages = (array) => {
   return Math.ceil(array.length/itemsPerPage);
}

//pay attention to when the search bar is focused
//if a value is entered
// -> if a valid entry
// --> remove the pagination buttons that exist -> start loading pages based on entry
// 




/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

let blankSlate = (container) => {
   while (container.firstChild){
      container.removeChild(container.firstChild);
   }
}

let createStudentItem = (studentObject) => {
   //create all the elements
   let studentItem = document.createElement('LI');
   studentItem.classList.add("student-item");
   studentItem.classList.add("cf");

   let studentDetails = document.createElement('DIV');
   studentDetails.className = "student-details";

   let avatar = document.createElement('IMG');
   avatar.className = "avatar";
      
   avatar.setAttribute('alt', 'Profile Picture'); // setAltribute function: https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
   avatar.setAttribute('src', studentObject.picture.large);

   let name = document.createElement('H3');
   name.textContent = `${studentObject.name.title} ${studentObject.name.first} ${studentObject.name.last}`;
   
   let email = document.createElement('SPAN');
   email.className = "email";
   email.textContent = studentObject.email;

   let joinedDetails = document.createElement('DIV');
   joinedDetails.className = "joined-details";

   let date = document.createElement('SPAN');
   date.className = "date";
   date.textContent = `Joined: ${studentObject.registered['date']}`

   //appending all child elements to their parents
   studentDetails.appendChild(avatar);
   studentDetails.appendChild(name);

   joinedDetails.appendChild(date)

   studentItem.appendChild(studentDetails);
   studentItem.appendChild(joinedDetails);

   return studentItem;

}

//loops through the data array and only creates HTML elements for the relevant student indexes
let appendStudent = (pageNumber, data) => {
   for (let i = itemsPerPage*(pageNumber-1); i < itemsPerPage*(pageNumber) && i < data.length; i++){
      let student = createStudentItem(data[i]);
      studentList.appendChild(student); //append student to the studentList
   }
}




let showPage = (pageNumber, data) => {
   blankSlate(studentList);
   appendStudent(pageNumber, data);
}

/*
Create the `addPagination` function
*/

let addPagination = (array) => {
   blankSlate(linkList);

   let pageNumber = numberOfPages(array);
   //create buttons
   for (let i = 1; i <= pageNumber; i++){
      let buttonLI = document.createElement('LI');
      let button = document.createElement('BUTTON');
      button.setAttribute('type', 'button');
      if (i === 1){
         button.className = 'active';
      }
      button.textContent = i;
      buttonLI.appendChild(button);
      linkList.appendChild(buttonLI);
      button.addEventListener('click', () =>{
         let buttons = document.querySelectorAll('.link-list button');
         console.log(buttons);
         buttons.forEach((button) => {button.classList = ''});
         button.className = 'active';
         showPage(parseInt(button.textContent), array);
      })
   }
}

// EXTRA CREDIT
header.insertAdjacentHTML('beforeend', 
   `<label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`
);

const search = document.querySelector('input');
search.addEventListener('input', (e) =>{ //https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
   let studentArray = [];
   for (let student of data){
      let studentName = (student.name.first + ' ' + student.name.last).toLowerCase()
      if (studentName.includes(e.target.value)){
         studentArray.push(student)
      }
   }

   if (studentArray.length === 0){ //if no results found, display error message
      blankSlate(studentList);
      blankSlate(linkList);
      studentList.innerHTML = `<p>No Results Found. Please clear your entry and try again.</p>`;
   }else{ //otherwise show the search results
      addPagination(studentArray);
      showPage(1, studentArray);
   }
});

/*
   DOMContentLoaded event trigger
*/

document.addEventListener('DOMContentLoaded', () => {
   addPagination(data);
   showPage(1, data); //loads first pages results every time the site is loaded
});


