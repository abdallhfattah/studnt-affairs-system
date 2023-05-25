
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    var stud_id = document.getElementById('id').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var name = document.getElementById('name').value.trim(); 
    var stud_gpa = document.getElementById('gpa').value.trim(); 
    var stud_gender = document.getElementById('gender').value.trim(); 
    var date_of_birth = document.getElementById('date').value.trim(); 
    var stud_level = document.getElementById('level').value.trim();
    var department_name = document.getElementById('department').value.trim();
    var stud_status =  document.getElementById('status').value.trim();
    var password = document.getElementById('pass').value.trim();
    var password_confrim = document.getElementById('confirm-pass').value.trim();

    var formData = new FormData();
    formData.append('stud_id', stud_id);
    formData.append('email', email);
    formData.append('mobile_number', phone);
    formData.append('stud_name', name);
    formData.append('date_of_birth', date_of_birth);
    formData.append('stud_gpa', stud_gpa);
    formData.append('gender', stud_gender);
    formData.append('level', stud_level);
    formData.append('status', stud_status);
    formData.append('department', department_name);
    formData.append('password', password);
    formData.append('confirm-pass', password_confrim);

    console.log('name  :' , name, isValidName(name));

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '../check_existing/');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            var vaild = true;
            var vaild_id = true;
            var vaild_phone = true;
            var vaild_email = true;

            /* ======================== ID VALDIATION ======================== */
            if(isVaildID(stud_id)){
                setSuccess(document.getElementById('id'));
            }
            else {
                setError(document.getElementById('id'),  'Please enter a valid ID');
                vaild = false;
                vaild_id = false;
            }

            /* ======================== VAILD PHONE NUBMER ========================  */
            if (!isValidPhoneNumber(phone)){
                setError(document.getElementById('phone') , "Egyption number are only allowed");
                vaild = false;
                vaild_phone = false;
            }
            else setSuccess(document.getElementById('phone'));
        
            /* ======================== Strong Password ======================== */
            if (password.length >= 8 ){
            /* ======================== PASSWORD MATCHING ======================== */
                setSuccess(document.getElementById('pass'));
                if(password_confrim !== password) {
                    setError(document.getElementById('confirm-pass') , "password doesnt match");
                    vaild = false;
                }
                else setSuccess(document.getElementById('confirm-pass'));
            }
            else {
                setError(document.getElementById('pass') , "Password must be at least 8 characters");
                vaild = false;
            }

            /* ======================== EMAIL VALIDATION ========================  */
            if(!isValidEmail(email)){
                setError(document.getElementById('email') , "Enter Vaild mail");
                vaild = false;
                vaild_email = false;
            }
            else
                setSuccess(document.getElementById('email'))
            
            /* ======================== NAME VALIDATION ========================  */
            if(!isValidName(name)){
                setError(document.getElementById('name') , "no specified characters");
                vaild = false;
            }
            else{
                setSuccess(document.getElementById('name'));
                console.log('valid');
            }
    
            /* ======================== DEPARTMENT SELECTION ======================== */
            if(department_name !== "Select Department"){
                if(stud_level <= 2 && department_name !== "None"){
                    setError(document.getElementById('department') , "Level must be at least 3");
                    vaild = false;
                }
                else if (stud_level >= 3 && (department_name === "None")){
                    setError(document.getElementById('department') , "student must have department");
                    vaild = false;
                }
                else {
                    setSuccess(document.getElementById('department'));
                }
            }
            else{
                setError(document.getElementById('department') , "must choose a choice");
                vaild = false;
            }
            
            /* ======================== CHECK EXISTING VALUES ======================== */

            // Handle ID already exists
            if(vaild_id){
                if (response.id_exists) 
                setError(document.getElementById('id'), "ID already exists");
                else{
                    setSuccess(document.getElementById('id')); 
                }
            }

            // Handle email already exists
            if(vaild_email){
                if (response.email_exists) 
                    setError(document.getElementById('email'), 'Email already exists');
                else
                    setSuccess(document.getElementById('email'));
            }

            // Handle phone number already exists
            if(vaild_phone){
                if (response.phone_exists)
                    setError(document.getElementById('phone'), 'Phone number already exists');
                else
                    setSuccess(document.getElementById('phone'));
            }

            // Proceed with form submission
            if (!response.id_exists && !response.email_exists && !response.phone_exists && vaild) {
                var addUrl = '../add/';  
                fetch(addUrl, {
                    method: 'POST',
                    body: formData
                })
                .finally(() => {
                    window.location.href = addUrl;
                });
            }

        } 
        else {
            console.error('Request failed with status ' + xhr.status);
        }
    };
    xhr.send(formData);

});

/* ================== Error ================== */
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

/* ================== Success ================== */
const setSuccess = (element , message = "") => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const isValidName = name => {
    const ok = /^[\p{L}\s]+$/u;
    return ok.test(name);
}

const isValidPhoneNumber = number => {    
    const pattern = /^0(10|11|12|15)\d{8}$/;
    return pattern.test(number);
}

const isValidEmail = email => {
    const re = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;
    return (re.test(String(email).toLowerCase()));
}

function isVaildID(id) {
    const pattern = /^[0-9]{8}$/;
    return pattern.test(id);
}