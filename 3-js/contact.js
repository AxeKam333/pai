let myform = document.getElementById("myForm");
myform.addEventListener("submit", function(event){
    event.preventDefault();
    console.log("Form submitted!",event);

    let text = "";
    let elements = event.target.elements;
    let errors = [];

    for (let i = 0; i < elements.length; i++) {
        text += elements[i].type=="submit"
        ||elements[i].type=="password" 
        ? "" : elements[i].value + "<br>";

        if (elements[i].name!="" && !validate(elements[i].name)){
            errors.push(elements[i].name)
        }
    }
    let errout = document.getElementById("errors"); 
    let reqout = document.getElementById("request");
    if (errors.length>0){
        console.log("Errors: ",errors);
        errout.innerHTML = "Errors: "+ errors.map((e)=>"uzupelnij "+e+" ")   ; 
        reqout.classList.add("none");
        errout.classList.add("danger");
        errout.classList.remove("none");
    }
    else {
        reqout.innerHTML = text; 
        reqout.classList.remove("none");
        errout.classList.remove("danger");
        errout.classList.add("none");
    }
})
function validate (input_name) {
    var input = document.getElementById(input_name);
    var span = document.querySelector("span."+input_name);
    var value = input.value;
    var regex = RegExp("^.+$");
    if (input_name == "imie"){
        regex = RegExp("^[A-Z][a-z]* +[A-Z][a-z]* *$");
    }
    else if (input_name == "email"){
        regex = RegExp(
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }
    else if (input_name == "date"){
        regex = RegExp("^.+$");
    }
    else if (input_name == "password"||input_name == "r-password") {
        regex = RegExp("(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9/{/}/(/);:\"'!@#$%^&*]{6,16}");
    }
    else if (input_name == "opis") {
        regex = RegExp("^(.){0,100}$");
    }

    console.log(value, value.match(regex));
    if (!value.match(regex)) {
        input.classList.add("danger");
        span.classList.add("danger");
        return false;
    }
    return true;
}
function editing (elem) {
    const input = document.getElementById(elem);
    input.classList.remove("danger");
    const span = document.querySelector("span."+elem);
    span.classList.remove("danger");
}

function refreshTableOnClick(){
    const table = document.getElementById("table");
if (table != null) {
    for (var i = 1; i < table.rows.length -1; i++) {
        for (var j = 0; j < table.rows[i].cells.length-1; j++)
        table.rows[i].cells[j].onclick = function () {
            handleEdit(this);
            console.log(this);
        };
        table.rows[i].cells[table.rows[i].cells.length -1].onclick = function () {
            handleDelete(this);
            console.log("DELETE",this);
        };
    }
    table.rows[table.rows.length-1].cells[0].onclick = function () {
        handleAdd(this);
    }
    table.rows[table.rows.length-1].cells[1].onclick = function () {
        handleAdd(this);
    }
}
}

function refreshRowColors() {
    const rows = document.querySelectorAll("#table tbody tr");
    console.log(rows);
    
    rows.forEach((row, index) => {
        row.classList.remove("odd", "even");
        row.classList.add(index % 2 === 1 ? "even" : "odd");
    });
}

function handleEdit(tableCell) {
    // alert(tableCell.parentElement.innerHTML);
    // tableCell.innerHTML = '<textarea class="opis">'+tableCell.innerHTML+'</textarea>'
    // tableCell.
    const row = tableCell.parentElement;
    if (!row.classList.contains("edit")){
        row.classList.add("edit");
        row.cells[0].setAttribute("contenteditable","true");
        row.cells[1].setAttribute("contenteditable","true");
        row.cells[2].innerHTML = 'save';
    }
}
function handleDelete(tableCell) {
    const row = tableCell.parentElement;
    if(row.classList.contains("edit")){
        row.cells[0].setAttribute("contenteditable","false");
        row.cells[1].setAttribute("contenteditable","false");
        row.cells[2].innerHTML = 'del';

        row.classList.remove("edit");
        refreshRowColors();

    } else {
        row.remove();
        refreshRowColors();
    }
}
function handleAdd(tableCell) {
    const table = document.getElementById("table");
    const newRow = table.insertRow(1);
    newRow.innerHTML = '<td contenteditable="true"></td><td contenteditable="true"></td><td>save</td>';
    newRow.classList.add("edit");
    refreshRowColors();
    refreshTableOnClick();
}

refreshTableOnClick()