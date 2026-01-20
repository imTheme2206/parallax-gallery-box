import { ParallaxContainerDelegate } from "../controller/parallax-container-delegate";
import { useParallaxEngine } from "../hooks/use-parallax";
import { useCallback, useEffect, useRef } from "react";

export const ParallaxContainer = (props: {
  reduceMotion?: boolean;
  children: React.ReactNode;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const { containerRef } = useParallaxEngine(
    (container) =>
      new ParallaxContainerDelegate(container, contentRef.current!),
    props.reduceMotion,
  );

  return (
    <div
      ref={containerRef}
      className="max-w-full w-full overflow-hidden grid place-items-center max-h-[80dvh]"
    >
      <div ref={contentRef} className="w-full h-full relative">
        <div className="w-dvw px-8 py-16">{props.children}</div>
      </div>
    </div>
  );
};
