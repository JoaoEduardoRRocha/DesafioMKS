import React, { useState } from 'react';
import "./Home.scss";
import Navbar from '../../Components/Navbar/Navbar';
import Article from '../../Components/Article/Article';
import Footer from '../../Components/Footer/Footer';
import { Product } from '../../Models/Product';

const Home = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [openModal, setOpenModal] = useState(false);
  
  const toggleModal = () => {
    setOpenModal(prev => !prev)
  }

  const addToCart = (product: Product) => {
    const newItems = [...cartItems, product];
    setCartItems(newItems);
  }

  const deleteFromCart = (index: number) => {
    const newCart = [...cartItems];
    const currentCartItems = newCart.filter((_, itemIndex) => itemIndex !== index);
    setCartItems(currentCartItems);

    if (!currentCartItems.length) {
      toggleModal()
    }
  }

  return (
    <div className='home-container'>
      <Navbar cartItems={cartItems} deleteFromCart={deleteFromCart} toggleModal={toggleModal} open={openModal}/>
      <Article addToCart={addToCart} />
      <Footer />
    </div>
  );
};

export default Home;