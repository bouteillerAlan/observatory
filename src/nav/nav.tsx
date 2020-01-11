import React from 'react';
import history from '../server/history';

type NavProps = {
  active: string
}

const Nav: React.FunctionComponent<NavProps> = (props) => {
  return (
    <nav>
      <div className="nav-wrapper">
        <ul className="left hide-on-med-and-down">
          <li className={props.active === 'card' ? 'active' : ''} onClick={() => {history.push('/card')}}><a href="#map">Card</a></li>
          <li className={props.active === 'map' ? 'active' : ''} onClick={() => {history.push('/map')}}><a href="#map">Map</a></li>
          <li onClick={() => {localStorage.removeItem('key')}}><a href="#reset">Reset API Key</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav;
