import { Component, createRef } from "react";
import { Link } from "react-router-dom";
import "./order-board.scss";
import PresentationBoard from "../presentation-board/presentation-board";
import OrderList from "../order-list/order-list";
import Button from "../button/button";
import { MAX_PHASE } from "../../assets/data/constants";

class OrderBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldButtonFloat: false,
    };

    this.fixedButton = createRef();
  }

  showOrHideFloatingButton = () => {
    const fixedButton = this.fixedButton.current;

    if (!fixedButton.isButtonInViewport() && !this.state.shouldButtonFloat) {
      this.setState({ shouldButtonFloat: true });
    } else if (
      fixedButton.isButtonInViewport() &&
      this.state.shouldButtonFloat
    ) {
      this.setState({ shouldButtonFloat: false });
    }
  };

  handleFinishBuying = async () => {
    const { addToCart } = this.props;

    await addToCart();
  };

  componentDidMount() {
    window.addEventListener("mousedown", this.showOrHideFloatingButton);
    window.addEventListener("scroll", this.showOrHideFloatingButton);
    window.addEventListener("resize", this.showOrHideFloatingButton);
  }

  componentWillUnmount() {
    window.removeEventListener("mousedown", this.showOrHideFloatingButton);
    window.removeEventListener("scroll", this.showOrHideFloatingButton);
    window.removeEventListener("resize", this.showOrHideFloatingButton);
  }

  render() {
    const { order, amountDue, isButtonEnabled, updatePhase, orderPhase } =
      this.props;

    const { shouldButtonFloat } = this.state;

    return (
      <div className='order-board'>
        <PresentationBoard title='Ingredientes Selecionados:'>
          <OrderList order={order} />

          {amountDue ? (
            <p className='amount-due'>
              TOTAL: R$ {amountDue.toFixed(2).replace(".", ",")}
            </p>
          ) : null}

          {orderPhase < MAX_PHASE ? (
            <Button
              type='button'
              disabled={!isButtonEnabled}
              handleClick={updatePhase}
              ref={this.fixedButton}
            >
              Prosseguir
            </Button>
          ) : (
            <Button
              type='button'
              disabled={false}
              handleClick={this.handleFinishBuying}
              ref={this.fixedButton}
            >
              {<Link to='/cart'>Adicionar ao Carrinho</Link>}
            </Button>
          )}

          {orderPhase < MAX_PHASE && shouldButtonFloat ? (
            <Button
              type='button'
              disabled={!isButtonEnabled}
              handleClick={updatePhase}
              float={true}
            >
              Prosseguir
            </Button>
          ) : null}
        </PresentationBoard>
      </div>
    );
  }
}

export default OrderBoard;
