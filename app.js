"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/


// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits***JF***
      searchResults = searchByGenderAndDob(people);   
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}



// Menu function to call once you find who you are looking for
function mainMenu(person, people){

    /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
      let spouse = searchFoundPersonSpouse(people, person);
      var parents = searchFoundPersonParents(people, person);

      alert("Name: " + person.firstName + " " + person.lastName + "\n"+
        "Gender: " + person.gender +"\n"+
        "DOB: " + person.dob +"\n"+
        "Height: " + person.height +"\n"+
        "Weight: " + person.weight +"\n"+
        "Eye Color: " + person.eyeColor +"\n"+
        "Occupataion: " + person.occupation +"\n"+
        "Current Spouse: " +spouse.firstName+" "+spouse.lastName+"\n"+
        "Parents1: " +parents[0].firstName+" "+parents[0].lastName+"\n"+
        "Parents2: " +parents[1].firstName+" "+parents[1].lastName+"\n");
                
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
            
        return true;
        
      }
    
    else{
      return false;
    }
  })
    // TODO: find the person using the name they entered
   //Mat:  added the index to reference the object in the returned array 
  return foundPerson[0]; 

}



// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
 
  
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
//*****JF ******
function mf(input){
  return input.toLowerCase() == "male" || input.toLowerCase == "female";
}

  function searchByGenderAndDob(people){
  let gender = promptFor("What is the person's gender? Enter 'male' or 'female'", chars);
  let dob = promptFor("What is the person's date of birth? Enter 'dd/mm/yyyy'", chars);

  let foundPerson = people.filter(function(person){
    if(person.gender === gender && person.dob === dob){
      return true;
    }
    else{
      return false;
    }
  })
  
  return foundPerson;
}

//Mat: added this function to find spouse for display in main menue
function searchFoundPersonSpouse(people, person){
  
  let  spouse = person.currentSpouse;

  let foundPersonSpouse = people.filter(function(person){
    if(person.id === spouse){
            
        return true;
        
      }
    
    else{
      return false;
    }
  })
    
  return foundPersonSpouse[0]; 

}

function searchFoundPersonParents(people, person){
  
  let  parents = person.parents;

  let foundPersonParents = people.filter(function(person){
    if(person.id === parents[0] || person.id === parents[1]){
            
        return true;
        
      }
    
    else{
      return false;
    }
  })
    
  return foundPersonParents; 

}





