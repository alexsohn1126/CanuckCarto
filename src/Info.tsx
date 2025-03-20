import { useContext } from "react";
import Description from "./CompanyDescription";
import { ModalContext } from "./modals/ModalContext";

function Info({ currShop }: { currShop: string }) {
  const { setActiveModal } = useContext(ModalContext);
  return (
    <div className="flex flex-col overflow-y-auto max-h-svh max-w-xs min-w-xs bg-[#fefefe] drop-shadow-lg z-500">
      <Description currShop={currShop} />
      <div className="mt-auto mx-auto text-sm text-gray-500">
        <span
          onClick={() => setActiveModal("aboutme")}
          className="underline cursor-pointer"
        >
          About me
        </span>{" "}
        <span
          onClick={() => setActiveModal("disclaimer")}
          className="underline cursor-pointer"
        >
          Disclaimer
        </span>
      </div>
      <div className="flex my-2 gap-1 mx-auto">
        <a href="https://www.linkedin.com/in/moohaeng-sohn/" target="_blank">
          <img
            className="h-8 w-8"
            src="linkedin-mark.svg"
            alt="Check out my LinkedIn Profile"
          />
        </a>
        <a href="https://github.com/alexsohn1126/CanuckCarto" target="_blank">
          <img
            className="h-8 w-8"
            src="github-mark.svg"
            alt="Check out the github repository for this website"
          />
        </a>
        <a href="https://ko-fi.com/X8X31BROYE" target="_blank">
          <img
            className="h-8 w-8"
            src="kofi-mark.svg"
            alt="Buy Me a Coffee at ko-fi.com"
          />
        </a>
      </div>
    </div>
  );
}

export default Info;
