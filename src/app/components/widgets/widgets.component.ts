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
  templateUrl: './widgets.component.html'
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