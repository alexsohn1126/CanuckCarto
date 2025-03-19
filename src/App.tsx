import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { memo, useCallback, useState } from "react";
import locationData from "../data/coordinates.json";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Description from "./CompanyDescription";
interface LocationData {
  tags: Partial<Record<string, string>>;
}

const locations: [number, number][] = locationData as [number, number][];

async function getLocationData(key: string): Promise<LocationData[]> {
  const res = await fetch(`/api/location/${key}`);
  const resJson = (await res.json()) as LocationData[];
  return resJson;
}

// Marker has to be memoed or it rerenders every marker on click
const ShopMarker = memo(function ShopMarker({
  lat,
  lng,
  onClick,
}: {
  lat: number;
  lng: number;
  onClick: (lat: number, lng: number) => void;
}) {
  const handleClick = useCallback(() => {
    onClick(lat, lng);
  }, [lat, lng, onClick]);

  return (
    <Marker position={[lat, lng]} eventHandlers={{ click: handleClick }} />
  );
});

function App() {
  const [markerData, setMarkerData] = useState<Record<string, LocationData[]>>(
    {}
  );
  const [currMarker, setCurrMarker] = useState("");
  const currShop =
    markerData[currMarker] === undefined
      ? ""
      : markerData[currMarker][0]["tags"]["brand"] ||
        markerData[currMarker][0]["tags"]["name"] ||
        "";

  const handleMarkerClick = useCallback((lat: number, lng: number) => {
    // OSM nodes have 7 decimal places
    // https://wiki.openstreetmap.org/wiki/Node#Structure
    const key = `${lat.toFixed(7)}${lng.toFixed(7)}`;

    if (!(key in markerData)) {
      getLocationData(key)
        .then((resJson) => {
          setMarkerData((prev) => ({
            ...prev,
            [key]: resJson,
          }));
        })
        .catch(() => {
          setMarkerData((prev) => ({
            ...prev,
            [key]: [],
          }));
        })
        .finally(() => setCurrMarker(key));
    }
  }, []);

  const attribution = `
  &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors
  | Data by <a href="https://overpass-api.de/"> Overpass API </a>`;

  return (
    <div className="flex">
      <div className="flex flex-col max-w-[15svw] min-w-[15svw] bg-[#fefefe] drop-shadow-lg z-500">
        <Description currShop={currShop} />
        <div className="flex flex-col mt-auto mb-2 gap-1">
          <a href="https://ko-fi.com/X8X31BROYE" target="_blank">
            <img
              className="border-0 h-9 mx-auto"
              src="https://storage.ko-fi.com/cdn/kofi1.png?v=6"
              alt="Buy Me a Coffee at ko-fi.com"
            />
          </a>
        </div>
      </div>
      <div className="w-full">
        <MapContainer
          center={[64.2, -96.1]}
          zoom={4}
          scrollWheelZoom={true}
          className="h-svh"
        >
          <TileLayer
            maxNativeZoom={19}
            maxZoom={20}
            attribution={attribution}
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup disableClusteringAtZoom={17}>
            {locations.map(([lat, lng]) => {
              return (
                <ShopMarker
                  key={`${lat}${lng}`}
                  lat={lat}
                  lng={lng}
                  onClick={handleMarkerClick}
                />
              );
            })}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
