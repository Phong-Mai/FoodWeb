import React from 'react'
import {topPicks} from '../data/data'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useDispatch } from 'react-redux';
import { addToCart, getTotals } from '../features/cart/cartSlice';

const TopPicks = () => {
    const dispatch = useDispatch()
    const handleAddToCart =(item,e) => {
        e.preventDefault()
        dispatch(addToCart(item))
        dispatch(getTotals())
    }
  return (
    <div>
    <h1 className='text-orange-500 font-bold text-2xl text-center py-2'>
        Top Picks
    </h1>
    <div className='hidden lg:flex max-w-full m-auto py-2 px-2'>
        <Splide options={{perPage: 4, gap :"0.5rem", grag :"free", arrows: false }}>
        {
            topPicks.map((item) => {
                return(
                    <SplideSlide key={item.id}>
                    <div className=' rounded-3xl relative'>
                        <div className='absolute w-full h-full bg-black/50 rounded-3xl text-white'>
                            <p className='px-2 font-bold pt-4 text-2xl '>{item.title}</p>
                            <p className='px-2'>${item.price}</p>
                            <button 
                            className='border-dotted border-white text-white mx-2 absolute bottom-4'
                            onClick={(e)=>handleAddToCart(item,e)}
                            >Add To Cart</button>
                        </div>
                        <img className='h-[200px] w-full object-cover rounded-3xl cursor-pointer hover:scale-105 ease-out duration-300' 
                        src={item.image}
                        alt={item.title}
                        />
                    </div>
                    </SplideSlide>
                )
            })
        }
        </Splide>
    </div>
    </div>
  )
}

export default TopPicks