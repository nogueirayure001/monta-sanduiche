import { Component } from "react";
import OrderList from "../../components/order-list/order-list";
import PageTitle from "../../components/page-title/page-title";
import CartControls from "../../components/cart-controls/cart-controls";
import Button from "../../components/button/button";
import { Link, Navigate } from "react-router-dom";

import "./cart.scss";

class Cart extends Component {
  render() {
    const { cart, user, ...otherProps } = this.props;

    const cartItems = cart.map((item, index) => {
      return (
        <div className='cart-item' key={index}>
          <OrderList order={item.order} />

          <div className='cart-item-control-group'>
            <p className='cart-item-price'>
              R$ {(item.amountDue * item.howMany).toFixed(2).replace(".", ",")}
            </p>

            <CartControls order={item} {...otherProps} />
          </div>
        </div>
      );
    });

    return user ? (
      <main className='cart-page'>
        <PageTitle title='Organize Seu Carrinho' />

        <div className='cart-items-wrapper'>{cartItems}</div>

        <div className='cart-nav-links'>
          <Button type='button'>
            <Link to='/shop'>Continuar Comprando</Link>
          </Button>

          <Button type='button' disabled={cart.length ? false : true}>
            <Link to='/checkout'>Finalizar Pedido</Link>
          </Button>
        </div>
      </main>
    ) : (
      <Navigate to='/' replace={true} />
    );
  }
}

export default Cart;
