import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, addToCart } from "../Store";

function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <div className="container mt-4">
      <h3>❤️ Your Wishlist</h3>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="row">
          {wishlistItems.map((item, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card h-100">
                <img
                  src={`/images/${item.image}`}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h5>{item.name}</h5>
                  <p className="text-muted">{item.price}/-Rs</p>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => dispatch(addToCart(item))}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => dispatch(removeFromWishlist(item.id))}
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
