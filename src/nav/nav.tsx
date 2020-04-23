import React from 'react';
import './nav.scss';
import history from '../server/history';

type NavProps = {
  active: string
}

const Nav: React.FunctionComponent<NavProps> = (props: NavProps) => {

  /**
   * handle api key reset
   * Return {void}
   */
  function handleReset(): void {
    localStorage.removeItem('obsKey');
    history.push('/');
  }


  return (
    <>
      <nav>
        <div className="nav-wrapper">

          <a className="brand-logo hide-on-small-only show-on-medium-and-up large">
            Observatory
          </a>
          {/* Mobile*/}
          <a className="brand-logo show-on-small hide-on-med-and-up">
            Obs.
          </a>

          <a href="#empty" data-target="mobile-nav" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className='right hide-on-med-and-down'>
            <li className={props.active === 'card' ? 'active' : ''}>
              <a href="/card"><i className="material-icons right">storage</i>Card</a>
            </li>
            <li className={props.active === 'map' ? 'active' : ''}>
              <a href="/map"><i className="material-icons right">apps</i>Map</a>
            </li>
            <li onClick={() => handleReset()}>
              <a href="#reset"><i className="material-icons right rotate">autorenew</i>Reset API Key</a>
            </li>
            <li>
              <a href="lebusmagique.fr"><i className="material-icons right">keyboard_return</i>Retour vers LBM</a>
            </li>
          </ul>
        </div>
      </nav>

      <svg className="svg_wave" xmlns="http://www.w3.org/2000/svg" width="100vw" height="50px" viewBox="0 0 100 25" preserveAspectRatio="none">
        <path d="M.133.133v9.221s36.006-16.838 79.67.134c43.664 16.971 96.867-.768 96.867-.768v-8.586z"/>
      </svg>

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
