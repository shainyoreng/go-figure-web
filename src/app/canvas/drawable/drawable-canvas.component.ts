import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, OnInit, HostListener } from '@angular/core';

import { Vector } from '@app/structures/vector';
import { Drawing } from '@app/canvas/drawable/drawing';
import { Point3D } from '@app/structures/point';
import { CanvasManager } from '@app/canvas/canvas_manager';
import { EventRouter } from '@app/canvas/drawable/event-router';
import { InputSeries } from '@app/canvas/drawable/input-series';

@Component({
  selector: 'iai-drawable-canvas',
  templateUrl: './drawable-canvas.component.html',
  styleUrls: ['./drawable-canvas.component.scss']
})
export class DrawableCanvasComponent implements OnInit {
  canvasManager: CanvasManager;
  drawing: Drawing;
  eventRouter: EventRouter;
  inputSeries: InputSeries = new InputSeries;

  @Input() height: number;
  @Input() width: number;
  @ViewChild('canvas') canvas: ElementRef;
  @Output() drawingUpdated = new EventEmitter<Point3D[]>();
  @Output() canvasInitialized = new EventEmitter<CanvasManager>();

  ngOnInit() {
    if (this.width === undefined || this.height === undefined) {
      throw new Error("A valid width and height need to be provided to the drawable canvas.")
    }
  }

  ngAfterViewInit() {
    this.canvasManager = new CanvasManager(this.canvas.nativeElement);
    this.drawing = new Drawing(this.canvasManager, this.inputSeries, this.drawingUpdated);
    this.eventRouter = new EventRouter(this.drawing);
    this.canvasInitialized.emit(this.canvasManager);
  }

  @HostListener('document:touchstart', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  stopTouchScrollOnCanvas(event) {
    if (event.target === this.canvasManager.element)
      event.preventDefault();
  }

  shouldShowCountdown() {
    return !!this.drawing && this.drawing.cursorPressed;
  }
}