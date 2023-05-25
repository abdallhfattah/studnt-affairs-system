// const submit_button = document.getElementById("btn");

export function addStudent(){
    var ID = document.getElementById("id").value;
    var Name = document.getElementById("name").value;
    var date = document.getElementById("date").value;
    var gpa = document.getElementById("gpa").value;
    var gender = document.getElementById("gender").value;
    var level = document.getElementById("level").value;
    var stat= document.getElementById("status").value;
    var email = document.getElementById("email").value; // error
    var dep =  document.getElementById("department").value;
    var phone = document.getElementById("phone").value;
    var pass = document.getElementById("pass").value; 
    var student = {
        student_id : ID,
        student_name : Name,
        student_dob : date,
        student_gpa : gpa,
        student_gender : gender,
        student_lvl : level,
        student_stat : stat,
        student_email : email,
        student_dep : dep,
        student_num : phone,
        student_password : pass
    }

    // checking values if null
    if(student.student_id !== "" && 
    student.student_name !== "" &&
    student.student_dob !== "" &&
    student.student_gpa !== "" &&
    student.student_gender !== "" &&
    student.student_lvl !== "" &&
    student.student_stat !== "" &&
    student.student_num !== "")
{
    let is_valid = true;
    // checking if ID , email , phone number is aready in use 
    for(let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        const stored_student = JSON.parse(localStorage.getItem(key));
        if(student.student_id === stored_student.student_id){
            alert("This ID already exists");
            is_valid = false;
            break;
        }
        else if(student.student_email === stored_student.student_email){
            alert("This email already exists");
            is_valid = false;
            break;  
        }
        else if(student.student_num === stored_student.student_num){
            alert("This phone number already exists");
            is_valid = false;
            break;
        }
    }
    // adding student if valid 
    if(is_valid){
        localStorage.setItem(ID, JSON.stringify(student));
        window.location.reload();
    }
    }
}

