import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import type { LatLngTuple } from 'leaflet';
import { useState } from 'react';
import type { FormikProps } from 'formik';

type FormValues = { address: string };

async function reverseGeocode(lat: number, lng: number, signal?: AbortSignal): Promise<string | null> {
    const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=fa&zoom=18&addressdetails=1`,
        { signal }
    );
    if (!res.ok) return null;

    const data = await res.json();
    const a = data.address;
    if (!a) return null;

    const city = a.city ?? a.town ?? a.village ?? a.county
    const city_district = a.city_district
    const suburb = a.suburb
    const neighbourhood = a.neighbourhood ?? a.quarter
    const road = a.road

    let address = '';

    if (city) address += city;
    if (city_district) address += `، ${city_district}`;
    if (suburb) address += `، ${suburb}`;
    if (neighbourhood) address += `، ${neighbourhood}`;
    if (road) address += `، ${road}`;

    return address;
}

function ClickMarker({ formik }: { formik: FormikProps<FormValues> }) {
    const [position, setPosition] = useState<LatLngTuple | null>(null);
    const [loading, setLoading] = useState(false);

    useMapEvents({
        async click(e) {
            const { lat, lng } = e.latlng;
            setPosition([lat, lng]);
            setLoading(true);

            try {
                const address = await reverseGeocode(lat, lng);
                if (address) {
                    formik.setFieldValue('address', address);
                }
            } catch (err) {
                console.error('Reverse geocoding failed', err);
            } finally {
                setLoading(false);
            }
        },
    });

    if (!position) return null;

    return (
        <Marker position={position}>
            <Popup>
                {loading ? 'در حال دریافت آدرس...' : formik.values.address || 'آدرس پیدا نشد'}
            </Popup>
        </Marker>
    );
}

function Map({ formik }: { formik: FormikProps<FormValues> }) {
    const center: LatLngTuple = [35.6892, 51.3890];

    return (
        <MapContainer center={center} zoom={10} scrollWheelZoom={false} className="w-full h-96">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickMarker formik={formik} />
        </MapContainer>
    );
}

export default Map;