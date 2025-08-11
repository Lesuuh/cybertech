import StarRating from "./StarRatings";

const Reviews = () => {
  return (
    <div className="mt-10 bg-gray-50 p-10 rounded-sm">
      <h2 className="mb-10 text-xl">Reviews</h2>

      <div>
        <div>
          <h1>4.8</h1>
          <span>of 125 reviews</span>
          <StarRating rating={3.5} />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
