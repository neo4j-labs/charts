export default interface ReportProps {
    database?: string;
    query: string;
    source: string;
}

export interface ChartReportProps extends ReportProps {
    stacked?: boolean;
    layout?: 'horizontal' | 'vertical';
    config?: Record<string, any>
}