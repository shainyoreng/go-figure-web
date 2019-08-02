import { Point } from '@app/structures/point';

export class CanvasManager {
  scale: number = 1;
  origin: Point = new Point;
  element: HTMLCanvasElement;
  drawer: CanvasRenderingContext2D;

  constructor(element: HTMLCanvasElement) {
    this.element = element;
    this.drawer = element.getContext('2d');
  }

  getNativeElement(): HTMLCanvasElement {
    return this.element
  }

  clearCanvas() {
    this.drawer.clearRect(
      (-this.origin.x - 5000),
      (-this.origin.y - 5000),
      (this.element.width * 5000),
      (this.element.height * 5000)
    );
  }

  centerOn(point: Point) {
    let center = new Point(this.element.width / 2 / this.scale, this.element.height / 2 / this.scale);
    this.setOrigin(center.x - point.x * this.scale, center.y - point.y * this.scale);
  }

  setOrigin(x: number, y: number) {
    let deltaX = x - this.origin.x,
        deltaY = y - this.origin.y;

    this.origin = new Point(this.origin.x + deltaX, this.origin.y + deltaY);
    this.drawer.translate(deltaX, deltaY);
  }

  shiftOrigin(deltaX: number, deltaY: number) {
    deltaX = deltaX / this.scale;
    deltaY = deltaY / this.scale;

    this.origin = new Point(this.origin.x + deltaX, this.origin.y + deltaY);
    this.drawer.translate(deltaX, deltaY);
  }

  zoomIn() {
    this.zoom((this.scale + 0.1) / this.scale);
  }

  zoomOut() {
    this.zoom((this.scale - 0.1) / this.scale);
  }

  zoom(scale: number) {
    this.scale *= scale;
    this.drawer.scale(scale, scale);
  }

  paintPoint(p: Point) {
    this.drawer.beginPath();
    this.drawer.fillStyle = 'black';
    this.drawer.fillRect(p.x, p.y, 1, 1);
    this.drawer.closePath();
  }

  paintLine(start: Point, end: Point) {
    this.drawer.beginPath();
    this.drawer.moveTo(start.x, start.y);
    this.drawer.lineTo(end.x, end.y);
    this.drawer.stroke();
    this.drawer.closePath();
  }

  setStrokeStyle(style: string) {
    this.drawer.strokeStyle = style;
  }

  setLineWidth(width: number) {
    this.drawer.lineWidth = width;
  }

  getPng() {
    return this.element.toDataURL();
  }

}