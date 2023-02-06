import React from 'react'
import { Link } from 'react-router-dom'

export default function EmptyCart() {
  return (
    <div className='empty-cart'>
        <h1 className='empty-cart__title'>Корзина пустая</h1>
        <Link to={'/'} className="button button--outline button--add go-back-btn">Вернуться</Link>
      </div>
  )
}
