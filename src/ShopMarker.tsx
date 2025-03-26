import { PathOptions } from "leaflet";
import { memo, useCallback } from "react";
import { CircleMarker, useMap } from "react-leaflet";
import { getShopDescription } from "./util";

const greenPathOption: PathOptions = {
  color: "#22ff22",
};
const orangePathOption: PathOptions = {
  color: "#FFA500",
};
const redPathOption: PathOptions = {
  color: "#ff2222",
};

function chooseColor(brandName: string): PathOptions {
  const currShopDescription = getShopDescription(brandName);
  if (
    brandName === "" ||
    currShopDescription === undefined ||
    currShopDescription.canadianness === 3
  ) {
    return greenPathOption;
  } else if (currShopDescription.canadianness === 2) {
    return orangePathOption;
  }
  return redPathOption;
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
    <CircleMarker
      radius={10}
      center={[lat, lng]}
      pathOptions={chooseColor(brandName)}
      eventHandlers={{ click: handleClick }}
    />
  );
});

export default ShopMarker;
