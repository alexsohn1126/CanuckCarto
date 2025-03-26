import { Icon } from "leaflet";
import { memo, useCallback } from "react";
import { Marker, useMap } from "react-leaflet";
import americanShops from "../data/shops.json";

const americanShopNames = new Set(Object.keys(americanShops.shopToCompany));

const mapleIcon = new Icon({
  iconUrl: "maple.png",
  iconSize: [30, 30],
});

function getCanadianness(brandName: string): number {
  // if we don't have a brand name, just assume it's fully Canadian
  if (!brandName) return 3;

  // if we listed business as american in the dataset, return 1
  if (americanShopNames.has(brandName)) return 1;

  // if we have a bran name but dont have it in our american list, just say 2
  return 2;
}

// Marker has to be memoed or it rerenders every marker on click
const ShopMarker = memo(function ShopMarker({
  brandName,
  lat,
  lng,
  onClick,
}: {
  brandName: string;
  lat: number;
  lng: number;
  onClick: (shopName: string) => void;
}) {
  const map = useMap();
  const handleClick = useCallback(() => {
    onClick(brandName);
    map.flyTo([lat, lng], 20, { animate: true, duration: 1.5 });
  }, [lat, lng, onClick]);

  return (
    <Marker
      icon={getCanadianness(brandName) < 2 ? Icon.Default.prototype : mapleIcon}
      position={[lat, lng]}
      eventHandlers={{ click: handleClick }}
    />
  );
});

export default ShopMarker;
