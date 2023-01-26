import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Product from './Product';
import styled from "styled-components";

const AppLayout = styled.div`
  display: grid;
  background-color: red;
  /* grid-template-columns: 1fr 1fr 1fr; */
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 5px;
`;

function Products() {

  const [products, setProducts] = useState([]);
  // const [error, setError] = useState('');
  

  useEffect(() => {
    
    /** Fetch data from backend */
    axios.get('api/products')
      .then((res) => { setProducts(res.data.data.products) })
      // .catch((err) => { setError(err.message) });

  }, []);

  return (
    // <div className='d-flex flex-wrap justify-content-around'>

    <AppLayout>
      {products && products.map((product, index) => ( <Product {...product} key={index} /> ))}

      </AppLayout>
    // </div>
  )
}

export default Products