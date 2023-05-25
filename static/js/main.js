let header = `<div id="header">
<div>
  <ul>
    <li style="float: left;padding: 10px;" id="facultyName"><label>F C A I</label></li>
    <ul>
      <li><a href="about.html">About</a></li>
      <li><a href="login.html">Login</a></li>
      <li><a href="register.html">add</a></li>
      <li><div class="dropdown">
      <button onclick="myFunction()" class="dropbtn">Menu</button>
      <div id="myDropdown" class="dropdown-content">
        <a href="search.html">Search</a>
        <a href="edit.html">Edit</a>
        <a href="select.html">Select</a>
        <a href="show.html">Show</a>
      </div>
    </div></li>
      <li><a  href="home.html">Home</a></li>

    </ul>
</ul></div>`


document.getElementById('header').innerHTML = header;
let footer = `
<div class="footer-basic">  

        <footer>
            <ul class="list-inline">
            <li style="float: left;; "><img src = "../logos/facultyLogo.webp" id="universityLogo"></li>
            <li style="float: left; "><img src = "../logos/universityLogo.webp"  id="facultyLogo"></li>
              <li class="list-inline-item"><a href="home.html">Home</a></li>
              <li class="list-inline-item"><a href="register.html">Add Student</a></li>
                <li class="list-inline-item"><a href="show.html">Show all students</a></li>
                <li class="list-inline-item"><a href="search.html">search/edit</a></li>
                <li class="list-inline-item"><a href="about.html">About</a></li>
            </ul>
            <p class="copyright">Copyright © 2022-2023 Faculty of Computers and Artificial Intelligence 5 Dr. Ahmed Zewail Street, Postal Code: 12613, Orman, Giza, Egypt.</p>
        </footer>
    </div>
`;
document.getElementById('footer').innerHTML = footer;
  

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
