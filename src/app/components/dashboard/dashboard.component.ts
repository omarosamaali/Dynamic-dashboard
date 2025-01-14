import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { WidgetService } from '../../services/widget.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { WidgetComponent } from "../widgets/widgets.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    DragDropModule,
    CommonModule,
    WidgetComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  widgets: any[] = [];

  constructor(private widgetService: WidgetService) { }

  ngOnInit(): void {
    this.widgets = this.widgetService.getWidgets();
  }

  onDrop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.widgets, event.previousIndex, event.currentIndex);
    this.widgetService.saveWidgets(this.widgets);
  }

  addWidget(type: string) {
    this.widgetService.addWidget(type);
  }

  removeWidget(index: number) {
    this.widgetService.removeWidget(index);
  }
}
