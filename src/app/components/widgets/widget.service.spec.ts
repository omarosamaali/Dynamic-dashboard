import { TestBed } from '@angular/core/testing';
import { WidgetService } from '../../services/widget.service';

describe('WidgetService', () => {
    let service: WidgetService;
    const mockWidgets = [
        { id: 1, type: 'chart', title: 'Sales Chart' },
        { id: 2, type: 'table', title: 'Revenue Table' }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [WidgetService]
        });
        service = TestBed.inject(WidgetService);
        localStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get widgets from localStorage', () => {
        localStorage.setItem('widgets', JSON.stringify(mockWidgets));
        const widgets = service.getWidgets();
        expect(widgets).toEqual(mockWidgets);
    });

    it('should remove widget', () => {
        localStorage.setItem('widgets', JSON.stringify(mockWidgets));

        service.removeWidget(0);
        const widgets = service.getWidgets();

        expect(widgets.length).toBe(1);
        expect(widgets[0]).toEqual(mockWidgets[1]);
    });

    it('should save widgets', () => {
        service.saveWidgets(mockWidgets);

        const savedWidgets = JSON.parse(localStorage.getItem('widgets') || '[]');
        expect(savedWidgets).toEqual(mockWidgets);
    });
});