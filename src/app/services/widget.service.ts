import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WidgetService {
    private widgets: any[] = JSON.parse(localStorage.getItem('widgets') || '[]');

    getWidgets() {
        return this.widgets;
    }

    addWidget(type: string) {
        const newWidget = { type, data: this.fetchData(type) };
        this.widgets.push(newWidget);
        this.saveWidgets(this.widgets);
    }

    removeWidget(index: number) {
        this.widgets.splice(index, 1);
        this.saveWidgets(this.widgets);
    }

    saveWidgets(widgets: any[]) {
        localStorage.setItem('widgets', JSON.stringify(widgets));
    }
    fetchData(type: string) {
        switch (type) {
            case 'chart':
                return [
                    { name: 'January', value: 65 },
                    { name: 'February', value: 59 },
                    { name: 'March', value: 80 },
                    { name: 'April', value: 45 }
                ];
            case 'table':
                return ['Row 1', 'Row 2', 'Row 3'];
            case 'text':
                return 'Sample text data';
            default:
                return null;
        }
    }
}
