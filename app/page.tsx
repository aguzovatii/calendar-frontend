import { GetServerSideProps } from 'next'
import Image from 'next/image'

async function getCalendar(): Promise<Calendar> {
  const res = await fetch('http://127.0.0.1:8080/calendar/id')

  if(!res.ok){
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {

  const calendar = await getCalendar()
  const events = calendar.events;
  console.log(calendar);

  return (
    <div>
      <h1>{calendar.id}</h1>
      <h1>{calendar.start}</h1>
      <h1>{calendar.end}</h1>
      {events.map((event : Event) => 
      <>
        <h1>&nbsp; &nbsp; &nbsp; &nbsp;{event.name}</h1>
        <h1>&nbsp; &nbsp; &nbsp; &nbsp;{event.date}</h1>
        </>)}
    </div>

  )
}

interface Calendar {
    end: string;
    start: string;
    id: string;
    events: Event[];

}

interface Event {
  date: string;
  id: string;
  name: string;
}
