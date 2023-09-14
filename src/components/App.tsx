import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { YMaps, Map, Placemark, ZoomControl, withYMaps } from '@pbe/react-yandex-maps';
import YMapsMap from '@pbe/react-yandex-maps/typings/Map';


function App() {
  const defaultState = {
    center: [52.751574, 102.573856],
    zoom: 5,

  };
  const [maps, setMaps] = useState<any>(null);
  const [address, setAddress] = useState("");
  const [placeMarkCoordinates, setPlaceMarkCoordinates] = useState([52.751574, 102.573856]);

  const getGeoLocation = (e: any) => {
    let coord = e.get("target").getCenter();
    console.log("map center", coord);

    let resp = maps.geocode(coord);
    resp.then((res: any) => {
      setAddress(res.geoObjects.get(0).getAddressLine());
    });
  };

  const getPlaceMarkCoordinates = (e: any) => {
    let coord = e.get("target").geometry.getCoordinates();
    console.log("coord placemark", coord);

  };

  const onLoad = (map: any) => {
    setMaps(map);
  };

  return (
    <YMaps query={{ lang: 'ru_RU', apikey: "0e953c44-2ab2-4a01-87ac-dced95cbcb4c" }}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Editt <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Map defaultState={defaultState}
          onBoundsChange={(ymaps: any) => getGeoLocation(ymaps)}
          modules={["geolocation", "geocode"]}
          onLoad={(ymaps) => onLoad(ymaps)}>
          <Placemark geometry={placeMarkCoordinates} options={{ draggable: true }} onDragEnd={(event: any) => getPlaceMarkCoordinates(event)} />
          <ZoomControl options={{ position: { bottom: 35, right: 10 } }} />
        </Map>
      </div>
      <p>ggbdfdfdf {address}</p>
    </YMaps>
  );
}

export default App;
