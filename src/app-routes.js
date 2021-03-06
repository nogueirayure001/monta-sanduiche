import { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import ShopPage from "./pages/shop-page/shop-page";
import Checkout from "./pages/checkout/checkout";
import SignInOrLogIn from "./pages/sign-log-page/sign-log-page";
import Cart from "./pages/cart/cart";
import PageHeader from "./components/page-header/page-header";
import { foodData } from "./assets/data/food.data";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";

class AppRoutes extends Component {
  constructor() {
    super();

    this.data = foodData;

    this.state = {
      order: {
        bread: "",
        filling: "",
        cheese: "",
        salads: [],
        complement: [],
      },
      amountDue: 0,
      user: null,
      cart: [],
      routesDidMount: false,
    };
  }

  updateOrder = (updatedOrder, addToDue, multiChoice, isAdding) => {
    const keyName = Object.keys(updatedOrder)[0];
    let newOrder = {};

    this.setState((prevState) => {
      const newDue = prevState.amountDue + addToDue;

      if (multiChoice) {
        const newOrderInsideArray = JSON.parse(
          JSON.stringify(prevState.order[keyName])
        );

        if (isAdding) {
          newOrderInsideArray.push(updatedOrder[keyName]);
        } else {
          const index = newOrderInsideArray.indexOf(updatedOrder[keyName]);
          newOrderInsideArray.splice(index, 1);
        }

        newOrder = {
          ...prevState.order,
          [keyName]: newOrderInsideArray,
        };
      } else {
        newOrder = { ...prevState.order, ...updatedOrder };
      }

      return { ...prevState, order: newOrder, amountDue: newDue };
    });
  };

  resetOrder = () => {
    this.setState({
      order: {
        bread: "",
        filling: "",
        cheese: "",
        salads: [],
        complement: [],
      },
      amountDue: 0,
    });
  };

  addToCart = async () => {
    const { user } = this.state;

    await this.setState((prevState) => {
      let isCopy = false;
      const newCart = JSON.parse(JSON.stringify(prevState.cart));
      const newOrder = {
        order: prevState.order,
        amountDue: prevState.amountDue,
        howMany: 1,
      };

      newCart.forEach((order) => {
        if (JSON.stringify(order) === JSON.stringify(newOrder)) {
          order.howMany += 1;
          isCopy = true;
        }
      });

      if (!isCopy) {
        newCart.push(newOrder);
      }

      return { cart: newCart };
    });

    this.saveCart(user.uid);
  };

  updateCart = async (item, addition) => {
    const { user } = this.state;

    if (item.howMany + addition < 1) return;

    const newCart = JSON.parse(JSON.stringify(this.state.cart));

    newCart.every((order) => {
      if (JSON.stringify(order) === JSON.stringify(item)) {
        order.howMany += addition;
        return false;
      }
      return true;
    });

    await this.setState({ cart: newCart });

    this.saveCart(user.uid);
  };

  deleteFromCart = (item) => {
    const newCart = JSON.parse(JSON.stringify(this.state.cart));

    newCart.every((order, index) => {
      if (JSON.stringify(order) === JSON.stringify(item)) {
        newCart.splice(index, 1);
        return false;
      }

      return true;
    });

    this.setState({ cart: newCart });
  };

  clearCart = () => {
    this.setState({ cart: [] });
  };

  saveCart = (userUid) => {
    const { cart } = this.state;
    const cartString = JSON.stringify(cart);

    localStorage.setItem(userUid, cartString);
  };

  componentDidMount = () => {
    onAuthStateChanged(auth, (user) => {
      this.setState({ user: user, routesDidMount: true });

      if (user) {
        const storedCart = JSON.parse(localStorage.getItem(user.uid));

        if (storedCart && storedCart.length) {
          this.setState({ cart: storedCart });
        }
      }
    });
  };

  render() {
    const { order, amountDue, user, cart, routesDidMount } = this.state;

    return (
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <PageHeader
                user={user}
                clearCart={this.clearCart}
                saveCart={this.saveCart}
              />
            }
          >
            <Route
              index
              element={
                <SignInOrLogIn user={user} routesDidMount={routesDidMount} />
              }
            />

            <Route
              path='/shop'
              element={
                <ShopPage
                  user={user}
                  data={this.data}
                  order={order}
                  amountDue={amountDue}
                  updateOrder={this.updateOrder}
                  resetOrder={this.resetOrder}
                  addToCart={this.addToCart}
                />
              }
            />

            <Route
              path='/cart'
              element={
                <Cart
                  user={user}
                  cart={cart}
                  updateCart={this.updateCart}
                  deleteFromCart={this.deleteFromCart}
                />
              }
            />

            <Route
              path='/checkout'
              element={
                <Checkout user={user} cart={cart} clearCart={this.clearCart} />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default AppRoutes;
