console.log("user-middleware");

const UserMiddleware = {
    validate:(joiUserSchema)=>{
        return (req,res,next)=>{
            const {error} = joiUserSchema.validate(req.body,{abortEarly:false});
            if(error){
                return res.status(400).send({
                    success:false,
                    messgae:"Validation error",
                    deatils:error.details.map(err=>err.message)
                })
            }
            next();
        }
    },
    
    checkRole:(req,res,next)=>{
          if(req.body.role == "ADMIN"){
            return res.status(400).send({
                message:"You are not allowed to register as admin"
            })
          } 
          next();
    }
    
}

module.exports = UserMiddleware;