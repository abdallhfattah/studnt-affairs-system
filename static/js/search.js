let index  = 0;


function selectDepartment(){
  if(document.getElementsByClassName("active-row")[index-1] == undefined){
    alert("ERROR:\nPlease select a student first");
    return false;
  }
  let selected = document.getElementsByClassName("active-row")[index-1];
  let selectedStudentLevel = selected.childNodes[7].innerHTML;
  if(Number(selectedStudentLevel) == 2 || Number(selectedStudentLevel) == 1){
    alert("ERROR:\nPlease select a student with level higher than 3");
    return false;
  }else{
    val = Number( document.getElementsByClassName("active-row")[index-1].getElementsByClassName("ID")[0].textContent ) ;
    window.location.href = `../select/${val}`;
    return true;
  }
}


function mysearchfun(){
let input=document.getElementById("myinput");
let filter= input.value.toUpperCase();
let table_row=document.getElementsByTagName("tr");
var td, theValue;
for(let i=0 ; i<table_row.length; i++){
    td = table_row[i].getElementsByTagName("td")[1];
    if (td) {
      theValue = td.textContent;
      if (theValue.toUpperCase().indexOf(filter) > -1) {
        table_row[i].style.display = "";
        index=i;
      } else {
        table_row[i].style.display = "none";
      }
    }
  }

}

function editOrDelete(){
  if(document.getElementsByClassName("active-row")[index-1] == undefined){
    alert("ERROR:\nPlease select a student first");
    return false;
  }
  else{
    val = Number( document.getElementsByClassName("active-row")[index-1].getElementsByClassName("ID")[0].textContent ) ;
    window.location.href = `../edit/${val}`;
  }
  return true;
}