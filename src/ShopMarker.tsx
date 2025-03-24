import { Icon } from "leaflet";
import { memo, useCallback } from "react";
import { Marker, useMap } from "react-leaflet";

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

export default ShopMarker;
