const apiError=require('../utils/apiError')

const authorizeRoles=(...allowedRoles)=>{
    return (req,res,next)=>{
        if(!allowedRoles.includes(req.user.role)){
            throw new apiError(403,"Access forbidden:insufficient permissions")
        }
        next()
    }
}
module.exports=authorizeRoles
//...allowedRoles is an array which holds the role value, if user is loggedin and try to add book , so in if block condition checks => admin.includes(user) which is false and it turn into true so error throws.