import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import locationData from "../shops.json";
import originData from "../shopsList.json";

type BusinessNames = keyof typeof originData;

const isBusinessName = (name: string | undefined): name is BusinessNames => {
  return !!name && name in originData;
};

function getCoords(feature): [number, number] {
  if ("lat" in feature && "lon" in feature) return [feature.lat, feature.lon];
  if ("center" in feature && "lat" in feature.center && "lon" in feature.center)
    return [feature.center.lat, feature.center.lon];
  return [0, 0];
}

const mapleLeafIcon = L.icon({
  iconUrl: "/image.svg",
  iconSize: [30, 30],
});

function App() {
  console.log(locationData.elements.length);
  return (
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
      {locationData.elements.map((f) => {
        const businessName = f.tags?.name;

        if (!isBusinessName(businessName)) {
          console.warn(`Missing data for: ${JSON.stringify(f)}`);
          return null;
        }

        const isCanadianOrLocal =
          typeof businessName === "string" &&
          (originData[businessName] === "canadian" ||
            originData[businessName] === "local");

        return (
          <Marker
            key={f.id}
            position={getCoords(f)}
            icon={isCanadianOrLocal ? mapleLeafIcon : L.Icon.Default.prototype}
          >
            <Popup>
              <div>
                <h3>{businessName}</h3>
                <p>Type: {originData[businessName]}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default App;
