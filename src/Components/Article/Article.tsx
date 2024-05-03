import React, { useState, useEffect } from 'react';
import "./Article.scss";
import Card from '../Card/Card';
import { Product } from '../../Models/Product';

interface ArticleProps {
  addToCart: (product: Product) => void;
}
const Article: React.FC<ArticleProps> = ({ addToCart}) => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=8&sortBy=id&orderBy=DESC');
      const data = await response.json();
      
      setProducts(data.products);
    } catch (error) {
      console.error('Ocorreu um erro ao obter os dados dos produtos:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
  return (
    <article className='article-content'>
      {products.map(product => (
        <Card key={product.id} product={product} addToCart={addToCart}/>
      ))}
    </article>
  );
};

export default Article;
