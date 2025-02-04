import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Glider from "glider-js";
import "glider-js/glider.min.css";
import "./ProductSlider.css";

const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  const gliderRef = useRef(null);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  useEffect(() => {
    if (products.length && gliderRef.current) {
      new Glider(gliderRef.current, {
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        arrows: {
          prev: ".glider-prev",
          next: ".glider-next"
        },
        responsive: [
          { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
          { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } }
        ]
      });
    }
  }, [products]);

  return (
    <div className="product-slider">
      <h2 className="section-title">YOU MAY ALSO LIKE</h2>
      <button className="glider-prev">«</button>
      <div className="glider-contain">
        <div className="glider" ref={gliderRef}>
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="product-info">
                <p className="category">{product.category}</p>
                <h3 className="product-title">{product.title}</h3>
                <p className="price">${product.price}</p>
                <button className="buy-now">Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="glider-next">»</button>
    </div>
  );
};

export default ProductSlider;
