import React, { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./resizable.css";
interface ResizableProps {
  direction: "horizontal" | "vertical";
  // @ts-ignore
  children: React.Element<any>;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.65);
  let resizableProps: ResizableBoxProps;

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.65 < width) {
          setWidth(window.innerWidth * 0.65);
        }
      }, 100);
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [width]);

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      maxConstraints: [innerWidth * 0.65, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      width: width,
      height: Infinity,
      resizeHandles: ["e"],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 24],
      width: Infinity,
      height: 300,
      resizeHandles: ["s"],
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
