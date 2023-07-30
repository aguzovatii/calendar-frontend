'use client'

import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip } from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';

export default function HeatMap({startDate, endDate, values, eventsByDate}) {

    return (
        <>
        <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={values}
            tooltipDataAttrs={value => { return value.date != null ? { 'data-tooltip-id': "my-tooltip", 'data-tooltip-place': "top", 'data-tooltip-content': `${value.date.toISOString().slice(0, 10)} has count: ${value.count }. Events: ${eventsByDate.get(value.date.toISOString().slice(0, 10))}`, } : { 'data-tooltip-id': "my-tooltip", 'data-tooltip-place': "top", 'data-tooltip-content': '0', }; }}
            showWeekdayLabels={true}
            classForValue={(value) => {
            if (!value || value.count === 0) {
                return 'color-empty';
            }
            return `color-scale-${Math.min(Math.floor(value.count/3), 4)}`;
            }}
        />
        <Tooltip id="my-tooltip"/>
        </>
    )
}
