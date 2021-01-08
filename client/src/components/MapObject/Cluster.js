import React from 'react';
import './Cluster.css';

function Cluster({ numPoints }) {
  return (
    <div className={'cluster-group'}>
      <p>{numPoints}</p>
    </div>
  );
}

export default Cluster;
