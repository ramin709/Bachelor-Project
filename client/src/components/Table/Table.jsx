import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { useSearchParams } from 'react-router-dom'
import { fetchBookNow, getBookNow } from '../../api/api'
import { useNavigate } from 'react-router-dom'
import HeaderForm from '../HeaderForm/HeaderForm'
import {
    MdBalcony, MdWifi, MdOutlineWaves, MdOutlineSafetyDivider, MdBathtub, MdIron, MdFitnessCenter,
    MdMonitor, MdOutlinePets, MdKitchen, MdVolumeOff
} from 'react-icons/md'
import { GiShower, GiTeapot, GiWoodBeam, GiBugNet, GiElectricalSocket } from 'react-icons/gi'
import { IoMdSnow } from 'react-icons/io'
import { FaGlassCheers, FaSwimmer, FaMountain, FaWind } from 'react-icons/fa'
import './Table.css'

export const Icon = ({ item }) => {
    const map1 = new Map([
        ['Air Conditioning', IoMdSnow],
        ['Balcony', MdBalcony],
        ["Free Wifi", MdWifi],
        ['Sea View', MdOutlineWaves],
        ['Mountain View', FaMountain],
        ['Private Bathroom', GiShower],
        ['Safe', MdOutlineSafetyDivider],
        ['Bath Tub', MdBathtub],
        ['Electric Kettle', GiTeapot],
        ['Hairdryer', FaWind],
        ['Hardwood Floor', GiWoodBeam],
        ['Iron', MdIron],
        ['Minibar', FaGlassCheers],
        ['Mosquito Net', GiBugNet],
        ['Pets Allowed', MdOutlinePets],
        ['Private Kitchenette', MdKitchen],
        ['Public Fitness Centre', MdFitnessCenter],
        ['Public Swimming Pool', FaSwimmer],
        ['Socket near the bed', GiElectricalSocket],
        ['Sound Proof', MdVolumeOff],
        ["TV", MdMonitor]
    ]);

    const selectedIcon = map1.get(item)

    return selectedIcon ? selectedIcon() : null
}

const Table = () => {

    let [searchParams, setSearchParams] = useSearchParams();
    const [recommended, setRecomended] = useState([])
    const [reserved, setReserved] = useState({ rooms: new Map() })
    const navigator = useNavigate();

    const ref = useRef();

    useEffect(() => {
        async function sendData() {
            const checkIn = searchParams.get('checkIn');
            const checkOut = searchParams.get('checkOut');
            const rooms = searchParams.get('rooms');
            const adults = searchParams.get('adults');
            const children = searchParams.get('children');
            ref.current.textContent = '';

            const readyData = { checkIn, checkOut, rooms, adults, children }

            if (readyData.rooms !== null) {

                if (readyData.checkIn) {
                    setReserved({ ...reserved, checkIn, checkOut, children, adults });
                }

                const { data } = await fetchBookNow(readyData);
                const { Error, response } = data
                if (response.length > 0) {

                    setRecomended(response)
                } else {
                    ref.current.textContent = Error.checkOut
                    setRecomended(null)
                }
            }

            if (!checkIn) {
                const { data } = await getBookNow();
                setRecomended(data);
            }else {
                console.log('empty');
            }
        }

        sendData();


    }, [searchParams])


    console.log(recommended);
    console.log(reserved);

    const handleForm = (e) => {
        e.preventDefault();

        if (reserved?.checkIn) {

            if (reserved?.rooms.size > 0) {
                var listOfRooms = '';
                const newReserved = [...reserved.rooms.entries()]
                console.log(newReserved);
                for (let index = 0; index < newReserved.length; index++) {
                    listOfRooms += '&' + newReserved[index][0] + '=' + newReserved[index][1]
                }

                const url = `/Booking?checkIn=${reserved?.checkIn}&checkOut=${reserved?.checkOut}&adults=`
                    + `${reserved?.adults}&children=${reserved?.children}${listOfRooms} `
                navigator(url);
            } else {
                ref.current.textContent = 'No room has selected'
            }
        } else {
            ref.current.textContent = 'There is no checkIn or checkOut value'
        }
    }

    const handleChange = (e, roomName) => {
        /* console.log(e.target.value, roomName); */
        var existingRoom = reserved.rooms.get(roomName);
        if(existingRoom) {
            console.log(true);
            console.log(existingRoom)
        }

        setReserved({ ...reserved, rooms: reserved.rooms.set(roomName , e.target.value) });
    }

    return (
        <>
            <h2 className="title" ref={ref}>{ }</h2>
            <HeaderForm />
            <form>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="tableHeader">Room Type</th>
                            <th className="tableHeader">Sleeps</th>
                            <th className="tableHeader">Price per Night</th>
                            <th className="tableHeader">Services</th>
                            <th className="tableHeader">Select room</th>
                            <th className="tableHeader">Reserve</th>
                        </tr>
                    </thead>

                    <tbody>
                        {recommended &&
                            recommended?.map((room, index) => (
                                <tr key={index}>
                                    <td className="tableCells" id="tempHeader">
                                        <h4 className="titleRoom">
                                            {room.room_name}
                                        </h4>
                                    </td>
                                    <td className="smallTableCells">
                                        {
                                            [...Array(room.capacity)].map(item => <PersonIcon key={item} />)
                                        }
                                    </td>
                                    <td className="tableCells">
                                        <span className="roomCost">
                                            {room.cost_per_day} $
                                        </span>
                                    </td>
                                    <td className="tableCellsService">
                                        <div className="tableCellContainer">
                                            <div className="servicesContainer">
                                                {
                                                    room.services.map((service, index) => <span key={index}>{
                                                        <div className="services">
                                                            <Icon item={service} />
                                                            <span>{service}</span>
                                                        </div>

                                                    }</span>)

                                                }
                                            </div>
                                        </div>
                                    </td>
                                    <td className="tableCells">
                                        <select name="" id="" className="tableSelect" onChange={(e) => handleChange(e, room.room_name)}>
                                            {

                                                room.room_count - room.booked_count > 6 ?
                                                    <>
                                                        <option value="0">0 &nbsp; &nbsp; &nbsp; ({0 * room.cost_per_day}$)</option>
                                                        <option value="1">1 &nbsp; &nbsp; &nbsp; ({1 * room.cost_per_day}$)</option>
                                                        <option value="2">2 &nbsp; &nbsp; &nbsp; ({2 * room.cost_per_day}$)</option>
                                                        <option value="3">3 &nbsp; &nbsp; &nbsp; ({3 * room.cost_per_day}$)</option>
                                                        <option value="4">4 &nbsp; &nbsp; &nbsp; ({4 * room.cost_per_day}$)</option>
                                                        <option value="5">5 &nbsp; &nbsp; &nbsp; ({5 * room.cost_per_day}$)</option>
                                                        <option value="6">6 &nbsp; &nbsp; &nbsp; ({6 * room.cost_per_day}$)</option>
                                                    </> :

                                                    <>
                                                        {
                                                            [...Array(room.room_count - room.booked_count + 1)].map((cost, number) => (
                                                                <option value={number}>{number} &nbsp; &nbsp; &nbsp; ({number * room.cost_per_day}$)</option>
                                                            ))
                                                        }
                                                    </>
                                            }
                                        </select>
                                    </td>

                                    {
                                        index === 0 ? <td className="ReserveCell">
                                            <button className="buttonTable" onClick={(e) => handleForm(e)}>Reserve</button>
                                        </td> : null
                                    }
                                </tr>

                            ))
                        }


                    </tbody>


                </table>
            </form>
        </>
    )
}

export default Table