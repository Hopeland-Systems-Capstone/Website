function update(){
    console.log("page load");
    //called when you load page
    
}

function display_current_time(){

    //restful call to get current time

    //GET	/users/:user_id/timezone	
    //Get timezone for a user

}

function change_time_zone(){

    // restful call to set timezone from user
    // PUT: /users/:user_id/timezone/:timezone?key=val

}

function change_DST(){

}

function save_changes(){

    change_DST();
    change_time_zone();
}