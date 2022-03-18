import { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import ShopPage from "./pages/shop-page/shop-page";
import Checkout from "./pages/checkout/checkout";
import { foodData } from "./assets/data/food.data";

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

  render() {
    const { order, amountDue } = this.state;

    return (
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <ShopPage
                data={this.data}
                order={order}
                amountDue={amountDue}
                updateOrder={this.updateOrder}
                resetOrder={this.resetOrder}
              />
            }
          />

          <Route
            path='checkout'
            element={<Checkout order={order} amountDue={amountDue} />}
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default AppRoutes;
