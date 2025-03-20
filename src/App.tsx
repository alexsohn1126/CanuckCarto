import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { memo, useCallback, useEffect, useState } from "react";
import locationData from "../data/coordinates.json";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Info from "./Info";

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
  const [isInfoOpen, setIsInfoOpen] = useState(true);
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
  | Data from <a href="https://overpass-api.de/"> Overpass API </a>`;

  return (
    <>
      <div className="flex">
        {isInfoOpen && <Info currShop={currShop} />}
        <div className="w-full relative">
          <MapContainer
            center={[64.2, -96.1]}
            zoom={4}
            scrollWheelZoom={true}
            className="h-svh"
          >
            <InfoToggle isInfoOpen={isInfoOpen} setIsInfoOpen={setIsInfoOpen} />
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
    </>
  );
}

function InfoToggle({
  isInfoOpen,
  setIsInfoOpen,
}: {
  isInfoOpen: boolean;
  setIsInfoOpen: (a: boolean) => void;
}) {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
  }, [isInfoOpen]);

  return (
    <div className="absolute z-[1000] left-2 top-1/2 -translate-y-1/2">
      <button
        onClick={() => {
          setIsInfoOpen(!isInfoOpen);
        }}
        className="p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-all
                backdrop-blur-sm border border-gray-200 w-8 h-12 flex items-center justify-center"
      >
        {isInfoOpen ? "◀" : "▶"}
      </button>
    </div>
  );
}

export default App;
