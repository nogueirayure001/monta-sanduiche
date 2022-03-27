import { Fragment, Component, createRef } from "react";
import { Link, Outlet } from "react-router-dom";
import { signOutUser } from "../../utils/firebase";
import Button from "../button/button";
import "./page-header.scss";

class PageHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuClosed: true,
    };

    this.menuRef = createRef();
    this.menuButtonRef = createRef();
  }

  toggleMenu = () => {
    this.setState((prevState) => {
      return { isMenuClosed: !prevState.isMenuClosed };
    });
  };

  handleClickOutsideMenu = (e) => {
    const { isMenuClosed } = this.state;

    if (
      this.menuRef &&
      !this.menuRef.current.contains(e.target) &&
      !isMenuClosed
    ) {
      this.setState({ isMenuClosed: true });
      e.stopPropagation();
    }
  };

  componentDidMount() {
    window.addEventListener("click", this.handleClickOutsideMenu, true);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleClickOutsideMenu, true);
  }

  render() {
    const { user } = this.props;
    const { isMenuClosed } = this.state;

    return (
      <Fragment>
        <header className='page-header'>
          <h1 className='page-title'>
            Bem vindo
            {user ? `, ${user.displayName}!` : "!"}
          </h1>

          <Button
            type='button'
            handleClick={this.toggleMenu}
            ref={this.menuButtonRef}
          >
            Menu
          </Button>

          <nav
            className={`nav-links ${isMenuClosed ? "nav-links--closed" : ""}`}
            ref={this.menuRef}
          >
            <ul className='links-list'>
              <li className='link-item'>
                <Link to='/shop'>Montar Sanduíche</Link>
              </li>

              <li className='link-item'>
                <Link to='/checkout'>Pagamento</Link>
              </li>

              <li className='link-item'>
                <Link to='/cart'>Seu Carrinho</Link>
              </li>

              <li className='link-item'>
                {user ? (
                  <Button type='button' handleClick={() => signOutUser()}>
                    Sair
                  </Button>
                ) : (
                  <Button type='button'>
                    <Link to='/'>Entrar</Link>
                  </Button>
                )}
              </li>
            </ul>
          </nav>
        </header>

        <Outlet />
      </Fragment>
    );
  }
}

export default PageHeader;
