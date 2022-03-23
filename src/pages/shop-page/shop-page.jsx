import { Component } from "react";
import "./shop-page.scss";
import PageTitle from "../../components/page-title/page-title";
import OrderMenu from "../../components/order-menu/order-menu";
import OrderBoard from "../../components/order-board/order-board";
import { Navigate } from "react-router-dom";
import { MAX_PHASE } from "../../assets/data/constants";

class ShopPage extends Component {
  constructor() {
    super();

    this.state = {
      orderPhase: 0,
      isButtonEnabled: false,
    };
  }

  componentDidMount() {
    const { resetOrder } = this.props;

    resetOrder();
  }

  updatePhase = () => {
    this.setState((prevState) => {
      if (prevState.orderPhase < MAX_PHASE) {
        return { orderPhase: prevState.orderPhase + 1 };
      }

      return;
    });
  };

  updateButtonState = (state) => {
    this.setState({ isButtonEnabled: state });
  };

  render() {
    const { user, data, order, amountDue, updateOrder, addToCart } = this.props;
    const { orderPhase, isButtonEnabled } = this.state;

    if (data) {
      return user ? (
        <main className='shop-page'>
          <PageTitle title='Monte Seu Sanduíche' />

          <div className='main-content'>
            <OrderMenu
              data={data}
              orderPhase={orderPhase}
              updateOrder={updateOrder}
              updateButtonState={this.updateButtonState}
            />

            <OrderBoard
              order={order}
              amountDue={amountDue}
              isButtonEnabled={isButtonEnabled}
              orderPhase={orderPhase}
              updatePhase={this.updatePhase}
              addToCart={addToCart}
            />
          </div>
        </main>
      ) : (
        <Navigate to='/' replace={true} />
      );
    } else {
      return <main className='loading-page'>carregando...</main>;
    }
  }
}

export default ShopPage;
