/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

let dataLength = data.length;

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

/*
   load of the page its going create all the student divs but only display the first 9
   js-class for page 1, page 2, page 3 (array length / 9 rounded up)
   loop through the array, creating the element and adding the js-class property   
      in chunks of 9

   
*/

//function -> creates the StudentItem HTML element
let createStudentItem = (studentObject) => {
   //create all the elements
   let studentItem = document.createElement('LI');
   studentItem.classList.add("student-item");
   studentItem.classList.add("cf");

   let studentDetails = document.createElement('DIV');
   studentDetails.className = "student-details";

   let avatar = document.createElement('IMG');
   avatar.className = "avatar";
   
   // setAltribute function: https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
   avatar.setAttribute('alt', 'Profile Picture');
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
   date.textContent = `Joined: ${studentObject.registered['joined']}`

   //appending all child elements to their parents
   studentDetails.appendChild(avatar);
   studentDetails.appendChild(name);

   joinedDetails.appendChild(date)

   studentItem.appendChild(studentDetails);
   studentItem.appendChild(joinedDetails);

   return studentItem;

}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

/*
   create a button for each 9 div "page"
   when a button is pushed, it removes all existing children in the student-list div
      and then appends all divs with a matching js-class
*/


// Call functions

/*
   DOMContentLoaded event trigger
   create all divs
   create all buttons & after all divs created -> append first 9 to the page
*/