import { useState, useMemo, useCallback, useRef } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, Circle, MarkerClusterer } from '@react-google-maps/api';
import Places from './places';
import { Component } from 'react';
import Distance from './distance';
import { toNamespacedPath } from 'node:path/win32';
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;


export default function Map() {
    const notify = () => toast("Hello!");
    const [office, setOffice] = useState<LatLngLiteral>();
    const mapRef = useRef<GoogleMap>();
    const [directions, setDirections] = useState<DirectionsResult>();
    const center = useMemo<LatLngLiteral>(() => ({ lat: 40.8, lng: -73.2 }), []);
    const options = useMemo<MapOptions>(
        () => ({
            mapId: "83a80e15e67c02fa",
            disableDefaultUI: true,
            clickableIcons: false
        }),
        []
    );

    const onLoad = useCallback((map: any) => (mapRef.current = map), []);
    const houses = useMemo(() => generateHouses(center), [center]);

    const fetchDirections = (house: LatLngLiteral) => {
        if (!office) return;

        const service = new google.maps.DirectionsService();
        service.route(
            {
                origin: house,
                destination: office,
                travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
                if (status === "OK" && result) {
                    setDirections(result);


                }
            }
        )
    }

    return (
        <div className="container">
            <div className="controls">
                <div>
                    <button onClick={notify}>Notify</button>
                    <ToastContainer />
                </div>
                <h1>Find Nearby Restaurants!</h1>

                <Places setOffice={(position) => {
                    setOffice(position);
                    mapRef.current?.panTo(position);

                }}
                />
                {!office && <p>Enter your starting location.</p>}
                {directions && <Distance leg={directions.routes[0].legs[0]} />}




            </div>
            <div className="map">
                <GoogleMap zoom={10}
                    center={center}
                    mapContainerClassName="map-container"
                    options={options}
                    onLoad={onLoad}>
                    {directions && <DirectionsRenderer directions={directions} options={{
                        polylineOptions: {
                            zIndex: 50,
                            strokeColor: "#1976D2",
                            strokeWeight: 5,
                        }

                    }} />}

                    {office && (
                        <>
                            <Marker position={office}
                            />

                            <MarkerClusterer>
                                {(clusterer) => houses.map((house) => (
                                    <Marker key={house.lat}
                                        position={house}
                                        clusterer={clusterer}
                                        onClick={() => {
                                            fetchDirections(house);

                                        }} />
                                ))}
                            </MarkerClusterer>



                            <Circle center={office} radius={5000} options={closeOptions} />
                            <Circle center={office} radius={10000} options={middleOptions} />
                            <Circle center={office} radius={15000} options={farOptions} />


                        </>
                    )}
                </GoogleMap>
            </div>
        </div>
    );
}

const defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true
};

const closeOptions = {
    ...defaultOptions,
    zIndex: 3,
    fillOpacity: 0.05,
    strokeColor: '#8BC34A',
    fillColor: '#8BC34A'
};

const middleOptions = {
    ...defaultOptions,
    zIndex: 2,
    fillOpacity: 0.05,
    strokeColor: '#FBC02D',
    fillColor: '#FBC02D'
};

const farOptions = {
    ...defaultOptions,
    zIndex: 1,
    fillOpacity: 0.05,
    strokeColor: '#FF5252',
    fillColor: '#FF5252'
};

const generateHouses = (position: LatLngLiteral) => {
    const _houses: Array<LatLngLiteral> = [];
    for (let i = 0; i < 100; i++) {
        const direction = Math.random() < 0.5 ? -2 : 2;
        _houses.push({
            lat: position.lat + Math.random() / direction,
            lng: position.lng + Math.random() / direction
        });
    }

    return _houses;
};
