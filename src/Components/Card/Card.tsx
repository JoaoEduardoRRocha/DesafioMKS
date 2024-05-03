import React from 'react';
import "./Card.scss";
import svgBag from '../../Assets/shoppingBag.svg';
import { Product } from '../../Models/Product';

interface CardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const Card: React.FC<CardProps> = ({ product, addToCart }) => {
  const handleAddToCart = () => {
    addToCart(product)
  };

  return (
    <article className='card-content'>
      <div className='card-content__info'>
        <img className='card-content__img' src={product.photo} alt="Produto" />

        <div className='card-content__name-price-container'>
          <p className='card-content__name'>{product.name}</p>
          <p className='card-content__price'>{Number(product.price).toFixed(2)}</p>
        </div>

        <div className='card-content__description'>
          {product.description}
        </div>
      </div>

      <button data-testId="button" className='card-content__btn-buy' onClick={handleAddToCart}>
        <img src={svgBag} alt="" />
        COMPRAR
      </button>
    </article>
  );
};

export default Card;
