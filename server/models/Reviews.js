import mongoose from 'mongoose';

const ReviewsSchema = mongoose.Schema({
    user_id: mongoose.Types.ObjectId,
    review: String,
    rating: Number,
})

export default mongoose.model('Review' , ReviewsSchema);