import type { ParallaxDelegate } from "./parallax-engine";

export class ParallaxContainerDelegate implements ParallaxDelegate {
  private bounds: DOMRect | null = null;
  private readonly SCALE = 1.15;

  constructor(
    private container: HTMLElement,
    private content: HTMLElement,
  ) {}

  measure = () => {
    this.bounds = this.container.getBoundingClientRect();
  };

  apply(x: number, y: number) {
    const maxX =
      (this.content.offsetWidth * this.SCALE - this.container.offsetWidth) / 2;

    const maxY =
      (this.content.offsetHeight * this.SCALE - this.container.offsetHeight) /
      2;

    const tx = -x * Math.max(0, maxX) * 0.6;
    const ty = -y * Math.max(0, maxY) * 0.25;

    this.content.style.transform = `
      translate3d(${tx}px, ${ty}px, 0)
      scale(${this.SCALE})
    `;
  }

  reset() {
    this.content.style.transform = `scale(${this.SCALE})`;
  }
}
