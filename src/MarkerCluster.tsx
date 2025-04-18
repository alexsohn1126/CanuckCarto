import { useEffect, useState } from "react";
import { useMapEvents } from "react-leaflet";
import { PointFeature } from "supercluster";
import ShopMarker from "./ShopMarker";
import Cluster from "./Cluster";

async function getClusters(
  bbox: [number, number, number, number],
  zoom: number,
  setMarkers: (a: PointFeature<any>[] | []) => void
) {
  const res = await fetch("/api/clusters", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      bbox: bbox,
      zoom: zoom,
    }),
  });
  const resJson = await res.json();
  setMarkers(resJson);
}

let didInit = false;

function MarkerCluster({
  handleMarkerClick,
}: {
  handleMarkerClick: (shopName: string) => void;
}) {
  const [markers, setMarkers] = useState<PointFeature<any>[] | []>([]);
  const loadData = () => {
    const bound = map.getBounds();
    const zoom = map.getZoom();
    const bbox: [number, number, number, number] = [
      bound.getWest(),
      bound.getSouth(),
      bound.getEast(),
      bound.getNorth(),
    ];
    getClusters(bbox, zoom, setMarkers);
  };
  const map = useMapEvents({
    moveend: loadData,
  });

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      loadData();
    }
  });

  return (
    <>
      {markers.map((m: PointFeature<any>) => {
        const [lng, lat] = m.geometry.coordinates;
        const brandName = m.properties.brand || m.properties.name || "";
        if (m.properties.cluster === true) {
          return (
            <Cluster
              key={`${lat}${lng}`}
              lat={lat}
              lng={lng}
              count={m.properties.point_count}
            />
          );
        } else {
          return (
            <ShopMarker
              key={`${lat}${lng}`}
              brandName={brandName}
              lat={lat}
              lng={lng}
              onClick={handleMarkerClick}
            />
          );
        }
      })}
    </>
  );
}

export default MarkerCluster;
