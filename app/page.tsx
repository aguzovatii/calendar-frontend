import HeatMap from './calendar-heatmap';
import EventCreator from './event-creator';

// TODO: investigate why we are need to force to make the page dynamic
// https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic
export const dynamic = 'force-dynamic'

export default async function Page() {
  let now = new Date();

  let startDate = new Date(now);
  startDate.setMonth(startDate.getMonth() - 6)
  
  let endDate = new Date(now);
  endDate.setMonth(endDate.getMonth() + 6)

  const calendar = await getCalendar()
  console.log(calendar)
  for(var event of calendar.events) {
    event.date_time = new Date(event.date_time);
  }

  let values = [];
  for (var d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    let count = 0;
    
    for(var event of calendar.events) {
      if (event.date_time.getUTCFullYear() === d.getUTCFullYear() && event.date_time.getUTCMonth() === d.getUTCMonth() && event.date_time.getUTCDate() === d.getUTCDate()) {
        count=count+1;
      }
    }

    values.push({date: new Date(d), count: count});
  }

  let eventsByDate = new Map<string, string[]>();
  for(var event of calendar.events) {
    // let key = event.date_time.getUTCFullYear().toString().concat('-').concat(event.date_time.getUTCMonth().toString()).concat('-').concat(event.date_time.getUTCDate().toString());
    let key = event.date_time.toISOString().slice(0, 10)

    if(!eventsByDate.has(key)) {
      eventsByDate.set(key, []);
    }

    eventsByDate.get(key).push(event.name);
  }

  return (
    <>
      <HeatMap
        startDate={startDate}
        endDate={endDate}
        values={values}
        eventsByDate={eventsByDate}
      />
      <EventCreator/>
    </>
  )
}

async function getCalendar(): Promise<Calendar> {
  try {
    const res = await fetch('http://127.0.0.1:8080/calendar/aguzovatii', {cache: 'no-store'})

    if(!res.ok){
      throw new Error('Failed to fetch data')
    }

    return res.json()
  } catch (err) {
    return new Promise((resolve, reject) => { resolve({id: 'aguzovatii', events: []}); });
  }
}

interface Calendar {
  id: string;
  events: Event[];

}

interface Event {
date_time: Date;
id: string;
name: string;
}