
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Ratings } from "@/models/rating";

export default async function handle(req, res) {

          const { method } = req;
          await mongooseConnect();
          let list = [];
      
          async function listOfRating(_id) {
              const response = await Ratings.find({ productID: _id });
              list = response.map(ele => ele.rating);
           

              const ratingDistribution = {
                  cinque: list.filter(item => item === 5).length,
                  quatre: list.filter(item => item === 4).length,
                  trois: list.filter(item => item === 3).length,
                  deux: list.filter(item => item === 2).length,
                  un: list.filter(item => item === 1).length,
              };
              return ratingDistribution;
          }
      
          function TotalRatingCalculator(object) {
            const sommeRating = object.un * 1 + object.deux * 2 + object.trois * 3 + object.quatre * 4 + object.cinque * 5;
            const numberRating = object.un + object.deux + object.trois + object.quatre + object.cinque;
            if (sommeRating === 0) {
                return  0;
            }
            const averageRating = sommeRating / numberRating;
                return averageRating ;
            }


          if (method === 'GET') {
              if (req.query?.id) {
                  if(req.query?.limit){
                      
                      const doc = await Ratings.find({ productID: req.query?.id , rating:5 }).limit(req.query?.limit)
                      res.json(doc);
                  }else{
                      const ratingDoc = await Product.findById({ _id: req.query?.id });
                      res.json(ratingDoc?.ratingDistribution? ratingDoc?.ratingDistribution: {});
                  }
              } else {
                  res.json(await Ratings.find());
              }
          }
      
          if (method === 'POST') {
              const { name, email, rating, customerReview,IdOfRatingUsers, _id } = req.body;

              const newRating = await Ratings.create({
                  name,
                  email,
                  rating,
                  customerReview,
                  productID: _id,
              });
              
              const ratingDistribution = await listOfRating(_id);
              const ratingProduct = TotalRatingCalculator(ratingDistribution)

              await Product.updateOne({ _id }, { $set: { IdOfRatingUsers: IdOfRatingUsers,ratingDistribution: ratingDistribution,rating:ratingProduct } });
                const product = Product.findById({_id})

      
      
              res.json(newRating);
          }
      
          if (method === 'PUT') {
              const { email, customerReview,rating, _id } = req.body;
              const updatedRating = await Ratings.updateOne({ email,productID:_id }, { $set: { rating,customerReview} });
      
              const ratingDistribution = await listOfRating(_id);
              const ratingProduct = TotalRatingCalculator(ratingDistribution)
              await Product.updateOne({ _id }, { $set: { ratingDistribution: ratingDistribution,rating:ratingProduct  } });
              const product = Product.findById({_id})
              res.json(updatedRating);
          }
      
          if (method === 'DELETE') {
              const { _id } = req.body;
              const deletedRating = await Ratings.deleteOne({ _id });
              res.json(deletedRating);
          }
}

