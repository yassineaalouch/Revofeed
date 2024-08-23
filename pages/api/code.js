import { Code } from "@/models/code";
import mongooseConnect from "@/lib/mongoose";

const handler = async (req, res) => {
  try {
    const { method } = req;
    await mongooseConnect();

    if (method === "POST") {
        const {title,code} = req.body;
        await Code.create({title,code});
        res.status(200).json({ message: "Email sent successfully" });

    } else if (method === "GET") {
        const Codes = await Code.find();
        res.status(200).json(Codes);

    } else if (method === "DELETE") { 
        const {id} = req.body;
        if(id){
          const Codes = await Code.deleteOne({_id:id});
          res.json(Codes);
        }
    } else if (method === "PUT") { 
      const {id,title,code} = req.body;
      if(id){
        const Codes = await Code.updateOne({_id:id},{ $set: {title , code} } );
        res.json(Codes);
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
