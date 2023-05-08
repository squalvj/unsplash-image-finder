import { useClickOutside } from "hooks/useClickOutside";

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
  </svg>
);

type IProps = {
  image: string;
  alt: string;
  onClose: () => void;
};

const Modal = ({ image, alt, onClose }: IProps) => {
  const ref = useClickOutside<HTMLDivElement>(() => {
    onClose();
  });

  if (image === "") return null;

  return (
    <>
      <div className="bg-black opacity-70 fixed w-full h-full left-0 top-0 z-10"></div>
      <div className="fixed flex justify-center items-center opacity-100 z-20 top-0 left-0 w-screen h-screen">
        <div
          ref={ref}
          className="border-white min-w-[calc(100vw/2)] relative border-8 max-w-full w-[calc(100vw-30px)] sm:max-w-[calc(100vw/2)] h-[calc(100vh-50px)] before:bg-slate-400 before:absolute before:top-0 before:left-0 before:w-full before:h-full"
        >
          <img
            className="w-full h-full object-cover absolute top-0 left-0"
            src={image}
            alt={alt}
          />
          <div className="absolute top-3 right-3 cursor-pointer" onClick={onClose}>
            <CloseIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
