import Button from "../button/button";
import "./cart-controls.scss";

const CartControls = ({ order, updateCart, deleteFromCart }) => (
  <div className='cart-controls'>
    <div className='cart-item-number'>
      <button
        className='button-less'
        type='button'
        onClick={() => updateCart(order, -1)}
      >
        -
      </button>

      <p className='display'>{order.howMany}</p>

      <button
        className='button-more'
        type='button'
        onClick={() => updateCart(order, 1)}
      >
        +
      </button>
    </div>

    <Button type='button' handleClick={() => deleteFromCart(order)}>
      Excluir
    </Button>
  </div>
);

export default CartControls;
