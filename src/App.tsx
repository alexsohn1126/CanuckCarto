import { MapContainer, TileLayer } from "react-leaflet";
import { useCallback, useState } from "react";
import Info from "./Info";
import MarkerCluster from "./MarkerCluster";
import InfoToggle from "./InfoToggle";

function App() {
  // TODO: Handle cases where there are more than 1 shop per location
  const [currShop, setCurrShop] = useState("hello");
  const [isInfoOpen, setIsInfoOpen] = useState(true);

  const handleMarkerClick = useCallback((shopName: string) => {
    setIsInfoOpen(true);
    setCurrShop(shopName);
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
          <MarkerCluster handleMarkerClick={handleMarkerClick} />
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
