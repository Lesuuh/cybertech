const MoreDetails = ({ product }) => {
  return (
    <section className="max-w-[1500px] px-4 md:px-16 lg:px-28 mx-auto w-full my-16 md:my-20">
      <h1 className="text-xl md:text-xl font-semibold text-gray-900 tracking-tight">
        Details
      </h1>
      <div className="rounded-xl ">
        <p className="text-gray-600 leading-relaxed text-sm md:text-lg">
          {product.metadata.details}
        </p>
      </div>

      {/* Detailed Specs */}
      <h2 className="text-sm md:text-xl font-medium text-gray-900 mt-10 tracking-tight border-l-4 border-gray-900 pl-3">
        More Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-800 font-medium bg-white/80 backdrop-blur-sm p-6 rounded-xl">
        {product.metadata.cpuCores && (
          <div className="hover:bg-gray-50 p-3 rounded-lg transition-all duration-200">
            <span className="font-semibold text-gray-900">CPU Cores:</span>{" "}
            {product.metadata.cpuCores}
          </div>
        )}
        {product?.cpuType && (
          <div className="hover:bg-gray-50 p-3 rounded-lg transition-all duration-200">
            <span className="font-semibold text-gray-900">CPU Type:</span>{" "}
            {product?.cpuType}
          </div>
        )}
        {product.metadata.cameraFront && (
          <div className="hover:bg-gray-50 p-3 rounded-lg transition-all duration-200">
            <span className="font-semibold text-gray-900">Front Camera:</span>{" "}
            {product.metadata.cameraFront}
          </div>
        )}
        {product.metadata.cameraBack && (
          <div className="hover:bg-gray-50 p-3 rounded-lg transition-all duration-200">
            <span className="font-semibold text-gray-900">Back Camera:</span>{" "}
            {product.metadata.cameraBack}
          </div>
        )}
        {product.metadata.batteryCapacity && (
          <div className="hover:bg-gray-50 p-3 rounded-lg transition-all duration-200">
            <span className="font-semibold text-gray-900">
              Battery Capacity:
            </span>{" "}
            {product.metadata.batteryCapacity}
          </div>
        )}
        {product.metadata.screenSize && (
          <div className="hover:bg-gray-50 p-3 rounded-lg transition-all duration-200">
            <span className="font-semibold text-gray-900">Screen Size:</span>{" "}
            {product.metadata.screenSize}
          </div>
        )}
        {product.metadata.screenResolution && (
          <div className="hover:bg-gray-50 p-3 rounded-lg transition-all duration-200">
            <span className="font-semibold text-gray-900">
              Screen Resolution:
            </span>{" "}
            {product.metadata.screenResolution}
          </div>
        )}
        {product.metadata.screenRefreshRate && (
          <div className="hover:bg-gray-50 p-3 rounded-lg transition-all duration-200">
            <span className="font-semibold text-gray-900">Refresh Rate:</span>{" "}
            {product.metadata.screenRefreshRate}
          </div>
        )}
        {product.metadata.screenType && (
          <div className="hover:bg-gray-50 p-3 rounded-lg transition-all duration-200">
            <span className="font-semibold text-gray-900">Screen Type:</span>{" "}
            {product.metadata.screenType}
          </div>
        )}
        {product.metadata.pixelDensity && (
          <div className="hover:bg-gray-50 p-3 rounded-lg transition-all duration-200">
            <span className="font-semibold text-gray-900">Pixel Density:</span>{" "}
            {product.metadata.pixelDensity}
          </div>
        )}
        {product.metadata.deliveryDays && (
          <div className="hover:bg-gray-50 p-3 rounded-lg transition-all duration-200">
            <span className="font-semibold text-gray-900">Delivery Days:</span>{" "}
            {product.metadata.deliveryDays} days
          </div>
        )}
        {typeof product.metadata.inStock === "number" && (
          <div className="hover:bg-gray-50 p-3 rounded-lg transition-all duration-200">
            <span className="font-semibold text-gray-900">In Stock:</span>{" "}
            {product.metadata.inStock}
          </div>
        )}
        {product.metadata.guarantee && (
          <div className="hover:bg-gray-50 p-3 rounded-lg transition-all duration-200">
            <span className="font-semibold text-gray-900">Guarantee:</span>{" "}
            {product.metadata.guarantee} year
            {product.metadata.guarantee > 1 ? "s" : ""}
          </div>
        )}
      </div>
    </section>
  );
};

export default MoreDetails;
