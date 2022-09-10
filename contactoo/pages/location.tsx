import { useLoadScript } from "@react-google-maps/api";
import Map from "../components/map"

export default function Location() {

    useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        libraries: ["places"],
    });
    return <Map />;
}
