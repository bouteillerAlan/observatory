import React, {useState} from 'react';

const Footer = () => {

  const [lang] = useState(localStorage.getItem('obsLang') || 'eng');

  return (
    <div className="col s12">
      {lang === 'eng' ?
        <div className="col s12">
          <p>
                This app is made by <a href="https://alanbouteiller.dev" target="_blank" rel="noopener noreferrer">Alan Bouteiller</a> for <a href="https://www.lebusmagique.fr/" target="_blank" rel="noopener noreferrer">Le Bus Magique</a>.
                Do not hesitate to create an <a href="https://github.com/bouteillerAlan/SpyHistory/issues" target="_blank" rel="noopener noreferrer">Issue</a> if you find a bug.
                All game images are © 2019 ArenaNet, Inc..<br/>
            <small>CC BY-NC-SA Alan Bouteiller</small>
          </p>
        </div> :
        <div className="col s12">
          <p>
                Cette application a été codée par <a href="https://alanbouteiller.dev" target="_blank" rel="noopener noreferrer">Alan Bouteiller</a> pour <a href="https://www.lebusmagique.fr/" target="_blank" rel="noopener noreferrer">Le Bus Magique</a>.
                N'hésiter pas à créer une <a href="https://github.com/bouteillerAlan/SpyHistory/issues" target="_blank" rel="noopener noreferrer">Issue</a> si vous trouvez un bug.
                Toutes les images du jeu sont © 2019 ArenaNet, Inc..<br/>
            <small>CC BY-NC-SA Alan Bouteiller</small>
          </p>
        </div>
      }
    </div>
  );
};

export default Footer;
