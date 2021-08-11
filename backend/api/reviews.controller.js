
import ReviewDAO from "../dao/reviewDAO.js";


export default class ReviewsController {
    static async apiPostReview(req, res, next){
        try{
            const restaurantId = req.body.restaurant_id
            const review = req.body.text
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date()

            const reviewsResponse = await ReviewDAO.addReview(
                restaurantId,
                userInfo,
                review,
                date
            )
            res.json({status: "success"})

        }catch(e){
            res.status(500).json({error:e.message})
        }
    }
    static async apiUpdateReview(req, res, next){
        try{
            const reviewId = req.body.review_id
            const text = req.body.text
            const date = new Date()

            

            const reviewsResponse = await ReviewDAO.updateReview(
                reviewId,
                req.body.user_id,
                text,
                date
            )

            var {error} = reviewsResponse
            if (error) {
                res.status(400).json({error})
            }
            if (reviewsResponse.modifiedCount ===0) {
                throw new Error("Unable to update review. User may not be original poster",)
            }

            res.json({status: "success"})

        }catch(e){
            res.status(500).json({error:e.message})
        }
    }
    static async apiDeleteReview(req, res, next){
        try{
            const reviewId = req.query.id
            const userId= req.body.user_id
            console.log(reviewId);
            const reviewResponse = await ReviewDAO.deleteReview(
                reviewId,
                userId
            )
            res.json({status:"success"})
            
        }catch(e){
            res.status(500).json({error:e.message})
        }
    }
}