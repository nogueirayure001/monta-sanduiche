import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import { signOutUser } from "../../utils/firebase";
import Button from "../button/button";
import "./page-header.scss";

const PageHeader = ({ user }) => {
  if (user) {
    console.log(user.email);
  }

  return (
    <Fragment>
      <header className='page-header'>
        <h1 className='page-title'>
          {user ? `Bem vindo, ${user.displayName}!` : null}
        </h1>

        <nav className='nav-links'>
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
};

export default PageHeader;
