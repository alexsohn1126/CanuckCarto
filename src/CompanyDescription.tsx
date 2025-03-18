import brandData from "../data/american_shops.json";
const brand: Record<string, Record<string, string>> = brandData;

function Description({ company }: { company: string }) {
  const companyObj = brand[company];
  return (
    <div className="description p-3 flex flex-col gap-2">
      <h3 className="text-3xl">{company}</h3>
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
      <p>{companyObj["description"]}</p>
      <p className="text-xs text-gray-500">
        Text content adapted from Wikipedia (CC BY-SA 4.0).
        <br />
        <a className="text-[10px]" href={companyObj["source"]}>
          Wikipedia article for {company}
        </a>
      </p>
    </div>
  );
}

export default Description;
