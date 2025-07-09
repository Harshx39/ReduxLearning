import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { addToCart, addToWishlist } from "../Store";
import { useNavigate } from "react-router-dom";

function Home() {
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Apple iPhone 15", price: 999, image: "iphone15.jpg" },
    { id: 2, name: "Samsung Galaxy S24", price: 899, image: "samsungs24.jpeg" },
    { id: 3, name: "Google Pixel 9", price: 799, image: "pixel9.jpeg" },
    { id: 4, name: "One Plus Nord CE2", price: 699, image: "nordce2.jpeg" },
    { id: 5, name: "Nothing 2a", price: 599, image: "2a.jpeg" },
    { id: 6, name: "Redmi Note 13 Pro", price: 499, image: "13pro.jpeg" },
  ];

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <div className="container-fluid d-flex justify-content-between">
          <span className="navbar-brand fw-bold">Redux Shopping</span>
          <div className="d-flex gap-4">
            <div className="position-relative">
              <FaHeart
                size={22}
                className="text-white"
                style={{ cursor: "pointer" }}
                 onClick={() => navigate("/wishlist")}
              />
              {wishlistItems.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                  {wishlistItems.length}
                </span>
              )}
            </div>
            <div className="position-relative">
              <FaShoppingCart
                size={24}
                className="text-white"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/cart")}
              />
              {cartItems.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </div>
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
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => dispatch(addToCart(product))}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => dispatch(addToWishlist(product))}
                    >
                      ❤️ Wishlist
                    </button>
                  </div>
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
