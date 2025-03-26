import { useContext } from "react";
import brandData from "../data/shops.json";
import { ModalContext } from "./modals/ModalContext";
const brand: Record<string, Record<string, string | number>> = brandData;

function Description({ currShop }: { currShop: string }) {
  if (currShop === "hello") {
    return <HelloDescription />;
  }
  if (currShop in brand) {
    return <CompanyDescription currShop={currShop} />;
  }
  return <GenericDescription currShop={currShop} />;
}

function GenericDescription({ currShop }: { currShop: string }) {
  return (
    <img
      className="h-72 mx-auto max-h-64 object-scale-down"
      crossOrigin="anonymous"
    />
  );
}

function CompanyDescription({ currShop }: { currShop: string }) {
  const companyName = brand.shopToCompany[currShop];
  const companyObj =
    companyName === undefined ? brand.notFound : brand[companyName];
  return (
    <div className="description p-3 flex flex-col gap-2">
      <h3 className="text-3xl">{currShop}</h3>
      <hr className="border-gray-700" />
      <img
        className="h-72 mx-auto max-h-64 object-scale-down"
        src={companyObj["imageFile"]}
        crossOrigin="anonymous"
      />
      <p
        className="text-[10px] text-gray-500"
        dangerouslySetInnerHTML={{ __html: companyObj["imageAttribution"] }}
      />
      <p className="mt-6">{companyObj["description"]}</p>
      <p className="text-xs text-gray-500">
        Text content adapted from Wikipedia (CC BY-SA 4.0).
        <br />
        <a className="text-[10px]" href={companyObj["source"]}>
          Wikipedia article for {companyName}
        </a>
      </p>
    </div>
  );
}

function HelloDescription() {
  const { setActiveModal } = useContext(ModalContext);
  return (
    <div className="flex flex-col mx-2 mt-4 gap-4">
      <img
        className="h-1/2 w-1/2 m-auto drop-shadow-lg [image-rendering:pixelated]"
        src="logo.png"
      />
      <h3 className="text-3xl mx-auto mt-5 mb-8">CanuckCarto</h3>
      <p>
        Welcome to CanuckCarto! I have compiled a map of american businesses in
        Canada.
      </p>
      <p>
        I am currently looking for an entry-level software developer position,
        in Ottawa region, or remote.
        <br />
        If you are looking for a software developer, please click the linkedin
        logo below, or contact me directly at{" "}
        <a href="mailto:alexsohn1126@gmail.com" className="underline">
          alexsohn1126@gmail.com
        </a>
        !
      </p>
      <p>
        If you like this website, please consider donating by clicking{" "}
        <img src="kofi-mark.svg" className="inline w-6 h-6" /> button below.
      </p>
      <p>
        If you have techical issues with the website, please raise an issue at
        this{" "}
        <a
          href="https://github.com/alexsohn1126/CanuckCarto/issues"
          className="underline"
          target="_blank"
        >
          Github Issue
        </a>
        .
      </p>
      <p className="text-xs text-gray-500">
        This site shares locations of many different businesses in Canada. I aim
        to inform, not endorse or discourage visits. Learn more in the{" "}
        <span
          onClick={() => setActiveModal("disclaimer")}
          className="underline cursor-pointer"
        >
          Disclaimer
        </span>
        .
      </p>
    </div>
  );
}

export default Description;
