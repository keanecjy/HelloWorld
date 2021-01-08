import React, { useContext, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import supercluster from 'points-cluster';

import './GoogleMap.css';
import UserPin from './MapObject/UserPin';
import Cluster from './MapObject/Cluster';
import { StateContext } from '../App';

function createMapOptions(maps) {
  return {
    zoomControlOptions: {
      position: maps.ControlPosition.LEFT_CENTER,
      style: maps.ZoomControlStyle.SMALL,
    },
  };
}

function GoogleMap({ users }) {
  const { mapOptions, setMapOptions } = useContext(StateContext);
  const [clusters, setClusters] = useState([]);

  useEffect(() => {
    if (mapOptions && mapOptions.bounds) {
      const clusters = supercluster(users, {
        minZoom: 0,
        maxZoom: 16,
        radius: 60,
      });

      console.log(mapOptions);
      setClusters(
        clusters(mapOptions).map(({ wx, wy, numPoints, points }) => ({
          lat: wy,
          lng: wx,
          numPoints: numPoints,
          id: `${numPoints}_${points[0].id}`,
          points: points,
        }))
      );
    }
  }, [mapOptions]);

  return (
    <div className={'google-map'}>
      {mapOptions && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GMAPS_API }}
          center={mapOptions.center}
          zoom={mapOptions.zoom}
          onChange={({ center, zoom, bounds }) => setMapOptions({ center, zoom, bounds })}
          yesIWantToUseGoogleMapApiInternals={true}
          options={createMapOptions}
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
      )}
    </div>
  );
}

export default GoogleMap;
