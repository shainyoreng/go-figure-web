import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { PatchedGestureConfig } from '@app/gesture-config';
import { InspirationComponent } from './inspiration/inspiration.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DrawingRecentComponent } from './drawing/recent/drawing-recent.component';
import { DrawingCreatorComponent } from './drawing/creator/drawing-creator.component';
import { DrawableCanvasComponent } from './canvas/drawable/drawable-canvas.component';
import { DraggableCanvasComponent } from './canvas/draggable/draggable-canvas.component';
import { DrawingAnimatorComponent } from '@app/drawing/animator/drawing-animator.component';

@NgModule({
  declarations: [
    AppComponent,
    InspirationComponent,
    DrawingRecentComponent,
    DrawingCreatorComponent,
    DrawableCanvasComponent,
    DraggableCanvasComponent,
    DrawingAnimatorComponent,
    PageNotFoundComponent,
  ],
  imports: [
    //browser modules come first
    BrowserModule,
    BrowserAnimationsModule,

    FormsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: PatchedGestureConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }