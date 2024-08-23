import { sendMail } from "@/service/mailService";
import { Email } from "@/models/email";
import mongooseConnect from "@/lib/mongoose";

const handler = async (req, res) => {
  try {
    const { method } = req;
    await mongooseConnect();

    if (method === "POST") {
      const { subject, toEmail, message, forAllOrNO } = req.body;
          await Email.create({ subject,destination: toEmail , message , forAllOrNO});
          await sendMail(subject, toEmail, message);
          res.status(200).json({ message: "Email sent successfully" });
    } else if (method === "GET") {
      const emails = await Email.find();
      res.status(200).json(emails);
    } else if (method === "DELETE") { 
        const {id} = req.body;
        if(id){
          const emailDoc = await Email.deleteOne({_id:id});
          res.json(emailDoc);
        }
    } else {
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
