import React, { useEffect, useState } from 'react';
import "./Modal.scss";
import { motion } from 'framer-motion';
import svgClose from '../../Assets/btnClose.svg';
import { Product } from '../../Models/Product';

interface ModalProps {
  closeModal: () => void;
  cartItems: Product[];
  deleteFromCart: (index: number) => void;
}

const Modal: React.FC<ModalProps> = ({ closeModal, cartItems, deleteFromCart }) => {
  const [quantities, setQuantities] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    setQuantities(Array(cartItems.length).fill(1));
  }, [cartItems]);

  useEffect(() => {
    const total = cartItems.reduce((acc, item, index) => {
      return acc + parseFloat(item.price) * quantities[index];
    }, 0);
    setTotalPrice(total);
  }, [cartItems, quantities]);

  const decreaseQuantity = (index: number) => {
    setQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = Math.max(1, prevQuantities[index] - 1);
      return newQuantities;
    });
  };

  const increaseQuantity = (index: number) => {
    setQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = prevQuantities[index] + 1;
      return newQuantities;
    });
  };

  const btnFinish = () => {
    closeModal();
  };
  return (
    <motion.div
      className='modal-container'
      initial={{ opacity: 0, y: -50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <div className='modal-container'>
        <div className='modal-container__header'>
          <p className='modal-container__header-title'>Carrinho de Compras</p>

          <div>
            <img
              className='modal-container__header-btn-close'
              src={svgClose}
              alt="Botão de Fechar"
              onClick={closeModal}
            />
          </div>
        </div>

        {cartItems.map((item, index) => (
          <div className='modal-container__shopping-cart' key={index}>
            <img className='modal-container__shopping-cart__product-img' src={item.photo} alt="" />
            <div className='modal-container__shopping-cart__product-name'>{item.name}</div>
            <div className='modal-container__shopping-cart__product-quantify'>
              Qtd.
              <div className='modal-container__shopping-cart__product-quantify-border'>
                <div className='modal-container__shopping-cart__product-quantify-minus' onClick={() => decreaseQuantity(index)} data-testId="decrease-quantity">-</div>
                <div data-testId='products-quantity'>| {quantities[index]} |</div>
                <div className='modal-container__shopping-cart__product-quantify-plus' onClick={() => increaseQuantity(index)} data-testId="increase-quantity">+</div>
              </div>
            </div>
            <div className='modal-container__shopping-cart__product-price'>{item.price}</div>
            <img
              className='modal-container__shopping-cart__btn-close'
              src={svgClose}
              alt="Botão de Fechar"
              onClick={() => deleteFromCart(index)}
            />
          </div>
        ))}

        <div className='modal-container__total-price-container'>
          <div className='modal-container__total'>Total:</div>
          <div className='modal-container__price'>{totalPrice}</div>
          <div className='modal-container__finish' onClick={btnFinish}>Finalizar Compra</div>
        </div>

      </div>
    </motion.div>
  );
};

export default Modal;

