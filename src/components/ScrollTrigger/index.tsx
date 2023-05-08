import { FC, useEffect, ReactNode } from "react";

interface ScrollTriggerProps {
  onTrigger: () => void;
  children: ReactNode;
}

const OFFSET_HEIGHT = 200

const ScrollTrigger: FC<ScrollTriggerProps> = ({ onTrigger, children }) => {
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const bottomOfPage = scrollTop + clientHeight >= scrollHeight - OFFSET_HEIGHT;
      if (bottomOfPage) {
        onTrigger();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onTrigger]);

  return <div>{children}</div>;
};

export default ScrollTrigger;
