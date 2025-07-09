import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  applyDiscount
} from '../Store';
import { useNavigate } from "react-router-dom";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const discount = useSelector((state) => state.cart.discount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const finalPrice = totalPrice - (totalPrice * discount) / 100;

  return (
    <div className="container mt-4">
      <h3>🛒 Your Cart</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="row">
            {cartItems.map((item, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <div className="card h-100">
                  <img
                    src={`/images/${item.image}`}
                    className="card-img-top"
                    alt={item.name}
                    style={{ height: '200px', objectFit: 'contain' }}
                  />
                  <div className="card-body">
                    <h5>{item.name}</h5>
                    <p className="text-muted">{item.price}/-Rs</p>
                    <div className="d-flex align-items-center mb-2">
                      <button
                        className="btn btn-outline-secondary btn-sm me-2"
                        onClick={() =>
                          dispatch(
                            updateQuantity({ index, quantity: item.quantity - 1 })
                          )
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm ms-2"
                        onClick={() =>
                          dispatch(
                            updateQuantity({ index, quantity: item.quantity + 1 })
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => dispatch(removeFromCart(index))}
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h5>Total: ₹{totalPrice.toFixed(2)}</h5>
            <div className="mb-2">
              <label>Apply Discount (%)</label>
              <input
                type="number"
                className="form-control"
                value={discount}
                onChange={(e) => dispatch(applyDiscount(Number(e.target.value)))}
                style={{ width: '120px' }}
              />
            </div>
            <h5>Final Total: ₹{finalPrice.toFixed(2)}</h5>
            <button
              className="btn btn-warning mt-2"
              onClick={() => dispatch(clearCart())}
            >
              🧹 Clear Cart
            </button>
            <button
              className="btn btn-success mt-2 ms-2"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
