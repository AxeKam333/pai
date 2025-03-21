function onsubmit () {
    //przegląda wszystkie elementy i ew ustawia na czerwono które trzeba
    //dodaje div.danger z opisem błędów .class errors
    const x = document.forms["frm1"];
    let text = "";
    for (let i = 0; i < x.length; i++) {
    text += x.elements[i].value + "<br>";
    }
    document.getElementById("demo").innerHTML = text; 
}
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
        regex = RegExp("(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}");
    }
    else if (input_name == "opis") {
        regex = RegExp("[.]{0,100}");
    }

    // console.log(value, value.match(regex));
    if (!value.match(regex)) {
        input.classList.add("danger");
        span.classList.add("danger");
    }
}
function editing (elem) {
    var input = document.getElementById(elem);
    input.classList.remove("danger");
    var span = document.querySelector("span."+elem);
    span.classList.remove("danger");
}