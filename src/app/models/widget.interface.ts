export interface Widget {
    id: string;
    type: WidgetType;
    data: any;
    config?: WidgetConfig;
    position?: { x: number; y: number };
}

export type WidgetType = 'chart' | 'table' | 'text';

export interface WidgetConfig {
    title?: string;
    refreshInterval?: number;
    dimensions?: { width: number; height: number };
}

export interface ChartData {
    labels: string[];
    values: number[];
    type: 'bar' | 'line' | 'pie';
}

export interface TableData {
    headers: string[];
    rows: any[][];
}

export interface TextData {
    content: string;
    formatting?: {
        fontSize?: string;
        color?: string;
        alignment?: 'left' | 'center' | 'right';
    };
}

export interface TypedWidget extends Omit<Widget, 'data'> {
    type: WidgetType;
    data: ChartData | TableData | TextData;
}