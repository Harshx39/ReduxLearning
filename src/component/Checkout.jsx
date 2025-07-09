import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../Store";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const discount = useSelector((state) => state.cart.discount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const finalTotal = total - (total * discount) / 100;

  const handleCheckout = () => {
    alert("✅ Order placed successfully!");
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h3>🧾 Order Summary</h3>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cartItems.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between">
                <div>
                  {item.name} <strong>× {item.quantity}</strong>
                </div>
                <div>₹{(item.price * item.quantity).toFixed(2)}</div>
              </li>
            ))}
          </ul>
          <p>Discount: {discount}%</p>
          <h5>Total Payable: ₹{finalTotal.toFixed(2)}</h5>
          <button className="btn btn-success mt-2" onClick={handleCheckout}>
            🛍️ Confirm Order
          </button>
        </>
      )}
    </div>
  );
}

export default Checkout;
