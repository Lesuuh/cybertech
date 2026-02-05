"use client";

import StarRating from "./StarRatings";
import { Input } from "@/components/ui/input";
import { reviews, users } from "@/app/data/data";

const Reviews = ({ productId }: { productId: number }) => {
  const getProductReviews = (productId: number) => {
    const productReviews = reviews.filter(
      (review) => review.productId === productId,
    );

    return productReviews.map((review) => {
      const user = users.find((user) => user.id === review.userId);
      return {
        ...review,
        username: user ? user.name : "Guest User",
        avatar: user ? user.avatar : "/placeholder-avatar.jpg",
      };
    });
  };

  const productReviews = getProductReviews(productId);
  const totalReviews = productReviews.length;

  const averageRating =
    totalReviews === 0
      ? 0
      : productReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

  return (
    <section className="mt-20 w-full max-w-[1400px] mx-auto px-6 md:px-12">
      {/* Header with the score */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-10 mb-12 gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Customer Reviews
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {totalReviews} people have rated this product
          </p>
        </div>

        <div className="flex items-center gap-6 bg-white px-8 py-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-900">
              {averageRating.toFixed(1)}
            </p>
            <p className="text-[10px] text-gray-400 uppercase font-medium">
              Rating
            </p>
          </div>
          <div className="h-8 w-px bg-gray-200" />
          <div>
            <StarRating rating={averageRating} size={18} />
            <p className="text-[10px] text-gray-400 uppercase font-medium mt-1">
              Average Score
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar: Write a review */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-900">
              Share your thoughts
            </p>
            <Input
              placeholder="Write a comment..."
              className="h-14 rounded-xl border-gray-200 bg-gray-50/50 px-4 text-sm focus:bg-white transition-all"
            />
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Let others know what you think about this product. Your review helps
            other shoppers make the right choice.
          </p>
        </div>

        {/* The List of Reviews */}
        <div className="lg:col-span-8 space-y-10">
          {productReviews.length > 0 ? (
            productReviews.map((rev) => (
              <div
                key={rev.id}
                className="group flex gap-6 items-start pb-10 border-b border-gray-50 last:border-0"
              >
                <div className="shrink-0">
                  <img
                    src={rev.avatar}
                    alt={rev.username}
                    className="w-12 h-12 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-bold text-gray-900 uppercase tracking-tight">
                      {rev.username}
                    </p>
                    <StarRating rating={rev.rating} size={12} />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {rev.comment}
                  </p>
                  <div className="mt-4">
                    <p className="text-[10px] text-gray-300 uppercase font-medium tracking-wider">
                      Posted on {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">
              No reviews yet. Be the first to write one!
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
