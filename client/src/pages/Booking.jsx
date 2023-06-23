import React, { useEffect , useState } from 'react'
import {fetchReserveInfo} from '../api/api'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import BookingDetail from '../components/BookingDetail/BookingDetail'
import RoomsCard from '../components/RoomsCard/RoomsCard'
import BookingSummary from '../components/BookingSummary/BookingSummary'

const Booking = () => {

  const [info , setInfo] = useState({})
  const [roomData , setRoomData] = useState()

  useEffect(() => {
    const url = window.location.href;
    /* console.log(url); */
    const rootUrl = window.location.origin + '/Booking'
    const rootUrlLength = rootUrl.length
    /* console.log(rootUrlLength); */
    const params = url.slice(rootUrlLength + 1)

    const values = params.split('&');
    let checkIn, checkOut, adults, children, rooms = [] ,roomsName = [];
    for (const key in values) {
      var item = values[key];
      item = item.split('=');

      switch (item[0]) {
        case 'checkIn':
          checkIn = item[1];
          /* console.log(checkIn); */
          break;

        case 'checkOut':
          checkOut = item[1];
          /* console.log(checkOut); */
          break;

        case 'adults':
          adults = item[1];
          /* console.log(adults); */
          break;

        case 'children':
          children = item[1];
          /* console.log(children); */
          break;

        default:
          roomsName.push(item[0].replace(/%20/g, " "));
          rooms.push({ name: item[0].replace(/%20/g, " "), count: item[1] });
         /*  console.log(rooms); */

      }
        setInfo({checkIn , checkOut , rooms , adults , children})
    }

    const getData = async() => {
      /* console.log(roomsName); */
      const {data} = await fetchReserveInfo({room : roomsName});
      console.log(data)
      setRoomData(data)
    }

    getData()
  }, [])

  return (
    <div>
      <Navbar covered />
      <BookingDetail rooms={info?.rooms} checkIn={info?.checkIn} checkOut={info?.checkOut} />
      {/* <RoomsCard rooms={roomData} guests={Number(info?.adults) + Number(info?.children)}/> */}
      <BookingSummary rooms={roomData} info={info} />
      <Footer />
    </div>
  )
}

export default Booking