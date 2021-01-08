import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import supercluster from 'points-cluster';

import './GoogleMap.css';

import UserPin from './MapObject/UserPin';
import Cluster from './MapObject/Cluster';
import { defaultStartCoords, fakeUsers } from '../util/fakeUsers';

class GoogleMap extends Component {
  state = {
    mapOptions: {
      center: this.props.center || defaultStartCoords,
      zoom: this.props.zoom || 15,
    },

    onlineUsers: this.props.onlineUsers || fakeUsers,

    clusters: [],
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.center !== this.props.center) {
      this.setState({
        mapOptions: {
          center: this.props.center,
          // zoom: 15
        },
      });
    }
  }

  createClusters = (props) => {
    const clusters = supercluster(this.state.onlineUsers, {
      minZoom: 0,
      maxZoom: 16,
      radius: 60,
    });
    this.setState({
      clusters: clusters(this.state.mapOptions).map(({ wx, wy, numPoints, points }) => ({
        lat: wy,
        lng: wx,
        numPoints: numPoints,
        // id: `${numPoints}_${points[0].id}`
        points: points,
      })),
    });
  };

  onMapChange = ({ center, zoom, bounds }) => {
    this.setState(
      {
        mapOptions: { center, zoom, bounds },
      },
      () => this.createClusters(this.props)
    );
  };

  render() {
    const { clusters, onlineUsers, mapOptions } = this.state;
    return (
      <div className={'google-map'}>
        {/*<UsersCount count={onlineUsers.length}/>*/}
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GMAPS_API }}
          center={mapOptions.center}
          zoom={mapOptions.zoom}
          onChange={this.onMapChange}
          yesIWantToUseGoogleMapApiInternals={true}
        >
          {clusters.map((groups) => {
            if (groups.numPoints === 1) {
              return (
                <UserPin
                  lat={groups.points[0].lat}
                  lng={groups.points[0].lng}
                  details={groups.points[0].details}
                  key={groups.id}
                />
              );
            } else {
              return (
                <Cluster
                  lat={groups.lat}
                  lng={groups.lng}
                  key={groups.id}
                  numPoints={groups.numPoints}
                />
              );
            }
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap;
