import { Component } from "react";
import "./options-list.scss";
import Option from "../option/option";

class OptionsList extends Component {
  constructor() {
    super();

    this.state = {
      prevPrice: 0,
      prevPhase: 0,
    };
  }

  updatePrevPrice = (newPrice) => {
    this.setState({ prevPrice: newPrice });
  };

  updatePrevState = () => {
    const orderPhase = this.props.orderPhase;
    this.setState({ prevPhase: orderPhase });
  };

  componentDidMount() {
    const { updateButtonState } = this.props;
    const { foodData } = this.props;
    const { multiChoice } = foodData;

    if (!multiChoice) {
      updateButtonState(false);
    }
  }

  render() {
    const { foodData, updateOrder, orderPhase, updateButtonState } = this.props;
    const { options, multiChoice, ingredient } = foodData;
    const { prevPrice, prevPhase } = this.state;

    const listItem = options.map((option, index) => {
      return (
        <li className='option-wrapper' key={index}>
          <Option
            id={index}
            multiChoice={multiChoice}
            ingredient={ingredient}
            option={option}
            updateOrder={updateOrder}
            prevPrice={prevPrice}
            updatePrevPrice={this.updatePrevPrice}
            orderPhase={orderPhase}
            prevPhase={prevPhase}
            updatePrevState={this.updatePrevState}
            updateButtonState={updateButtonState}
          />
        </li>
      );
    });

    return <ul className='options-list'>{listItem}</ul>;
  }
}

export default OptionsList;
