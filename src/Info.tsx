import Description from "./CompanyDescription";

function Info({ currShop }: { currShop: string }) {
  return (
    <div className="flex flex-col max-w-[15svw] min-w-[15svw] bg-[#fefefe] drop-shadow-lg z-500">
      <Description currShop={currShop} />
      <div className="flex mt-auto mb-2 gap-1 mx-auto">
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
