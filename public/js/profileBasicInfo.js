
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

    //PUT: /users/:user_id/update?name=name&email=email&phone_number=phone_number&company_name=company_name&key=val	
    // Update user's user_id name, email, phone number, company name

    console.log("in save profile");

    let form = document.getElementById("profile");

    //find values given
    let email = form.email.value;
    let lastName = form.lastName.value;
    let firstName = form.firstName.value;
    let companyName = form.companyName.value;
    let phoneNumber = form.firstName.value;

    //if email is valid
    if(!email || !lastName || !firstName){
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
