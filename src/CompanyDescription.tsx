import brandData from "../data/american_shops.json";
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
  return (
    <div className="flex flex-col mx-2 mt-4 gap-4">
      <img
        className="h-1/2 w-1/2 m-auto drop-shadow-lg [image-rendering:pixelated]"
        src="logo.png"
      />
      <h3 className="text-3xl mx-auto mt-5">CanuckCarto</h3>
      <p>Welcome! I have compiled a map of american businesses in Canada.</p>
      <p>
        I do not endorse nor promote any of these businesses, this is purely for
        education and personal use.
      </p>
    </div>
  );
}

export default Description;
