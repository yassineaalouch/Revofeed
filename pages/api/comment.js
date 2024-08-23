import mongooseConnect from "@/lib/mongoose";
import { Comments } from "@/models/comments";



export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();
    let listId =[] ;

    async function FindOriginComment(replyTo,listId) {
        const comments = await Comments.findById({_id:replyTo})
        listId.push(comments._id)
        if(comments.isReply===true){
            replyTo = comments.replyTo
            return FindOriginComment(replyTo,listId)
        }else{
            return listId.slice(-3)

        }
    }

    async function saveAllCommentIds(_id, listIdDelete = []) {
        const comment = await Comments.findById(_id);
        if (!comment) {
          return listIdDelete; 
        }
        listIdDelete.push(comment._id);      
        if (comment.repliesList && comment.repliesList.length > 0) {
          for (let i = 0; i < comment.repliesList.length; i++) {
            await saveAllCommentIds(comment.repliesList[i], listIdDelete);
          }
        }
        return listIdDelete;
      }


    if (method === 'GET') {
        const { id } = req.query;
        const comments = await Comments.find({productID:id})
        .populate({
            path: 'repliesList',
            populate: {
                path: 'repliesList',
                populate: {
                    path: 'repliesList',
                    populate: {
                        path: 'repliesList',
                        model: 'Comments'
                    }
                }
            }
        });
        res.json(comments);
    }

    if (method === 'POST') {
        const { name, email,comment, replyTo,productID} = req.body;
        let commentsDoc;
        if (replyTo) {
            commentsDoc = await Comments.create({ name, email,comment, isReply: true, replyTo,productID });
            const _id = await FindOriginComment(replyTo,listId)
            if(_id){    
                await Comments.updateOne(
                    { _id: _id[0] },
                    { $push: { repliesList: commentsDoc._id } }
                );
            }
        } else {
            commentsDoc = await Comments.create({ name ,email , comment,productID});
        }
        res.json(commentsDoc);
    }



    if (method === 'PUT') {
        const { likes, _id } = req.body;
        const commentsDoc = await Comments.updateOne({ _id }, { $set: { likes } });
        res.json(commentsDoc);
    }



    if (method === 'DELETE') {
        const { _id } = req.body;
        let listIdDelete = [];
        const DeleteListIds = await saveAllCommentIds(_id, listIdDelete);
        if (DeleteListIds.length > 0) {
            for (let i = 0; i < DeleteListIds.length; i++) {
                await Comments.deleteOne({ _id: DeleteListIds[i] });
            }
            res.json({ success: true, deletedIds: DeleteListIds });
        } else {
            res.json({ success: false, message: 'No comments found to delete' });
        }
    }
    

}
