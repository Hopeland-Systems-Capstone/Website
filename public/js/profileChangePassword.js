function update(){
    clear_message();
}

//needs to be tested
async function update_password(){

    let old_pass = document.getElementById("old_password").value;
    let new_pass = document.getElementById("new_password").value;
    let confirmation = document.getElementById("confirmation").value;

    if(!old_pass || !new_pass || !confirmation){
        alert();
        error_message();
        return;
    }
    else if(!(new_pass === confirmation)){
        alert("New Password does not match Confirm New Password")
        error_message();
        return;
    }

    //Get's the user's token from their browser
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

    // PUT: /users/:user_id/password?key=val&new=new_password&old=old_password	
    // Update password for user
    query = '/users/:user_id/password?key=9178ea6e1bfb55f9a26edbb1f292e82d&new='
            + new_pass + '&old=' + old_pass;

    //Pass the query and user's token into the /data route
    const response = await fetch('/data', {
        method: 'PUT', //or post
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, query })
    });
    
    save_message();
    //Return the response from the /data route, which should be the email of the user
    return await response.json();
}

function error_message(){
    let element = document.getElementById("message");
    element.innerText = "Unable to Update"
}

function save_message(){
    let element = document.getElementById("message");
    element.innerText = "Updated"
}

function clear_message(){
    let element = document.getElementById("message");
    element.innerText = ""
}