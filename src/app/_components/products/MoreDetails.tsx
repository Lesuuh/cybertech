import { Product } from "@/app/types";

const MoreDetails = ({ product }: { product: Product }) => {
  return (
    <div className="mt-10 bg-gray-50 p-10 rounded-sm">
      <h1 className="text-xl mb-5">Details</h1>
      <div>
        <p className="text-gray-600 leading-relaxed">{product.details}</p>
      </div>

      {/* Detailed Specs */}
      <h2 className="text-xl underline  mt-10 mb-6">More details:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 font-medium">
        {product.cpuCores && (
          <div>
            <span className="font-semibold">CPU Cores:</span> {product.cpuCores}
          </div>
        )}
        {product?.cpuType && (
          <div>
            <span className="font-semibold">CPU Type:</span> {product?.cpuType}
          </div>
        )}
        {product.cameraFront && (
          <div>
            <span className="font-semibold">Front Camera:</span>{" "}
            {product.cameraFront}
          </div>
        )}
        {product.cameraBack && (
          <div>
            <span className="font-semibold">Back Camera:</span>{" "}
            {product.cameraBack}
          </div>
        )}
        {product.batteryCapacity && (
          <div>
            <span className="font-semibold">Battery Capacity:</span>{" "}
            {product.batteryCapacity}
          </div>
        )}
        {product.screenSize && (
          <div>
            <span className="font-semibold">Screen Size:</span>{" "}
            {product.screenSize}
          </div>
        )}
        {product.screenResolution && (
          <div>
            <span className="font-semibold">Screen Resolution:</span>{" "}
            {product.screenResolution}
          </div>
        )}
        {product.screenRefreshRate && (
          <div>
            <span className="font-semibold">Refresh Rate:</span>{" "}
            {product.screenRefreshRate}
          </div>
        )}
        {product.screenType && (
          <div>
            <span className="font-semibold">Screen Type:</span>{" "}
            {product.screenType}
          </div>
        )}
        {product.pixelDensity && (
          <div>
            <span className="font-semibold">Pixel Density:</span>{" "}
            {product.pixelDensity}
          </div>
        )}
        {product.deliveryDays && (
          <div>
            <span className="font-semibold">Delivery Days:</span>{" "}
            {product.deliveryDays} days
          </div>
        )}
        {typeof product.inStock === "number" && (
          <div>
            <span className="font-semibold">In Stock:</span> {product.inStock}
          </div>
        )}
        {product.guarantee && (
          <div>
            <span className="font-semibold">Guarantee:</span>{" "}
            {product.guarantee} year{product.guarantee > 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoreDetails;
