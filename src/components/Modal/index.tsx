import { useClickOutside } from "hooks/useClickOutside";
import useLocalStorage from "hooks/useLocalStorage";

const Heart = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
  </svg>
);

const HeartFilled = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="red"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
    ></path>
  </svg>
);

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

const ShareIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"></path>
  </svg>
);

type IProps = {
  image: string;
  alt: string;
  id: string;
  onClose: () => void;
};

function copyToClipboardWithParams(params: Record<string, string>): void {
  const queryParams = new URLSearchParams(window.location.search);

  Object.entries(params).forEach(([key, value]) => {
    queryParams.set(key, value);
  });

  const url = `${window.location.origin}${
    window.location.pathname
  }?${queryParams.toString()}`;

  navigator.clipboard.writeText(url);
}

const Modal = ({ image, alt, onClose, id }: IProps) => {
  const [favList, setFavList] = useLocalStorage("favList", []);
  const ref = useClickOutside<HTMLDivElement>(() => {
    onClose();
  });

  const handleLove = () => {
    if (favList.some((e) => e === id))
      setFavList(favList.filter((e) => e !== id));
    else setFavList([...favList, id] as any);
  };

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
          <div
            className="absolute top-3 right-3 cursor-pointer"
            onClick={onClose}
          >
            <CloseIcon />
          </div>

          <div
            className="absolute bottom-3 right-3 cursor-pointer"
            onClick={handleLove}
          >
            {(favList || []).some((e: string) => e === id) ? (
              <HeartFilled />
            ) : (
              <Heart />
            )}
          </div>

          <div
            className="absolute bottom-3 right-12 cursor-pointer"
            onClick={() => copyToClipboardWithParams({image, id, alt})}
          >
           <ShareIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
