import { Progress } from "@/components/ui/progress";
import StarRating from "./StarRatings";
import { Input } from "@/components/ui/input";
import { reviews, users } from "@/app/data/data";

const Reviews = ({ productId }: { productId: number }) => {
  const ratingLevels = [
    { label: "Excellent", value: 100, progress: 100 },
    { label: "Good", value: 80, progress: 80 },
    { label: "Average", value: 60, progress: 60 },
    { label: "Below Average", value: 40, progress: 40 },
    { label: "Poor", value: 20, progress: 20 },
  ];

  const getProductReviews = (productId: number) => {
    const productReviews = reviews.filter(
      (review) => review.productId === productId
    );

    return productReviews.map((review) => {
      const user = users.find((user) => user.id === review.userId);
      return {
        ...review,
        username: user ? user.name : "User",
        avatar: user
          ? user.avatar
          : "https://randomuser.me/api/portraits/men/2.jpg",
      };
    });
  };

  const productReviews = getProductReviews(productId);
  const totalProductReview = productReviews.length;

  const getAverageRating = (productId: number) => {
    if (totalProductReview === 0) return 0;
    const total = productReviews.reduce((sum, r) => sum + r.rating, 0);
    return total / totalProductReview;
  };

  return (
    <div className="mt-10 px-4 sm:px-6 md:px-10 lg:px-20 w-full max-w-[1500px] mx-auto rounded-sm">
      <h2 className="mb-10 text-xl font-semibold">Reviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 w-full">
        {/* Left section */}
        <div className="col-span-1 flex w-full flex-col items-center justify-center space-y-2 p-6 rounded-sm bg-gray-50 border border-gray-300">
          <h1 className="text-5xl font-extrabold">
            {getAverageRating(productId).toFixed(1)}
          </h1>
          <span className="text-gray-600 text-sm">
            of {totalProductReview} reviews
          </span>
          <StarRating rating={getAverageRating(productId)} />
        </div>

        {/* Right section */}
        <div className="col-span-3 hidden md:flex flex-col justify-center space-y-4 p-6">
          {ratingLevels.map((rate, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <p className="w-28 text-gray-700 font-medium">{rate.label}</p>
              <Progress value={rate.progress} className="flex-1 h-3 rounded" />
              <p className="w-14 text-right text-gray-600 font-semibold">
                {rate.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-16">
        <Input
          placeholder="Leave a comment..."
          className="py-6 md:py-8 px-4 w-full"
        />
      </div>

      <div className="mt-10 space-y-8 max-w-full">
        {productReviews.map((rev) => (
          <div
            key={rev.id}
            className="flex gap-4 items-start border-b border-gray-200 pb-4"
          >
            <img
              src={rev.avatar}
              alt={rev.username}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold">{rev.username}</p>
              <StarRating rating={rev.rating} size={16} maxStars={5} />
              <p className="mt-1 text-gray-700">{rev.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
