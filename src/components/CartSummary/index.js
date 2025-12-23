import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const total = cartList.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      )

      const itemLength = cartList.length
      const itemsText = itemLength > 1 ? 'items' : 'item'

      return (
        <div className="items-inSummery">
          <h1 className="order-total-rpice-heading">
            Order Total: <span className="total-price">Rs {total}/-</span>
          </h1>

          <p className="items-count-total">
            {itemLength} {itemsText} in cart
          </p>

          <button className="checkout-btn" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
