import { ParallaxContainer } from "./components/parallax-container";
import { ParallaxImageGallery } from "./components/parallax-image";
import "./index.css";

// Using picsum with seed for consistent unique images
const images = [
  {
    src: "https://picsum.photos/seed/gallery1/1080/720",
    width: 1080,
    height: 720,
    alt: "Landscape vista",
  },
  {
    src: "https://picsum.photos/seed/gallery4/600/900",
    width: 600,
    height: 900,
    alt: "Vertical frame",
  },
  {
    src: "https://picsum.photos/seed/gallery4/600/900",
    width: 600,
    height: 900,
    alt: "Vertical frame",
  },
  {
    src: "https://picsum.photos/seed/gallery2/540/920",
    width: 540,
    height: 920,
    alt: "Portrait composition",
  },
  {
    src: "https://picsum.photos/seed/gallery3/800/600",
    width: 800,
    height: 600,
    alt: "Urban scene",
  },
  {
    src: "https://picsum.photos/seed/gallery3/800/600",
    width: 800,
    height: 600,
    alt: "Urban scene",
  },

  {
    src: "https://picsum.photos/seed/gallery4/600/900",
    width: 600,
    height: 900,
    alt: "Vertical frame",
  },
  {
    src: "https://picsum.photos/seed/gallery1/1080/720",
    width: 1080,
    height: 720,
    alt: "Landscape vista",
  },
  {
    src: "https://picsum.photos/seed/gallery1/1080/720",
    width: 1080,
    height: 720,
    alt: "Landscape vista",
  },
  {
    src: "https://picsum.photos/seed/gallery4/600/900",
    width: 600,
    height: 900,
    alt: "Vertical frame",
  },
  {
    src: "https://picsum.photos/seed/gallery4/600/900",
    width: 600,
    height: 900,
    alt: "Vertical frame",
  },
  {
    src: "https://picsum.photos/seed/gallery2/540/920",
    width: 540,
    height: 920,
    alt: "Portrait composition",
  },
  {
    src: "https://picsum.photos/seed/gallery3/800/600",
    width: 800,
    height: 600,
    alt: "Urban scene",
  },
  {
    src: "https://picsum.photos/seed/gallery3/800/600",
    width: 800,
    height: 600,
    alt: "Urban scene",
  },

  {
    src: "https://picsum.photos/seed/gallery4/600/900",
    width: 600,
    height: 900,
    alt: "Vertical frame",
  },
  {
    src: "https://picsum.photos/seed/gallery1/1080/720",
    width: 1080,
    height: 720,
    alt: "Landscape vista",
  },
  {
    src: "https://picsum.photos/seed/gallery2/540/920",
    width: 540,
    height: 920,
    alt: "Portrait composition",
  },
  {
    src: "https://picsum.photos/seed/gallery3/800/600",
    width: 800,
    height: 600,
    alt: "Urban scene",
  },
  {
    src: "https://picsum.photos/seed/gallery3/800/600",
    width: 800,
    height: 600,
    alt: "Urban scene",
  },

  {
    src: "https://picsum.photos/seed/gallery4/600/900",
    width: 600,
    height: 900,
    alt: "Vertical frame",
  },
  {
    src: "https://picsum.photos/seed/gallery1/1080/720",
    width: 1080,
    height: 720,
    alt: "Landscape vista",
  },
];

export function App() {
  return (
    <div className="mx-auto">
      <div>
        <ParallaxContainer>
          <ParallaxImageGallery images={images} />
        </ParallaxContainer>
      </div>
    </div>
  );
}

export default App;
