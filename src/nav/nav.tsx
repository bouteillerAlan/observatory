import React from 'react';
import history from '../server/history';
import './nav.scss';

type NavProps = {
  active: string
}

const Nav: React.FunctionComponent<NavProps> = (props) => {
  return (
    <nav>
      <div className="nav-wrapper">
        <ul className="left hide-on-med-and-down">
          <li className={props.active === 'card' ? 'active' : ''} onClick={() => {history.push('/card')}}>
            <a href="#map"><i className="material-icons right">storage</i>Card</a>
          </li>
          <li className={props.active === 'map' ? 'active' : ''} onClick={() => {history.push('/map')}}>
            <a href="#map"><i className="material-icons right">apps</i>Map</a>
          </li>
          <li onClick={() => {localStorage.removeItem('key')}}>
            <a href="#reset"><i className="material-icons right">autorenew</i>Reset API Key</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav;
