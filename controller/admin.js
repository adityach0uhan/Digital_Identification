

 module.exports=verifyLogin=async(req,res)=>{
    const adminIdInput=req.body.adminId
    const adminPassword=req.body.adminPassword
    const admin_ID=await adminData.find({})
    admin_ID.forEach((x)=>{
        try{
            if( adminIdInput===x.adminId && adminPassword ===x.adminPassword){

                try{
                    const alluser= UserData.find({})
                    res.render("../views/allUserDetail.ejs",{alluser})
                }
                catch{

                    res.send("not found")
                }
                    
            }
            else{
                res.send("wrong information")
            }
        }
        catch{
            res.send(" wrong credentials")
        }
        
    }) 
}


module.exports=verifyLogin;