import { Component, createRef } from "react";
import "./button.scss";

class Button extends Component {
  constructor(props) {
    super(props);

    this.button = createRef();
  }

  isButtonInViewport = () => {
    const rect = this.button.current.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  render() {
    const { children, type, disabled, handleClick, float, active, style } =
      this.props;

    return (
      <button
        className={`button ${float ? "float" : ""} ${active ? "active" : ""}`}
        style={{ ...style }}
        type={type}
        disabled={disabled}
        onClick={handleClick}
        ref={this.button}
      >
        {children}
      </button>
    );
  }
}

export default Button;
