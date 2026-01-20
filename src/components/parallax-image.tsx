import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ParallaxGalleryDelegate,
  type Layer,
} from "../controller/parallax-gallery-delegate";
import { useParallaxEngine } from "../hooks/use-parallax";

export type ImageData = {
  src: string;
  width: number;
  height: number;
  alt?: string;
};

export const ParallaxImageGallery = (props: { images: ImageData[] }) => {
  const { containerRef, delegate } = useParallaxEngine(
    (container) => new ParallaxGalleryDelegate(container),
  );

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] auto-rows-[4px] gap-5 grid-flow-dense"
    >
      {props.images.map((img, i) => (
        <ParallaxImageComponent
          key={`${img.src}-${i}`}
          registerLayer={delegate?.registerLayer}
          width={img.width}
          height={img.height}
          src={img.src}
          alt={img.alt}
          index={i}
        />
      ))}
    </div>
  );
};

export const ParallaxImageComponent = ({
  registerLayer,
  src,
  alt,
  width,
  height,
}: {
  src: string;
  registerLayer?: (layer: Layer) => () => void;
  index: number;
} & Partial<HTMLImageElement>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [rowSpan, setRowSpan] = useState<number>(1);
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ROW_HEIGHT = 24;
    const GAP = 16;

    const measure = () => {
      const h = containerRef.current!.getBoundingClientRect().height;
      const span = Math.ceil((h + GAP) / ROW_HEIGHT);
      setRowSpan(span);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!containerRef.current || !imgRef.current) return;

    const img = imgRef.current;
    const container = containerRef.current;

    const doRegister = () => {
      return registerLayer?.({ img, container });
    };

    if (img.complete && img.naturalWidth > 0) {
      return doRegister();
    }

    const onLoad = () => doRegister();
    img.addEventListener("load", onLoad);
    return () => img.removeEventListener("load", onLoad);
  }, [registerLayer]);

  return (
    <div
      ref={containerRef}
      className="relative break-inside-avoid transition-all w-full duration-500 ease-linear overflow-hidden grayscale-100 brightness-50 hover:grayscale-0 hover:brightness-100"
      style={{
        gridRowEnd: `span ${rowSpan}`,
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <div
        className={`absolute inset-0 bg-linear-to-br from-zinc-800 via-zinc-900 to-zinc-800 transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundSize: "200% 200%",
          animation: loaded ? "none" : "shimmer 1.5s ease-in-out infinite",
        }}
      />

      <img
        ref={imgRef}
        draggable={false}
        alt={alt || "Gallery image"}
        onLoad={() => setLoaded(true)}
        className={`
          w-full h-full object-cover absolute inset-0
          will-change-transform
          transition-[filter,opacity] duration-500 ease-out
          ${loaded ? "opacity-100" : "opacity-0"}
        `}
        style={{ transform: "scale(1.15)" }}
        src={src}
      />
    </div>
  );
};
