

export var role1:String;
export var roleType= function(role)
{
    role1 = role;
   
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

