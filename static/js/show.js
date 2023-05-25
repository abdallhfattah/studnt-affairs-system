

//Check all button
function checkAll() {
    let checkBoxes = ["ID", "Name", "GPA", "Level", "Department", "Date Of Birth", "Gender", "Status", "Email", "Mobile Number"];
    let isAllChecked = true;

    for (let i = 0; i < checkBoxes.length; i++) {
        if (!document.getElementById(checkBoxes[i]).checked) {
            isAllChecked = false;
            break;
        }
    }
    if (isAllChecked) {
        for (let i = 0; i < checkBoxes.length; i++) {
            document.getElementById(checkBoxes[i]).checked = false;
        }
        alert("Uncheck all");
    } else {
        for (let i = 0; i < checkBoxes.length; i++) {
            document.getElementById(checkBoxes[i]).checked = true;
        }
        alert("check all");

    }
}

function applyFilters() {
    let checkBoxes = ["ID", "Name", "GPA", "Level", "Department", "Date Of Birth", "Gender", "Status", "Email", "Mobile Number"];
    for (let i = 0; i < checkBoxes.length; i++) {
        let childs = document.getElementsByClassName(checkBoxes[i]);
        if (!(document.getElementById(checkBoxes[i]).checked)) {
            for (let j = 0; j < childs.length; j++) {
                childs[j].classList.add("hidden");
            }
        } else {
            for (let j = 0; j < childs.length; j++) {
                childs[j].classList.remove("hidden");
            }
        }
    }
    alert("The table will be filterized")
}

// function loadTableData() {
//
//     var tableBody = document.getElementById("students_table").getElementsByTagName("tbody")[0];
//     tableBody.innerHTML = "";
//
//     for ( var i = 0; i < localStorage.length; i++) {
//        var key = localStorage.key(i);
//     //    console.log(key);
//        var stored_student = JSON.parse(localStorage.getItem(key));
//        var x=stored_student.student_id;
//     //    alert(stored_student.student_id);
//
//       if(stored_student.student_stat=="act"){
//         tableBody.innerHTML+=
//       `<tr>
//           <td class = "ID">${stored_student.student_id}</td>
//           <td class = "Name">${stored_student.student_name}</td>
//           <td class = "GPA">${stored_student. student_gpa}</td>
//           <td class = "Level">${stored_student.student_lvl}</td>
//           <td class = "Department">${stored_student.student_dep}</td>
//           <td class = "Date Of Birth">${stored_student.student_dob}</td>
//           <td class = "Gender">${stored_student.student_gender}</td>
//           <td class = "Status"><label class="toggle">
//           <input class="toggle-checkbox" type="checkbox" checked onclick="switchh(event)">
//           <div class="toggle-switch"></div>
//           <span class="toggle-label"></span>
//         </label></td>
//           <td class = "Email">${stored_student.student_email}</td>
//           <td class = "Mobile Number">${stored_student.student_num}</td></tr>`;
//
//
//       }else{
//         tableBody.innerHTML+=
//       `<tr>
//           <td class = "ID">${stored_student.student_id}</td>
//           <td class = "Name">${stored_student.student_name}</td>
//           <td class = "GPA">${stored_student. student_gpa}</td>
//           <td class = "Level">${stored_student.student_lvl}</td>
//           <td class = "Department">${stored_student.student_dep}</td>
//           <td class = "Date Of Birth">${stored_student.student_dob}</td>
//           <td class = "Gender">${stored_student.student_gender}</td>
//           <td class = "Status"><label class="toggle">
//           <input class="toggle-checkbox" type="checkbox" student_id='stored_student.student_id' onchange="switchh2(event)">
//           <div class="toggle-switch"></div>
//           <span class="toggle-label"></span>
//         </label></td>
//           <td class = "Email">${stored_student.student_email}</td>
//           <td class = "Mobile Number">${stored_student.student_num}</td></tr>`;
//
//       }
//
//
//     }
//     window.onload=loadTableData;
//
//   }
  // function switchh(event) {
  //   var row = event.target.parentNode.parentNode.parentNode;
  //   var id = row.querySelector(".ID").textContent;
  //   var stored_student = JSON.parse(localStorage.getItem(id));
  //   if (event.target.checked) {
  //       stored_student.student_stat = "act";
  //       let choice = confirm( "For student: " + stored_student.student_name + "\n"+"his Status has changed from inactive to active");
  //
  //   } else {
  //       stored_student.student_stat = "inact";
  //       let choice = confirm( "For student: " + stored_student.student_name + "\n"+"his Status has changed from active to inactive");
  //
  //   }
  //   localStorage.setItem(id, JSON.stringify(stored_student));
  //   return choice;
  //   }
  //   function switchh2(event) {
  //       var row = event.target.parentNode.parentNode.parentNode;
  //       var id = row.querySelector(".ID").textContent;
  //       var stored_student = JSON.parse(localStorage.getItem(id));
  //       if (event.target.checked) {
  //           stored_student.student_stat = "act";
  //           let choice = confirm( "For student: " + stored_student.student_name + "\n"+"his Status has changed from inactive to active");
  //
  //       } else {
  //           stored_student.student_stat = "inact";
  //           let choice = confirm( "For student: " + stored_student.student_name + "\n"+"his Status has changed from active to inactive");
  //       }
  //       localStorage.setItem(id, JSON.stringify(stored_student));
  //       return choice;
  //   }
  //
  // window.onload=loadTableData;
function Changestatus(id) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200) {
        alert("Student status updated successfully");
      } else {
        alert("Failed to update student status");
      }
    }
  };

  const csrfToken = getCookie("csrftoken");
  xhttp.open("PATCH", "../deactivate/" + id);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.setRequestHeader("X-CSRFToken", csrfToken);
  xhttp.send();
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}