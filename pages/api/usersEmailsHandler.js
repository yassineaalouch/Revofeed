import { sendMail } from "@/service/mailService";
import { UsersEmails } from "@/models/usersemail";
import mongooseConnect from "@/lib/mongoose";

const handler = async (req, res) => {
  try {
    const { method } = req;
    await mongooseConnect();
    const toEmail ="revofeed.revofeed@gmail.com"

    if (method === "POST") {
      const {email,company_Name,telephone,subject,message} = req.body;
          await UsersEmails.create({email:email,company_name:company_Name,phone_number:telephone,subject:subject,destination:toEmail,message:message});
          await sendMail(subject,toEmail, message);
          res.status(200).json({ message: "Email sent successfully" });
    } else if (method === "GET") {
      const emails = await UsersEmails.find();
      res.status(200).json(emails);
    } else if (method === "DELETE") { 
        const {id} = req.body;
        if(id){
          const emailDoc = await UsersEmails.deleteOne({_id:id});
          res.json(emailDoc);
        }
    } else if (method === "PUT") { 
      const {id} = req.body;
      if(id){
        const emailDoc = await UsersEmails.updateOne({_id:id},{ $set: { isChecked:true} } );
        res.json(emailDoc);
      }
  }else {
      res.setHeader("Allow", ["POST", "GET","DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    res.status(400).json({
      error_code: "api_one",
      message: err.message,
    });
  }
};

export default handler;
