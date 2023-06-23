import React, { useState, useEffect } from 'react'
import { sendReservationData } from '../../api/api'
import {useNavigate} from 'react-router-dom'
import './BookingSummary.css'

const BookingSummary = ({ rooms , info }) => {

    const [userData, setUserData] = useState();
    const [totalCost , setTotalCost] = useState({total: 0  , tax : 0 , eachRoomTotalCost: []});
    const navigator = useNavigate();
    console.log(rooms);
    console.log(info)
    
    useEffect(() => {
        setUserData({checkIn: info.checkIn , checkOut: info.checkOut , adults_count: info.adults , children_count: info.children , rooms: info.rooms})
    } , [info])
    
    useEffect(() => {
        
        var eachRoomTotalCost = [];
        const roomsData = info?.rooms
        console.log(roomsData);
        const sum = roomsData?.reduce((sum, singleRoom) => {
            
            const currentRoom = rooms?.find(currentRoomItem => currentRoomItem.name === singleRoom.name)
            console.log(currentRoom)
            const costPerDay = Number(currentRoom?.costPerDay);
            const roomCount = Number(singleRoom?.count);
            const total = (costPerDay * roomCount);

            eachRoomTotalCost.push(total); 
            
            return sum + total;
        } , 0)

        setTotalCost({total: sum + (0.09 * sum) + 10 , tax: 0.09 * sum , eachRoomTotalCost})
    } , [rooms , info])


    const handleClick = async(e) => {
        e.preventDefault();

        const dataForAPI = {...userData, eachRoomTotalCost: totalCost?.eachRoomTotalCost};
        console.log(dataForAPI)

        const {data} = await sendReservationData(dataForAPI);
        
        if(data?.isCreated){
            navigator('/')
        }

    }

    return (
        <form className="BookingSummaryCard">
            <div className="BookingSummaryHeader">
                <h3 className="summaryTitle">Your Price Summary</h3>
            </div>

            <div className="BookingSummaryInfo">
                <div className="prices">
                    {
                        rooms?.map((room , index) => (
                            <div className="signlePrice" key={room.name}>
                                <h4 className="priceTitle">{room.name}</h4>
                                <span className="priceQuantity">$ {
                                    totalCost.eachRoomTotalCost[index]
                                }</span>
                            </div>
                        ))
                    }

                    <div className="signlePrice">
                        <h4 className="priceTitle">9 % VAT</h4>
                        <span className="priceQuantity">$ {totalCost.tax}</span>
                    </div>

                    <div className="signlePrice">
                        <h4 className="priceTitle">City tax</h4>
                        <span className="priceQuantity">$ 10</span>
                    </div>

                    <div className="total">
                        <h4 className="totalPriceTitle">Total Price:</h4>
                        <span className="totalPrice">$ {totalCost.total}</span>
                    </div>
                </div>

                <span className="note">* This price is converted to show you the cost in € at today’s exchange rate.</span>

                <button className="finalReserve" onClick={(e) => handleClick(e)}>Reserve Now</button>
            </div>
        </form>
    )
}

export default BookingSummary