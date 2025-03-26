import { useContext } from "react";
import { ModalContext } from "./modals/ModalContext";
import { ShopDescription } from "./types";
import { getShopDescription } from "./util";

function Description({ currShop }: { currShop: string }) {
  if (currShop === "hello") {
    return <HelloDescription />;
  }
  const currShopDescription: ShopDescription | undefined =
    getShopDescription(currShop);
  return (
    <div className="p-3 flex flex-col gap-2">
      {currShopDescription === undefined ? (
        <GenericDescription currShop={currShop} />
      ) : (
        <CompanyDescription
          currShop={currShop}
          currShopDescription={currShopDescription}
        />
      )}
    </div>
  );
}

function GenericDescription({ currShop }: { currShop: string }) {
  return (
    <>
      <h3 className="text-3xl">{currShop}</h3>
      <hr className="border-gray-700" />
      <NoImageFound />

      <p className="mt-6">
        This shop is not in our database, please help us improve the website by{" "}
        <span>
          <a
            className="cursor-pointer underline"
            href="https://github.com/alexsohn1126/CanuckCarto"
          >
            contributing!
          </a>
        </span>
      </p>
    </>
  );
}

function NoImageFound() {
  return (
    <>
      <img
        className="h-72 mx-auto max-h-64 object-scale-down"
        src="logo.png"
        crossOrigin="anonymous"
      />
      <p className="text-[10px] text-gray-500">
        No image available for this brand, if you could take add a picture of
        this store to{" "}
        <span>
          <a href="https://commons.wikimedia.org/wiki/Main_Page">
            Wikimedia Commons
          </a>
        </span>
        , that would be amazing!
      </p>
    </>
  );
}

function CompanyDescription({
  currShop,
  currShopDescription,
}: {
  currShop: string;
  currShopDescription: ShopDescription;
}) {
  return (
    <>
      <h3 className="text-3xl">{currShop}</h3>
      <hr className="border-gray-700" />
      {typeof currShopDescription.imageFile === "string" &&
      typeof currShopDescription.imageAttribution === "string" ? (
        <>
          <img
            className="h-72 mx-auto max-h-64 object-scale-down"
            src={currShopDescription["imageFile"]}
            crossOrigin="anonymous"
          />
          <p
            className="text-[10px] text-gray-500"
            dangerouslySetInnerHTML={{
              __html: currShopDescription["imageAttribution"],
            }}
          />
        </>
      ) : (
        <NoImageFound />
      )}
      <p className="mt-6">{currShopDescription["description"]}</p>
      <p className="text-xs text-gray-500">
        Text content adapted from:
        <br />
        <a
          className="underline cursor-pointer"
          href={currShopDescription["source"]}
        >
          Source (click here)
        </a>
      </p>
    </>
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
        Welcome to CanuckCarto! I have compiled a map of various businesses in
        Canada.
      </p>
      <p>
        I am currently looking for an entry-level software developer position,
        in Ottawa region, or remote.
        <br />
        If you are looking for a software developer, please click the linkedin
        logo below to contact me!
      </p>
      <p>
        If you like this website, please consider donating by clicking{" "}
        <img src="kofi-mark.svg" className="inline w-6 h-6" /> button below.
      </p>
      <p>
        If you have technical issues with the website, please raise an issue at
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
