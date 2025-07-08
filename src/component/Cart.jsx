import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../Store';

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="container mt-4">
      <h3>🛒 Your Cart</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
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
                  <button
                    className="btn btn-danger btn-sm mt-2"
                    onClick={() => dispatch(removeFromCart(index))}
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-3">
            <h5>Total Price: {totalPrice.toFixed(2)}/-Rs</h5>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
