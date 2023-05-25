//
// function check()
// {
//     var Name = document.getElementById("name").value;
//     let specialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0123456789]+/;
//     if(specialCharacter.test(Name) ){
//         alert("ERROR Invalid Name:\nName can contain only letters");
//         return false;
//     }
//     var ID = document.getElementById("id").value;
//     if(localStorage.getItem(ID) == null)
//     {
//         alert("Please enter a valid id");
//         return false;
//     }
//     var GPA = document.getElementById("gpa").value;
//     var Email = document.getElementById("email").value;
//     const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//     if (!emailRegex.test(Email)) {
//         alert("Please enter a valid email")
//     }
//     var Date = document.getElementById("date").value;
//     var Level = document.getElementById("level").value;
//     var Department = document.getElementById("department").value;
//     if(Level < 3 && Department != "GE"){
//         alert("ERROR Invalid Level:\nLevel must be 3 or higher to register to a department");
//         return false;
//     }
//     var Mobile_Number = document.getElementById("mobile-number").value;
//     let special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
//     if(Mobile_Number[0] != '0' || Mobile_Number.length != 11 || special.test(Mobile_Number)){
//         alert("ERROR Invalid Mobile Number:\nMobile Number should begin with a zero and should contain only digits");
//         return false;
//     }
//     var Status = document.getElementById("status").value;
//     var Gender = document.getElementById("gender").value;
//     if(Name == "" || ID == "" || GPA == "" || Email == "" || Date == "" || Gender == "select" || Status == "select" || Level == "" || Department == "select" || Mobile_Number == "" )
//     {
//         alert("you must enter all inputs");
//         return false;
//     }
//     var student = {
//         N : Name,
//         G: GPA,
//         E: Email,
//         G:Gender,
//         Dob: Date,
//         S: Status,
//         L: Level,
//         D:Department,
//         M: Mobile_Number,
//     }
//
//     localStorage.setItem(ID,JSON.stringify(student));
// }
//
// function deleteStudent()
// {
//     var deltByID = document.getElementById("id");
//     if(localStorage.getItem(deltByID.value) == null)
//     {
//         alert("Please enter a valid ID");
//         return false;
//     }
//     localStorage.removeItem(deltByID.value);
// }

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
// Access the stud_id value from Django template



function deleteStudent(){

    if(confirm("Are you sure you want to delete this student?\nPress OK to continue or Cancel")){
      const xhttp = new XMLHttpRequest();
      // xhttp.open("DELETE", "../../delete/"+ 55);
        var id = document.getElementById('id').value.trim();
        window.location.href = `../../delete/`+id ;
        // csrf = getCookie("csrftoken");
        // xhttp.setRequestHeader("X-CSRFToken", csrf);
        // xhttp.send();
        // alert("Student was deleted Successfully");
    }else{
      return false;
    }
}