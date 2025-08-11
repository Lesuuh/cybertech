import { RiStarSFill, RiStarHalfSFill, RiStarLine } from "react-icons/ri";

interface StarRatingProps {
  rating: number; // e.g. 3.5
  maxStars?: number; // default 5
  size?: number; // icon size, default 24
}

const StarRating = ({ rating, maxStars = 5, size = 24 }: StarRatingProps) => {
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    if (rating >= i) {
      // full star
      stars.push(
        <RiStarSFill key={i} size={size} className="text-yellow-400" />
      );
    } else if (rating >= i - 0.5) {
      // half star
      stars.push(
        <RiStarHalfSFill key={i} size={size} className="text-yellow-400" />
      );
    } else {
      // empty star
      stars.push(
        <RiStarLine key={i} size={size} className="text-yellow-400" />
      );
    }
  }

  return <div className="flex gap-1">{stars}</div>;
};

export default StarRating;
