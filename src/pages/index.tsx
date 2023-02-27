import Head from "next/head";
import * as React from "react";
import { Inter } from "@next/font/google";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import TopBar from "@/components/TopBar";
import { Box, Stack, Divider } from "@mui/material/";
import Legend from "@/components/Legend";
import Calendar from "@/components/Calendar";
import {ThemeProvider} from "@mui/material";
import MuiTheme from "@/pages/MuiTheme";

const inter = Inter({ subsets: ["latin"] });

export default function Home(this: any) {
  const [time, setTime] = useState<Date | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    fetch("/api/time")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setTime(new Date(json.time));
      });
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);


  // calendar stuff
  // this has to be here (i think) because two different componenets need these :sob:
  const [currentDate, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date()); // to highlight a selected date, maybe not needed
  const [yearView, setYearView] = useState(false); // to determine which view

  // to help print things
  const days = ["SUN", "MON", "TUES", "WED", "THUR", "FRI", "SAT"];

  // helper functions/the like state setter whatevers
  function changeView() {
    setYearView(!yearView);
  }

  // following/previous month/year depending on view
  // yearView is true (shows the year) by default
  function getFollowing(){
      yearView ? 
      setDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1))
      :
      setDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  }

  function getPrevious(){
    yearView ? 
    setDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1))
    :
    setDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  }

  function getFirstDayOfMonth(date: Date) {
      // 0 - 6 for sun - mon
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  function getDaysInMonth(date: Date) {
      // 0 in date param will get the highest date aka days in a month
      // but for some reason the months param goes from 1-12 
      // and the getMonth() returns 0-11????
      // so inconsistent >:(
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); 
  }

  return (
    <ThemeProvider theme={MuiTheme}>
      <Head></Head>
      <main>
        {/* <Stack direction="column" alignItems="stretch"> */}
        <Box height="100vh" display="flex" flexDirection="column">
          <TopBar 
          following ={getFollowing} 
          previous = {getPrevious} 
          currentDate = {currentDate}
          yearView = {yearView}
          changeView = {changeView}
          />

          <Stack
            direction="row"
            className="mainS"
            divider={<Divider orientation="vertical" flexItem />}
            justifyContent="space-between"
            spacing={0.1}
            alignItems="stretch"
          >
            <Legend></Legend>
            <Calendar 
            firstDay = {getFirstDayOfMonth} 
            daysInMonth = {getDaysInMonth} 
            days = {days}
            currentDate = {currentDate}
            yearView = {yearView}
            />
          </Stack>
        </Box>
        {/* </Stack> */}
      </main>
    </ThemeProvider>
  );
}
