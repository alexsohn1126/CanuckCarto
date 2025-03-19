import { useState } from "react";

function Disclaimer() {
  const [isVisible, setIsVisible] = useState(false);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 w-screen h-screen backdrop-blur-sm bg-white/50 flex items-center justify-center z-[1000]">
      <div className="animate-slideIn bg-white p-8 rounded-xl shadow-lg max-w-[500px] w-[90%] text-center relative">
        <button
          className="absolute top-4 right-4 bg-transparent border-none text-xl cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={handleDismiss}
        >
          &times;
        </button>

        <h3 className="text-gray-800 text-xl font-semibold mt-0 mb-3">
          Website Disclaimer
        </h3>

        <p className="mb-4">
          <strong className="font-medium">Last Updated:</strong> [Insert Date]
        </p>

        <p className="mb-4">
          This website is intended{" "}
          <strong className="font-medium">
            for informational purposes only
          </strong>
          . We compile publicly available data about American-affiliated
          businesses operating in Canada.
        </p>

        <ul className="list-none pl-0 space-y-4">
          <li>
            <strong className="font-medium">
              🔍 No Endorsement or Discouragement:
            </strong>
            <br />
            <span className="text-gray-600">
              This site does <em className="italic">not</em> endorse, promote,
              or discourage patronage of any listed business. Inclusion does not
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
          Contact us at{" "}
          <a
            href="mailto:[your@email.com]"
            className="text-blue-600 hover:underline"
          >
            [your@email.com]
          </a>
          with corrections or concerns.
        </p>

        <button
          className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
          onClick={handleDismiss}
        >
          Begin
        </button>
      </div>
    </div>
  );
}

export default Disclaimer;
