

export var role1:String;
export var email1:String;
export var userId:String;
export var roleType= function(role)
{
    role1 = role;
   
}

export var setEmail = function (email)
{
    email1= email;
}
export var showNav= function()
{
    if (role1 === "Admin" || role1 === "admin" )
    {
        return true;
    }else
    {
        return false;
    }
}

export var setId = function(id)
{
    userId = id;
}
//this.module.exports; 

