import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Article from "./Article";
import DATA_MOCK from '../../mocks/products-response.json';

const addToCart = jest.fn();

describe('#Article Components', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(DATA_MOCK)
    } as unknown as Response)
  });
  
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render correctly', async () => {
    render(<Article addToCart={addToCart} />)

    const item = await screen.findByText('Headset Cloud Stinger');

    expect(item).toBeInTheDocument();
  });

  it('should call `addToCart`', async () => {
    render(<Article addToCart={addToCart} />)

    const button = await screen.findAllByTestId('button');

    await userEvent.click(button[0]);

    expect(addToCart).toBeCalled();
  })
});