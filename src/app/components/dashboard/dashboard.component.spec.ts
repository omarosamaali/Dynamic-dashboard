import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { WidgetService } from '../../services/widget.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { BehaviorSubject } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let widgetService: jasmine.SpyObj<WidgetService>;
    const mockWidgets = [
        { id: 1, type: 'chart', title: 'Sales Chart' },
        { id: 2, type: 'table', title: 'Revenue Table' }
    ];

    beforeEach(async () => {
        const spy = jasmine.createSpyObj('WidgetService', [
            'getWidgets',
            'saveWidgets',
            'addWidget',
            'removeWidget'
        ]);
        spy.getWidgets.and.returnValue(mockWidgets);
        spy.addWidget.and.callFake((type: string) => ({
            id: 3,
            type,
            title: `New ${type}`
        }));

        await TestBed.configureTestingModule({
            imports: [
                DashboardComponent,
                NoopAnimationsModule
            ],
            providers: [
                { provide: WidgetService, useValue: spy }
            ]
        }).compileComponents();

        widgetService = TestBed.inject(WidgetService) as jasmine.SpyObj<WidgetService>;
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load widgets on init', () => {
        expect(widgetService.getWidgets).toHaveBeenCalled();
        expect(component.widgets).toEqual(mockWidgets);
    });

    it('should add new widget', () => {
        const widgetType = 'chart';
        component.addWidget(widgetType);

        expect(widgetService.addWidget).toHaveBeenCalledWith(widgetType);
        expect(component.widgets.length).toBe(3);
    });

    it('should remove widget', () => {
        component.removeWidget(0);

        expect(widgetService.removeWidget).toHaveBeenCalledWith(0);
        expect(component.widgets.length).toBe(1);
    });

    it('should handle drag and drop', () => {
        const dropEvent = {
            previousIndex: 0,
            currentIndex: 1,
            container: null as any,
            previousContainer: null as any,
            isPointerOverContainer: true,
            distance: { x: 0, y: 0 }
        } as CdkDragDrop<any[]>;

        component.onDrop(dropEvent);

        expect(widgetService.saveWidgets).toHaveBeenCalled();
        expect(component.widgets[0]).toEqual(mockWidgets[1]);
        expect(component.widgets[1]).toEqual(mockWidgets[0]);
    });

    it('should update layout on window resize', () => {
        const event = new Event('resize');
        window.dispatchEvent(event);
        fixture.detectChanges();

        expect(component.widgets).toBeDefined();
    });
});