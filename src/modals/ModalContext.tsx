import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  MouseEvent,
  JSX,
} from "react";
import WelcomeMessage from "./WelcomeMessage";
import AboutUs from "./AboutUs";

type ModalType = "welcome" | "about" | "";

interface ModalState {
  activeModal: ModalType;
  setActiveModal: Dispatch<SetStateAction<ModalType>>;
}

export const ModalContext = createContext<ModalState>({
  activeModal: "",
  setActiveModal: () => {
    throw "ModalContext Not Initialized";
  },
});

function ModalProvider({ children }: { children: JSX.Element }) {
  const [activeModal, setActiveModal] = useState<ModalType>("");

  useEffect(() => {
    const showWelcome = localStorage.getItem("showWelcome") || "";

    if (showWelcome === "") setActiveModal("welcome");
  }, []);

  return (
    <ModalContext.Provider value={{ activeModal, setActiveModal }}>
      {children}
      <ModalWrapper />
    </ModalContext.Provider>
  );
}

function ModalWrapper() {
  const { activeModal, setActiveModal } = useContext(ModalContext);

  const handleBackgroundClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      setActiveModal("");
    }
  };

  const permanentDismissWelcome = () => {
    localStorage.setItem("showWelcome", "false");
    setActiveModal("");
  };

  const onClose = () => setActiveModal("");

  if (activeModal === "") return null;

  return (
    <div
      className="fixed inset-0 w-screen h-screen backdrop-blur-sm bg-white/50 flex items-center justify-center z-[1000]"
      onClick={handleBackgroundClick}
    >
      <div className="animate-slideIn bg-white p-8 rounded-xl shadow-lg max-w-[500px] w-[90%] text-center relative">
        {activeModal === "welcome" && (
          <WelcomeMessage
            onClose={onClose}
            onPermanentClose={permanentDismissWelcome}
          />
        )}
        {activeModal === "about" && <AboutUs onClose={onClose} />}
      </div>
    </div>
  );
}

export default ModalProvider;
