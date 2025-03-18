import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { memo, useCallback, useState } from "react";
import locationData from "../data/coordinates.json";
import brandData from "../data/american_shops.json";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Description from "./CompanyDescription";
interface LocationData {
  tags: Partial<Record<string, string>>;
}

const locations: [number, number][] = locationData as [number, number][];
const brand: Record<string, Record<string, string>> = brandData;

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
  const currCompany = brand["shopToCompany"][currShop];

  const handleMarkerClick = useCallback((lat: number, lng: number) => {
    // OSM nodes have 7 decimal places
    // https://wiki.openstreetmap.org/wiki/Node#Structure
    const key = `${lat.toFixed(7)}${lng.toFixed(7)}`;

    setCurrMarker(key);

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
        });
    }
  }, []);

  return (
    <div className="flex">
      <div className="max-w-[15svw] min-w-[15svw] bg-[#fefefe] drop-shadow-lg z-500">
        {currCompany === undefined ? (
          currShop.toString()
        ) : (
          <Description company={currCompany} />
        )}
      </div>
      <div className="w-full">
        <MapContainer
          center={[45.2674167, -75.7457222]}
          zoom={17}
          scrollWheelZoom={true}
          className="h-svh"
        >
          <TileLayer
            maxNativeZoom={19}
            maxZoom={20}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
