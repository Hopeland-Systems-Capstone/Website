
function update(){
    console.log("page load");
    load_profile();
    clear_message();
}

async function get_profile(){

    // GET	/users/:user_id?key=val	
    // Return user information given user_id

    //Get's the user's token from their browser
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
    
    //Create the query to get a user's email (in the backend README)
    query = '/users/:user_id?key=9178ea6e1bfb55f9a26edbb1f292e82d';

    //Pass the query and user's token into the /data route
    const response = await fetch('/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, query })
    });

    //Return the response from the /data route, which should be the email of the user
    return await response.json();

}

function load_profile(){
    const givenJson = get_profile();
    let profile = JSON.parse(givenJson);

    let form = document.getElementById("profile");

    let email = document.getElementById("email");
    let last_name = document.getElementById("lastName");
    let first_name = document.getElementById("firstName");
    let company = document.getElementById("companyName");
    let phone = document.getElementById("phoneNumber");

    let full_name = profile.name.split(" ",2);

    email.value = profile.email;
    first_name.value = full_name[0];
    if(!(full_name[1] == undefined)){
       last_name.value = full_name[1]; 
    }
    company.value = profile.company_name;
    phone.value = profile.phoneNumber;
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
