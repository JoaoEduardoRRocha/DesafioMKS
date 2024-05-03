import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Navbar from './Navbar';
import { Product } from '../../Models/Product';

describe('Navbar Component', () => {
  it('should open and close the modal when the cart icon is clicked', () => {
    const cartItems: Product[] = [];
    const deleteFromCart = jest.fn();

    const toggleModal = jest.fn();

    render(<Navbar cartItems={cartItems} deleteFromCart={deleteFromCart} open={true} toggleModal={toggleModal}/>);

    const modalElement = screen.getByTestId('modal');
    expect(modalElement).toBeInTheDocument();

    const cartIcon = screen.getByAltText('Carrinho de Compras');
    fireEvent.click(cartIcon);

    expect(toggleModal).toHaveBeenCalledTimes(1);
  });
});
