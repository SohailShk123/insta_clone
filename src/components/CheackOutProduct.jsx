import React from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import { useDispatch } from 'react-redux'
import { removeItemFromBasket } from '../redux/slice';


function CheackOutProduct({ id, title, description, price, rating, category, image, hasPrime }) {
    const dispatch = useDispatch();
    const handleRemoveItemFromBasket = () => {
        dispatch(removeItemFromBasket({ id }))
    }
    return (
        <div className='grid grid-cols-5 pl-2'>
            <img src={image} alt="img" height={200} width={200} className='object-contain' />
            {/* middle */}
            <div className='col-span-3 mx-5'>
                <p>{title}</p>
                <div className='flex'>
                    {Array(rating).fill().map((_, i) => (
                        <StarIcon key={i} className='h-5 mt-1 text-yellow-400' />
                    ))}
                </div>
                <p className='text-xs  my-2 line-clamp-3'>{description}</p>
                <p>$ {price}</p>
                {hasPrime ? (
                    <div className='flex items-center space-x-2 mb-1'>
                        <img className='w-12 mix-blend-darken' src="https://tse3.mm.bing.net/th?id=OIP.n6KQFScfaXSo50zVEYeSGAHaHa&pid=Api&P=0" alt="img" />
                        <p className='text-xs text-gray-500'>Free Next-day Delevery</p>
                    </div>) : null}
            </div>
            <div className='flex items-center justify-center mx-auto my-auto'>
                <button className='btn text-xs' onClick={handleRemoveItemFromBasket}>Remove from basket</button>
            </div>
        </div>
    )
}

export default CheackOutProduct