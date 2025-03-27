import { useContext } from "react";
import { ModalContext } from "./ModalContext";

function WelcomeMessage({
  onClose,
  onPermanentClose,
}: {
  onClose: () => void;
  onPermanentClose: () => void;
}) {
  const { setActiveModal } = useContext(ModalContext);
  return (
    <>
      <button
        className="absolute top-4 right-4 bg-transparent border-none text-xl cursor-pointer text-gray-500 hover:text-gray-700"
        onClick={onClose}
      >
        &times;
      </button>

      <h2 className="text-2xl font-bold mb-4">Welcome to CanuckCarto! 👋</h2>
      <p className="text-gray-600 mb-6">
        I am Alex Sohn, and I made this website to help Canadians with buying
        Canadian.
      </p>

      <p className="text-gray-600 mb-6">
        If you like this website and would like to support me, please
        considering donating following the Ko-Fi link (
        <img src="kofi-mark.svg" className="inline w-6 h-6" />) on the bottom
        left corner.
      </p>

      <p className="text-gray-600 mb-6">
        I am looking for an Entry-level software engineering job, so if you
        would like to hire me, check out the bottom left corner for my LinkedIn!
      </p>

      <button
        className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
        onClick={onClose}
      >
        Begin
      </button>

      <div className="my-2">
        <button
          className="text-gray-500 text-sm hover:text-gray-700 underline"
          onClick={onPermanentClose}
        >
          Never show this again
        </button>
      </div>

      <p className="text-gray-400 text-xs">
        This site shares locations of businesses in Canada. I aim to inform, not
        endorse or discourage visits. Learn more in the{" "}
        <span
          className="cursor-pointer underline"
          onClick={() => setActiveModal("disclaimer")}
        >
          Disclaimer
        </span>
      </p>
    </>
  );
}

export default WelcomeMessage;
