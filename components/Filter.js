import { useState } from 'react';

function ProductFilterBar({categories,ImportFilterValues}) {


const [category, setCategory] = useState('');
const [priceRange, setPriceRange] = useState('');
const [rating, setRating] = useState('');
const [sortOrder, setSortOrder] = useState('');


return ( 
<div className=' bg-white border-b-2  border-gray-200 w-screen py-4 px-6 flex items-center justify-between shadow-sm '>
<div className="overflow-auto mr-2 flex lg:justify-center  lg:w-[88%] ">
    
<div className="flex items-center justify-between gap-7 min-w-max ">

    {/* Category Filter */}
    <div className="flex items-center space-x-2">
    <label className="text-gray-600 text-sm">Category:</label>
    <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-800"
    >
            <option value="All">All</option>
            {categories?.length > 0 && categories.map(c=> (
                    <option key={c._id} value={c._id}>{c} </option>
            ))}
    </select>
    </div>

    {/* Price Range Filter */}
    <div className="flex items-center space-x-2">
        <label className="text-gray-600 text-sm">Price :</label>
        <input
            value={priceRange}
            type='range'
            min='0'
            max='10000'
            onChange={(e) => {setPriceRange(e.target.value)}}
            className=""
        />
        <div className='w-9 '>
            ({'<'}{priceRange})
        </div>
    </div>

    {/* Rating Filter */}
    <div className="flex items-center space-x-2">
    <label className="text-gray-600 text-sm">Rating:</label>
    <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-800"
    >
        <option value="">All</option>
        <option value="4">4 stars & up</option>
        <option value="3">3 stars & up</option>
        <option value="2">2 stars & up</option>
        <option value="1">1 star & up</option>
    </select>
    </div>

    {/* Sort By Filter */}
    <div className="flex items-center space-x-2">
    <label className="text-gray-600 text-sm">Sort By:</label>
    <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-800"
    >
        <option value="">Relevance</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Highest Rating</option>
        <option value="newest">Newest Arrivals</option>
    </select>
    </div>
</div>

    </div>


    {/* Filter Button */}
    <button
    onClick={() => {ImportFilterValues({priceRange,category,sortOrder,rating})}}
    className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition duration-150"
    >
    Apply Filters
    </button>
</div>
  );
}

export default ProductFilterBar;
