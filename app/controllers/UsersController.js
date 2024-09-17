import {TokenEncode} from "../utility/tokenUtility.js"
import UsersModel from "../model/UsersModel.js" 

export const Registration=async(req,res)=>{
    try{
        let reqBody=req.body;
        await UsersModel.create(reqBody)
        return res.json({status:"success","message":"User registered successfully"})

    }
    catch(e){
        return res.json({status:"success","message":e.toString()}) 
    }

   
}

export const Login=async(req,res)=>{

    try{
        let reqBody=req.body;
       let data= await UsersModel.findOne(reqBody)

       if(data==null){

        return res.json({status:"success","message":"User not found"})

       }
       else{
        //login success
        let token=TokenEncode(data['email'],data['_id'])
        return res.json({status:"success","message":"User login successfully",data:{token:token}})
       }
       

    }
    catch(e){
        return res.json({status:"success","message":e.toString()}) 
    }

}






export const ProfileDetails=async(req,res)=>{

    return res.json({status:"success"})
}

export const ProfileUpdate=async(req,res)=>{

    return res.json({status:"success"})
}

export const EmailVerify=async(req,res)=>{

    return res.json({status:"success"})
}

export const CodeVerify=async(req,res)=>{

    return res.json({status:"success"})
}

export const ResetPassword=async(req,res)=>{

    return res.json({status:"success"})
}



