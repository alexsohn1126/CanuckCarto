import { useContext } from "react";
import brandData from "../data/american_shops.json";
import { ModalContext } from "./modals/ModalContext";
const brand: Record<string, Record<string, string>> = brandData;

function Description({ currShop }: { currShop: string }) {
  const companyName = brand["shopToCompany"][currShop];
  const companyObj =
    companyName === undefined ? brand["notFound"] : brand[companyName];
  return currShop === "" ? (
    <HelloDescription />
  ) : (
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
      <h3 className="text-3xl mx-auto mt-5 mb-10">CanuckCarto</h3>
      <p>Welcome! I have compiled a map of american businesses in Canada.</p>
      <p>
        If you like this website, please consider donating by clicking{" "}
        <img src="kofi-mark.svg" className="inline w-6 h-6" /> below.
      </p>
      <p>
        I am currently looking for an entry-level software developer position,
        in Ottawa region, or Canada remote, so if you would like to refer me or
        hire me, please click the linkedin logo below!
      </p>
      <p>
        If there is an issue, technical or informational, or would like me to
        add more american companies, please raise an issue at this{" "}
        <a
          href="https://github.com/alexsohn1126/CanuckCarto/issues"
          className="underline"
          target="_blank"
        >
          Github Issue
        </a>
        .
      </p>
      <p>
        This site shares locations of American businesses in Canada. I aim to
        inform, not endorse or discourage visits. Learn more in the{" "}
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
