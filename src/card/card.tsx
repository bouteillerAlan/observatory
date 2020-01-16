import React, {useEffect, useState} from 'react';
import Nav from '../nav/nav';
import checkApiKey from '../request/checkApiKey';
import sortData from '../request/getAll';

const Card: React.FunctionComponent = () => {
  const [dataMap, setDataMap] = useState(); // no type because the {} type bugs the [index]
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkApiKey();
    sortData().then((res: any) => {
      setDataMap(res);
      setLoading(false);
    });
  }, []);

  return (
    <section>
      <Nav active={'card'} />
      {loading ?
        <div className="progress">
          <div className="indeterminate"> </div>
        </div> :
        ''}
      <h1>This is Card component</h1>
    </section>
  );
};

export default Card;
