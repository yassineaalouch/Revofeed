import { Question_Answer } from "@/models/Question_Answer";
import mongooseConnect from "@/lib/mongoose";

const handler = async (req, res) => {
  try {
    const { method } = req;
    await mongooseConnect();
    const toEmail ="revofeed.revofeed@gmail.com" 
    if (method === "POST") {
      const {question,answer} = req.body;
          if(answer===null){
            await Question_Answer.create({question,answer});
            res.status(200).json({ message: "Email sent successfully" });

          }else{
             await Question_Answer.create({question,answer: answer||nul,isAnswered:true})
             res.status(200).json({ message: "Email sent successfully" });

          }
         
    } else if (method === "GET") {
      const emails = await Question_Answer.find();
      res.status(200).json(emails);
    } else if (method === "DELETE") { 
        const {id} = req.body;
        if(id){
          const Question_AnswerDoc = await Question_Answer.deleteOne({_id:id});
          res.json(Question_AnswerDoc);
        }
    } else if (method === "PUT") { 
      const {id,answer} = req.body;
      if(id){
        const Question_AnswerDoc = await Question_Answer.updateOne({_id:id},{ $set: { answer:answer ,isAnswered:true} } );
        res.json(Question_AnswerDoc);
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
