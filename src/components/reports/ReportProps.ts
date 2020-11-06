export default interface ReportProps {
    query: string;
    source: string;
}

export interface ChartReportProps extends ReportProps {
    stacked?: boolean;
    layout?: 'horizontal' | 'vertical';
    config?: Record<string, any>
}