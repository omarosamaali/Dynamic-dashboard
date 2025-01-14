import { Component, Output, EventEmitter, Input, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
  template: `
    <mat-card>
      <mat-card-header class="widget-header">
        <mat-card-title>{{ type | titlecase }}</mat-card-title>
        <button mat-icon-button (click)="remove.emit()">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlVaPw_t7b8V7QDBdpWjOOzatwnbijnbnzsQ&s" alt="">
        </button>
      </mat-card-header>
      <mat-card-content>
        <div *ngIf="type === 'chart'" style="width: 100%; height: 300px;">
          <canvas #chartCanvas></canvas>
        </div>
        <div *ngIf="type === 'text'">{{ data }}</div>
        <div *ngIf="type === 'table' && isArray(data)">
          <div *ngFor="let row of data">{{ row }}</div>
        </div>
      </mat-card-content>
    </mat-card>
  `
})
export class WidgetComponent implements OnInit, OnDestroy {
  @Input() type!: string;
  @Input() data: any;
  @Output() remove = new EventEmitter<void>();
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | undefined;
  isArray = Array.isArray;

  ngOnInit() {
    if (this.type === 'chart' && this.data) {
      setTimeout(() => this.createChart(), 0);
    }
  }

  private createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.data.map((item: any) => item.name),
          datasets: [{
            label: 'Values',
            data: this.data.map((item: any) => item.value),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}