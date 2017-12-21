
//function findselected() {
    var result = $("#weight").value;
    console.log(result);
    if(result > 100){
        document.getElementById("ItemClassDropdown").options[1].disabled = true;
    }
//}
