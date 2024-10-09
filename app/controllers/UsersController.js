import {TokenEncode} from "../utility/tokenUtility.js"
import UsersModel from "../model/UsersModel.js"
import SendEmail from "../utility/emailUtility.js";
import usersModel from "../model/UsersModel.js";

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







export const ProfileDetails=async (req,res)=>{

try {
    let user_id=req.headers['user_id']

    let data=await UsersModel.findOne({"_id":user_id})
    return res.json({status:"success","message":"User profile successfilly",data:data})

}
catch (e){
    return res.json({status:"success","message":e.toString()})
}
}






export const ProfileUpdate=async(req,res)=>{

    try {
        let reqBody=req.body
        let user_id=req.headers['user_id']
       const data= await UsersModel.updateOne({"_id":user_id},reqBody)
        return res.json({status:"success","message":"User Update successfilly",data:data})

    }
    catch (e){
        return res.json({status:"success","message":e.toString()})
    }

}





export const EmailVerify=async(req,res)=> {
    try {

        let email = req.params.email;
        let data = await UsersModel.findOne({email: email})
        if (data != null) {
            //send otp to email
            let code = Math.floor(100000 + Math.random() * 900000)
            let EmailTO = data['email']
            let EmailText = "Your code is " + code;
            let EmailSubject = "Task manager Verification code"
            await SendEmail(EmailTO, EmailText, EmailSubject)


            //update otp in user
            await usersModel.updateOne({email: email}, {otp: code})
            return res.json({status: "success", message: "Email successfully"})
        } else {
            return res.json({status: "fail", massage: "user email does not exist"})
        }
    } catch (e) {
        return res.json({status:
        "fail", massage: e.toString()})    }
}






export const CodeVerify=async(req,res)=>{
    try {
        let reqBody=req.body

        //let data=await UsersModel.findOne({email:reqBody['email'],otp:reqBody['otp']})
// ইউজার খোঁজা হচ্ছে (ইমেইলকে lowercase এ কনভার্ট করে মিলানো হচ্ছে)
        let data = await UsersModel.findOne({
            email: reqBody.email.toLowerCase(),
            otp: reqBody.otp.trim()

        });
      

        if (data==null){
            return res.json({status:"fail","message":"wrong verification code"})
        }
        else {
            return res.json({status:"success","message":"verification  successfully"})
        }
    }
    catch (e){
        return res.json({status:"success","message":e.toString()})
    }

    }




export const ResetPassword=async(req,res)=>{
    try {
        let reqBody=req.body;
        let data=await UsersModel.findOne({email: reqBody['email'],otp:reqBody["otp"]})

        if (data==null){
            return res.json({status:"fail","message":"wrong verification code"})
        }
        else {
           let data=await UsersModel.updateOne({email:reqBody['email']},{
                otp:"0", password:reqBody['password'],})

            return res.json({status:"success",message:"password reset successfully",})
       }
    }
    catch (e){
        return res.json({status:"success","message":e.toString()})
    }

}


