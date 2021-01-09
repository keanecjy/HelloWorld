import React from 'react';
import './Cluster.css';

function Cluster({ numPoints }) {
  return <div className={'cluster-group'}>{numPoints}</div>;
}

export default Cluster;
