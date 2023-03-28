import * as React from 'react'
import { useEffect, useState } from 'react'
import { Category } from '@/interfaces/Category'
import { Event } from '@/interfaces/Event'
import { APIManager } from '@/utils/APIManager'

const CalendarContext = React.createContext<CalendarStoreValue | undefined>(
  undefined
)

interface CalendarStoreValue {
  currentDate: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
  isYearView: boolean
  changeView: (date?: Date) => void
  dayClickCount: number
  selectedDate: undefined | string
  toggleBarOnDateClick: (num: number, date?: any) => void
  events: Event[]
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>
  catMap: Map<number, string>
  updateCatMap: (category: Category[]) => void
  selectedEvent: number
  setSelectedEvent: React.Dispatch<React.SetStateAction<number>>
}

export const useCalendarContext = () => {
  const calendarContext = React.useContext(CalendarContext)
  if (calendarContext === undefined) {
    throw new Error('useCalendarContext must be called inside a GlobalStore')
  }
  return calendarContext
}

const CalendarStore = ({ children }: any) => {
  const [currentDate, setDate] = useState(new Date())
  const [yearView, setYearView] = useState(false)
  const [dayClickCount, setDayClickCount] = useState(0)
  const [selectedDate, setSelectedDate] = useState<undefined | string>(undefined)
  const [events, setEvents] = React.useState<Event[]>([])
  const [catMap, setCatMap] = useState(new Map())
  const [selectedEvent, setSelectedEvent] = useState(0)

  const updateCatMap = (categories: Category[]) => {
    let tempMap = new Map()
    for (let i = 0; i < categories.length; i++) {
      tempMap.set(categories[i].category_id, categories[i].category_name)
    }
    setCatMap(tempMap)
  }

  const changeView = (date?: Date) => {
    setYearView(!yearView)
    if (yearView && date !== undefined) {
      setDate(new Date(date.getFullYear(), date.getMonth(), 1))
    }
  }

  const toggleBarOnDateClick = (num: number, date?: any) => {
    num === 0 ? setDayClickCount(0) : setDayClickCount(dayClickCount + 1)
    setSelectedDate(date)
  }

  const calendarStoreValues: CalendarStoreValue = {
    currentDate: currentDate,
    setDate: setDate,
    isYearView: yearView,
    changeView: changeView,
    dayClickCount: dayClickCount,
    selectedDate: selectedDate,
    toggleBarOnDateClick: toggleBarOnDateClick,
    events: events,
    setEvents: setEvents,
    catMap: catMap,
    updateCatMap: updateCatMap,
    selectedEvent: selectedEvent,
    setSelectedEvent: setSelectedEvent
  }

  return (
    <CalendarContext.Provider value={calendarStoreValues}>
      {children}
    </CalendarContext.Provider>
  )
}

export default CalendarStore
