/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');

let totalDataLength = data.length;
let numberOfPages = Math.ceil(totalDataLength/9);

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

//function -> creates the StudentItem HTML element
let createStudentItem = (studentObject, jsClass) => {
   //create all the elements
   let studentItem = document.createElement('LI');
   studentItem.classList.add("student-item");
   studentItem.classList.add("cf");
   studentItem.classList.add(jsClass);

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

// function that takes the data array, passes it through the createStudentItem() function
let createStudentArray = (data, numberOfPages) => {
   let studentArray = [];
   let index = 0;
   for (let i = 1; i <= numberOfPages; i++){ // loops only as many times as there as pagination buttons
      for (let a = 0; a < 9; a++){ //loops through the array 9 times, as we want to assign classes to the array items in chunks of 9 or less
         if (index >= data.length){ //break out of the loop when the index reaches final index of array, this allows for last page being less than 9 options
            break;
         }
         let student = createStudentItem(data[index], `js-${i}`)
         studentArray.push(student);
         index++;
      }
   }
   return studentArray
};

let studentArray = createStudentArray(data, numberOfPages);

let appendStudent = (studentArray, studentList) => {
   let activeButton = document.querySelector('button.active');
   for (let student of studentArray){
      if (student.classList.contains(`js-${activeButton.textContent}`)){ //emagerhd learning how to check if an item is in a classList was a nightmare: https://blog.kevinchisholm.com/object-oriented-javascript/getting-to-know-the-javascript-element-classlist-object/
         studentList.appendChild(student);
      }
   }
}

let loadStudents = (studentArray, studentList) => {
   //clean slate
   while (studentList.firstChild){
      studentList.removeChild(studentList.firstChild);
   }

  //load new list of students
  appendStudent(studentArray, studentList);
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

let loadPages = () => {
   //create buttons
   for (let i = 1; i <= numberOfPages; i++){
      let buttonLI = document.createElement('LI');
      let button = document.createElement('BUTTON');
      button.setAttribute('type', 'button');
      if (i === 1){
         button.className = 'active';
      }
      button.textContent = i;
      buttonLI.appendChild(button);
      linkList.appendChild(buttonLI);
   }

   //collect all the buttons
   let buttons = document.querySelectorAll('BUTTON');
   
   //add the event listenter that will load a new list of students when clicked
   for (let button of buttons){
      button.addEventListener('click', () =>{
         buttons.forEach((button) => {button.classList = ''});
         button.className = 'active';
         loadStudents(studentArray, studentList );
      })
   }
}

// Call functions

/*
   DOMContentLoaded event trigger
   create all divs
   create all buttons & after all divs created -> append first 9 to the page
*/

document.addEventListener('DOMContentLoaded', () => {
   loadPages();
   appendStudent(studentArray, studentList);
});


