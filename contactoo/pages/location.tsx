import { useLoadScript } from "@react-google-maps/api";
import Map from "../components/map";

export default function Location() {
  useLoadScript({
    googleMapsApiKey: "AIzaSyDGMOk3v7FV-4KWk21gK4YWpceOe0hcWmU",
    libraries: ["places"],
  });
  return <Map />;
}
