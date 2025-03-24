import {
  GeoJSON,
  MapContainer,
  Marker,
  TileLayer,
  useMap,
} from "react-leaflet";
import { memo, useCallback, useEffect, useState } from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import provinceBorders from "../data/provincial-borders.min.json";
import Info from "./Info";
import { Icon, LeafletMouseEvent } from "leaflet";
import { FeatureCollection } from "geojson";

type LocationData = Partial<Record<string, string>>;

type Location = [number, number];

const provinceBordersData: FeatureCollection =
  provinceBorders as FeatureCollection;

async function getLocationData(key: string): Promise<LocationData[]> {
  const res = await fetch(`/api/location/${key}`);
  const resJson = (await res.json()) as LocationData[];
  return resJson;
}

async function getMarkerList(province: string): Promise<Location[]> {
  const res = await fetch(`/api/province/${province}`);
  const resJson = (await res.json()) as Location[];
  return resJson;
}

const mapleIcon = new Icon({
  iconUrl: "maple.png",
  iconSize: [30, 30],
});

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
  const map = useMap();
  const handleClick = useCallback(() => {
    onClick(lat, lng);
    map.flyTo([lat, lng], 18, { animate: true, duration: 1.5 });
  }, [lat, lng, onClick]);

  return (
    <Marker
      icon={mapleIcon}
      position={[lat, lng]}
      eventHandlers={{ click: handleClick }}
    />
  );
});

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
        className="p-2 bg-white/90 rounded-full shadow-sm
         hover:bg-white transition-all backdrop-blur-sm border
         border-gray-200 w-8 h-12 flex items-center justify-center"
      >
        {isInfoOpen ? "◀" : "▶"}
      </button>
    </div>
  );
}

function App() {
  const [markerData, setMarkerData] = useState<Record<string, LocationData[]>>(
    {}
  );
  const [markerList, setMarkerList] = useState<Location[]>([]);
  const [currMarker, setCurrMarker] = useState("");
  const [isInfoOpen, setIsInfoOpen] = useState(true);
  // TODO: Handle cases where there are more than 1 shop per location
  const currShop =
    markerData[currMarker] === undefined
      ? ""
      : markerData[currMarker][0]["brand"] ||
        markerData[currMarker][0]["name"] ||
        "";

  const handleMarkerClick = useCallback((lat: number, lng: number) => {
    // OSM nodes have 7 decimal places
    // https://wiki.openstreetmap.org/wiki/Node#Structure
    const key = `${lat.toFixed(7)}${lng.toFixed(7)}`;
    setIsInfoOpen(true);

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
  &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
  contributors`;

  return (
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
          <Provinces setMarkerList={setMarkerList} />
          <MarkerClusterGroup disableClusteringAtZoom={17}>
            {markerList.map(([lat, lng]) => {
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

const provinceStyle = {
  color: "#ff1111",
  weight: 2,
  fillOpacity: 0,
};

function Provinces({
  setMarkerList,
}: {
  setMarkerList: (location: Location[]) => void;
}) {
  const onProvinceClick = useCallback((e: LeafletMouseEvent) => {
    const province = e.propagatedFrom.feature.properties["ISO3166-2"];
    console.log(province);
    getMarkerList(province).then((res) => setMarkerList(res));
  }, []);

  return (
    <GeoJSON
      data={provinceBordersData}
      style={provinceStyle}
      eventHandlers={{
        click: onProvinceClick,
      }}
    />
  );
}

export default App;
