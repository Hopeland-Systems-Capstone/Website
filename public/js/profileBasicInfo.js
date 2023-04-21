
function update(){
    console.log("page load");

    //called when you load page

    load_profile();
    clear_message();
}

function get_profile(){

}

function load_profile(){

    // get email
    // restful call /users/:user_id/email?key=val

    //GET
    /*
    const userAction = async () => {
        const response = await fetch('');
        const myJson = await response.json(); //extract JSON from the http response
        // do something with myJson
    }
    //*/


    // get last name
    // restful call

    // get first Name
    // restful call

    // get company
    // restful call

    // get phone num
    // restful call

}

function save_profile(){

    console.log("in save profile");

    let form = document.getElementById("profile");

    //find values given
    let email = form.email.value;
    let lastName = form.lastName.value;
    let firstName = form.firstName.value;
    let companyName = form.companyName.value;
    let phoneNumber = form.firstName.value;

    //if email is valid
    if(email){
        //call post to email

    }else{
        alert("Missing input in required section");
        error_message();
        return;
    } 

    if(lastName){
        //call post to last name

    }else{
        alert("Missing input in required section");
        error_message();
        return;
    } 

    if(firstName){
        //call post to first name

    }else{
        alert("Missing input in required section");
        error_message();
        return;
    } 

    //if company name was given
    if(companyName){ // should check for illegal characters
        //post email
        //restful call
    }

    if(phoneNumber){ // check for only nums

    }else{
        alert("Incorrect characters in Phone Number");
        error_message();
        return;
    }

}

function error_message(){
    let element = document.getElementById("message");
    element.innerText = "Unable to Save"
}

function save_message(){
    let element = document.getElementById("message");
    element.innerText = "Saved"
}

function clear_message(){
    let element = document.getElementById("message");
    element.innerText = ""
}
