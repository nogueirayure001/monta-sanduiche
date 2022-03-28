import { Component, createRef } from "react";
import Button from "../button/button";
import "./modal.scss";

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHidden: false,
    };

    this.modalRef = createRef();
  }

  handleClick = () => {
    this.setState({ isHidden: true });
  };

  handleClickOutside = (e) => {
    if (this.modalRef && !this.modalRef.current.contains(e.target)) {
      this.setState({ isHidden: true });
    }
  };

  componentDidMount() {
    window.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleClickOutside);
  }

  render() {
    const { title, message, buttonLabel } = this.props;
    const { isHidden } = this.state;

    return (
      <div className={`modal-wrapper ${isHidden ? "hidden" : ""}`}>
        <section className='modal' ref={this.modalRef}>
          <h3 className='modal-title'>{title}</h3>

          <p className='modal-message'>{message}</p>

          <Button type='button' handleClick={this.handleClick}>
            {buttonLabel}
          </Button>
        </section>
      </div>
    );
  }
}

export default Modal;
