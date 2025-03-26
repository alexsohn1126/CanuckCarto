function Disclaimer({ onClose }: { onClose: () => void }) {
  return (
    <>
      <button
        className="absolute top-4 right-4 bg-transparent border-none text-xl cursor-pointer text-gray-500 hover:text-gray-700"
        onClick={onClose}
      >
        &times;
      </button>

      <h3 className="text-gray-800 text-xl font-semibold mt-0 mb-3">
        Website Disclaimer
      </h3>

      <p className="mb-4">
        <strong className="font-medium">Last Updated:</strong> March 19th, 2025
      </p>

      <p className="mb-4">
        This website is intended{" "}
        <strong className="font-medium">for informational purposes only</strong>
        . We compile publicly available data about businesses operating in
        Canada.
      </p>

      <ul className="list-none pl-0 space-y-4">
        <li>
          <strong className="font-medium">
            🔍 No Endorsement or Discouragement:
          </strong>
          <br />
          <span className="text-gray-600">
            This site does <em className="italic">not</em> endorse, promote, or
            discourage patronage of any listed business. Inclusion does not
            reflect quality, legality, or reputation.
          </span>
        </li>

        <li>
          <strong className="font-medium">📝 Accuracy Notice:</strong>
          <br />
          <span className="text-gray-600">
            Information is provided "as is" without guarantees. Always verify
            details directly with businesses.
          </span>
        </li>

        <li>
          <strong className="font-medium">⚖️ Third-Party Content:</strong>
          <br />
          <span className="text-gray-600">
            Trademarks and logos belong to their respective owners. We are not
            affiliated with listed entities.
          </span>
        </li>
      </ul>

      <hr className="my-5 border-gray-200" />

      <p className="text-xs text-gray-600">
        Contact me at{" "}
        <a
          href="mailto:[your@email.com]"
          className="text-blue-600 hover:underline"
        >
          alexsohn1126@gmail.com
        </a>{" "}
        with corrections or concerns.
      </p>
    </>
  );
}

export default Disclaimer;
