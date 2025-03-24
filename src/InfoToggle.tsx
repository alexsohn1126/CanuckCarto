import { useEffect } from "react";
import { useMap } from "react-leaflet";

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

export default InfoToggle;
