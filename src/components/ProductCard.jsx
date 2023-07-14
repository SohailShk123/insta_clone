import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid'
import { useDispatch } from 'react-redux';
import { addToBasket } from '../redux/slice';



const MIN_RATE = 1;
const MAX_RATE = 5;

function ProductCard({ id, category, description, image, price, title }) {

    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATE - MIN_RATE + 1) + MIN_RATE))
    const [hasPrime] = useState(Math.floor(Math.random() < 0.5))
    const dispatch = useDispatch()
    const addItemToBasket=()=>{
        const product = {id, category, description, image, price, title,rating,hasPrime}
        dispatch(addToBasket(product))
    }
    return (
        <div className='relative flex flex-col m-5 bg-white z-30 p-10' >
            <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>
            <div className='flex justify-center'>
                <img src={image} alt="image" height={200} width={200} />
            </div>
            <p className='my-3'>{title}</p>
            <div className='flex'>
                {Array(rating).fill().map((_, i) => (
                    <StarIcon className='h-5 text-yellow-400' key={i} />
                ))}
            </div>
            <p className='text-xs my-2 line-clamp-2'>{description}</p>
            <div className='mb-5'>${price}</div>
            {hasPrime ? (
                <div className='flex items-center space-x-2 -mt-5 mb-1'>
                    <img className='w-12 mix-blend-hard-light' src="https://tse3.mm.bing.net/th?id=OIP.n6KQFScfaXSo50zVEYeSGAHaHa&pid=Api&P=0" alt="img" />
                    <p className='text-xs text-gray-500'>Free Next-day Delevery</p>
                </div>) : null}
            <button onClick={addItemToBasket} className='mt-auto btn'>Add to Basket</button>
        </div>
    )
}

export default ProductCard