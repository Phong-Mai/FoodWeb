import React, { useEffect, useState } from 'react'
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { mealData } from '../data/data'
import {  addToCart, clearCart, decreaseCart, getTotals, selectCartItems, selectcartTotalAmount } from '../features/cart/cartSlice';
const Cart = ({setIsShowCart}) => {
  const dispatch = useDispatch()
    const cart = useSelector(selectCartItems);
    const cartTotalAmount = useSelector(selectcartTotalAmount)
    useEffect(() => {
      dispatch(getTotals())
  },[cart, dispatch])
  const handleRemoveCart = () =>{
    dispatch(clearCart());
  }
  const handleDecrease =(item) => {
    dispatch(decreaseCart(item))
  }
  const handleIncrease = (item) => {
    dispatch(addToCart(item))
  }
  return (
    <div 
    className=' fixed inset-0 bg-[rgba(0,0,0,0.7)] z-20' 
    onClick={() => setIsShowCart(false)}
    >
      <div onClick={(e)=> e.stopPropagation()} 
      className=' bg-white w-[300px] h-full absolute right-0 overflow-y-scroll py-4 text-black'
      >
        <h1 className='bg-red-400 py-2 text-center text-white'>Cart</h1>
        <div className='flex flex-col items-center px-2 py-4'>
            {cart?.map((item) => (
                <div key={item.id} className='text-center border-b-[3px] w-full mb-2 flex flex-col items-center'>
                    <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-[150px] h-[150px]"
                    />
                    <p className='text-red-700 font-bold w-6 h-6 rounded-full bg-blue-700 mt-1'>{item.cartQuantity}</p>
                    <h3 className='text-[0.8rem] text-black'>{item?.title}</h3>
                    <div className='flex items-center'>
                        <button onClick={()=>handleDecrease(item)} className=' border-none'><AiOutlineMinusSquare className='text-[30px] text-gray-500'/></button>
                        <p className='text-red-600 mx-2'>${item.price * item.cartQuantity}</p>
                        <button onClick={()=>handleIncrease(item)} className=' border-none'><AiOutlinePlusSquare className='text-[30px]  text-gray-500'/></button>
                    </div>
                </div>
            ))}
                <p className='text-[0.8rem] text-red-600'>Total:${cartTotalAmount}</p>
            
                <button onClick={handleRemoveCart}>Clear Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
