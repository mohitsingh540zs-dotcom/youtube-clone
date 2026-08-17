const SkeletonLoader = () => {
  return (
    <div className="p-4 animate-pulse">
      <div className="w-full aspect-video bg-gray-300 rounded-xl"></div>

      <div className="flex gap-3 mt-4">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>

        <div className="flex-1">
          <div className="h-5 w-3/4 bg-gray-300 rounded"></div>

          <div className="h-4 w-1/2 bg-gray-300 rounded mt-3"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
