


const RatingSummaryCard = (ratingList) => {
  
const ratingDistribution = {
  5: ratingList.ratingList.cinque,
  4: ratingList.ratingList.quatre,
  3: ratingList.ratingList.trois,
  2: ratingList.ratingList.deux,
  1: ratingList.ratingList.un,
};
  const totalRatings = Object.values(ratingDistribution).reduce((a, b) => a + b, 0);
  return (
    <div className='border-2 h-full  border-gray-300 rounded-lg bg-white p-6 shadow-lg  mx-auto'>
      <h1 className='text-xl font-semibold text-gray-800 mb-4'>User Ratings</h1>
      
      <div className=''>
        {Object.keys(ratingDistribution).reverse().map((rating) => (
          <div key={rating} className='flex max-w-[95%] items-center'>
            <span className='text-yellow-500 flex'>
              {[...Array(Number(rating))].map((_, i) => (
                <svg key={i} className=' h-5 inline' fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.455L24 9.588l-6 5.857L19.336 24 12 19.765 4.664 24 6 15.445 0 9.588l8.332-1.546z" />
                </svg>
              ))}
              {[...Array(5 - Number(rating))].map((_, i) => (
                <svg key={i} className=' h-5 inline text-gray-300' fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.455L24 9.588l-6 5.857L19.336 24 12 19.765 4.664 24 6 15.445 0 9.588l8.332-1.546z" />
                </svg>
              ))}
            </span>
            <div className='w-full bg-gray-200 rounded-full ml-4'>
              <div
                className='bg-yellow-500 h-2 rounded-full'
                style={{ width: `${(ratingDistribution[rating] / totalRatings) * 100}%` }}
              />
            </div>
            <span className='ml-2 flex gap-6  text-gray-600'>
              <div>
                {ratingDistribution[rating]}
              </div>
              <div>
                ({Math.round((ratingDistribution[rating] / totalRatings) * 100)}%)
              </div>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingSummaryCard;
