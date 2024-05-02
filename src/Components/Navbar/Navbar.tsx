import React from 'react';
import { Product } from '../../Models/Product';
import "./Navbar.scss";
import svgCart from '../../Assets/shoppingCart.svg';
import Modal from '../Modal/Modal';

interface NavbarProps {
  cartItems: Product[];
  deleteFromCart: (index: number) => void
  open?: boolean
  toggleModal: () => void
}

const Navbar: React.FC<NavbarProps> = ({ cartItems, deleteFromCart, open = false, toggleModal}) => {
  return (
    <nav className='nav-content'>
      <div className='nav-content__logo'>
        <h1>MSK</h1>
        <p>Sistemas</p>
      </div>

      <div className='nav-content__cart-counter'>
        <img src={svgCart} alt="Carrinho de Compras" onClick={() => toggleModal()} />
        <div className='nav-content__counter'>{cartItems.length}</div>
      </div>

      {open && (
        <Modal closeModal={toggleModal} cartItems={cartItems} deleteFromCart={deleteFromCart} />
      )}
    </nav>
  );
};

export default Navbar;
