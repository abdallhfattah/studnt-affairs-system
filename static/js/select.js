

document.getElementById("ok").addEventListener("click", function() {

    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var department = document.getElementById("department").value;
     xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
      if(xhttp.readyState === 4) {
      if (xhttp.status === 200) {
        alert("Department Selected Successfully");
      }
  }
  }
   const csrfToken = getCookie("csrftoken");
    xhttp.open("POST", "../../select/" + id+"/");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("X-CSRFToken", csrfToken);
    xhttp.send();
    showSuccess();

});
function showSuccess(){
    let studentName = document.getElementById("name").value;
    let department = document.getElementById("department").value;
    let choice = confirm(department + " Department\nHas been selected\nFor student: " + studentName + "\nPress OK if you want to continue or Cancel");
    return choice;
}
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

