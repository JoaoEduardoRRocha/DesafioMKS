import Modal from './Modal';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import DATA_MOCK from '../../mocks/products-response.json'

describe('#Modal Component', () => {
  it('should render correctly', async () => {
    const props = {
      closeModal: jest.fn(),
      cartItems: [DATA_MOCK.products[0]],
      deleteFromCart: jest.fn(),
    };

    render(<Modal {...props}/>);

    const item = await screen.findByText(DATA_MOCK.products[0].name)
    expect(item).toBeInTheDocument();
  });

  it('should call `increaseQuantity`', async () => {
    const props = {
      closeModal: jest.fn(),
      cartItems: [DATA_MOCK.products[0]],
      deleteFromCart: jest.fn(),
    };

    render(<Modal {...props}/>);

    const button = await screen.findByTestId('increase-quantity')
    await userEvent.click(button);

    const quantityElement = await screen.findByTestId('products-quantity');
    expect(quantityElement).toHaveTextContent('| 2 |');
  })

  it('should call `decreaseQuantity`', async () => {
    const props = {
      closeModal: jest.fn(),
      cartItems: [DATA_MOCK.products[0]],
      deleteFromCart: jest.fn(),
    };

    render(<Modal {...props}/>);

    const buttonIncrease = await screen.findByTestId('increase-quantity')
    await userEvent.click(buttonIncrease);

    const buttonDecrease = await screen.findByTestId('decrease-quantity')
    await userEvent.click(buttonDecrease);

    const quantityElement = await screen.findByTestId('products-quantity');
    expect(quantityElement).toHaveTextContent('| 1 |');
  })
})