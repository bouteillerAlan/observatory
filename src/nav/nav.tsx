import React from 'react';
import './nav.scss';
import history from '../server/history';

type NavProps = {
  active: string
}

const Nav: React.FunctionComponent<NavProps> = (props: NavProps) => {
  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <a href="#empty" data-target="mobile-nav" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className='left hide-on-med-and-down'>
            <li className={props.active === 'card' ? 'active' : ''}>
              <a href="/card"><i className="material-icons right">storage</i>Card</a>
            </li>
            <li className={props.active === 'map' ? 'active' : ''}>
              <a href="/map"><i className="material-icons right">apps</i>Map</a>
            </li>
            <li onClick={() => {
              localStorage.removeItem('obsKey');
              history.push('/');
            }}>
              <a href="#reset"><i className="material-icons right">autorenew</i>Reset API Key</a>
            </li>
            <li>
              <a href="lebusmagique.fr"><i className="material-icons right">keyboard_return</i>Retour vers LBM</a>
            </li>
          </ul>
        </div>
      </nav>

      <ul className='sidenav' id='mobile-nav'>
        <li className={props.active === 'card' ? 'active' : ''}>
          <a href="/card"><i className="material-icons right">storage</i>Card</a>
        </li>
        <li className={props.active === 'map' ? 'active' : ''}>
          <a href="/map"><i className="material-icons right">apps</i>Map</a>
        </li>
        <li onClick={() => {
          localStorage.removeItem('obsKey');
          history.push('/');
        }}>
          <a href="#reset"><i className="material-icons right">autorenew</i>Reset API Key</a>
        </li>
        <li>
          <a href="lebusmagique.fr"><i className="material-icons right">keyboard_return</i>Retour vers LBM</a>
        </li>
      </ul>
    </>
  );
};

export default Nav;
