import { divIcon, point } from "leaflet";
import { Marker } from "react-leaflet";

function ClusterDivIcon(count: number) {
  const size = count < 100 ? "small" : count < 1000 ? "medium" : "large";
  return divIcon({
    html: `<div><span>${count}</span></div>`,
    className: `marker-cluster marker-cluster-${size}`,
    iconSize: point(40, 40),
  });
}

function Cluster({
  lat,
  lng,
  count,
}: {
  lat: number;
  lng: number;
  count: number;
}) {
  return <Marker position={[lat, lng]} icon={ClusterDivIcon(count)} />;
}

export default Cluster;
