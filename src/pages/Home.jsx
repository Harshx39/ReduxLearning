// Home.js
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../Store";
import { useNavigate } from "react-router-dom";

function Home() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
const navigate = useNavigate();
  const products = [
    { id: 1, name: "Apple iPhone 15", price: 999, image: "iphone15.jpg" },
    { id: 2, name: "Samsung Galaxy S24", price: 899, image: "samsungs24.jpeg" },
    { id: 3, name: "Google Pixel 9", price: 799, image: "pixel9.jpeg" },
    { id: 4, name: "Apple iPhone 15", price: 999, image: "iphone15.jpg" },
    { id: 5, name: "Samsung Galaxy S24", price: 899, image: "samsungs24.jpeg" },
    { id: 6, name: "Google Pixel 9", price: 799, image: "pixel9.jpeg" },
  ];

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <div className="container-fluid d-flex justify-content-between">
          <span className="navbar-brand fw-bold">Redux Learning</span>
          <div className="position-relative">
            <FaShoppingCart
              size={24}
              className="text-white"
              style={{ cursor: "pointer" }}
              onClick={() => navigate('/cart')}
            />
            {cartItems.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartItems.length}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Product List */}
      <div className="container mt-4">
        <h4>Product List</h4>
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={`/images/${product.image}`}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-muted">{product.price}/-Rs</p>
                  </div>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
