import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRoomsSummary } from '../../api/api'
import './GridAlbum.css'

const GridAlbum = () => {

    const [Rooms, setRooms] = useState(null);

    useEffect(() => {
        const getRooms = async () => {
            const { data } = await getRoomsSummary();
            console.log(data)

            setRooms(data.allRoomTypes);
        }

        getRooms();
    }, [])


    return (
       Rooms && <div className="albumContainer">
            <div className="albumGridContainer">
                <div className="item" id="item1"  style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)), url(${Rooms[0].room_img})`}}>
                    <span>{Rooms[0].room_name}</span>
                    <div className="itemOverlay">
                        <div className="overlayBtn">
                            <Link to={`/room/${Rooms[0]._id}/`} >Show Room</Link>
                        </div>
                    </div>
                </div>

                <div className="item" id="item2" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)), url(${Rooms[1].room_img})`}}>
                    <span>{Rooms[1]?.room_name}</span>
                    <div className="itemOverlay">
                        <div className="overlayBtn">
                            <Link to={`/room/${Rooms[1]?._id}/`}>Show Room</Link>
                        </div>
                    </div>
                </div>

                <div className="item" id="item3"  style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)), url(${Rooms[2].room_img})`}}>
                    <span>{Rooms[2]?.room_name}</span>
                    <div className="itemOverlay">
                        <div className="overlayBtn">
                            <Link to={`/room/${Rooms[2]?._id}/`}>Show Room</Link>
                        </div>
                    </div>
                </div>

                <div className="item" id="item4">
                    <span>{Rooms[3]?.room_name}</span>
                    <div className="itemOverlay">
                        <div className="overlayBtn">
                            <Link to={`/room/${Rooms[3]?._id}/`}>Show Room</Link>
                        </div>
                    </div>
                </div>

                <div className="item" id="item5">
                    <span>{Rooms[4]?.room_name}</span>
                    <div className="itemOverlay">
                        <div className="overlayBtn">
                            <Link to={`/room/${Rooms[4]?._id}/`}>Show Room</Link>
                        </div>
                    </div>
                </div>

                <div className="item" id="item6">
                    <span>{Rooms[5]?.room_name}</span>
                    <div className="itemOverlay">
                        <div className="overlayBtn">
                            <Link to={`/room/${Rooms[5]?._id}/`}>Show Room</Link>
                        </div>
                    </div>
                </div>

                <div className="item" id="item7">
                    <span>{Rooms[6]?.room_name}</span>
                    <div className="itemOverlay">
                        <div className="overlayBtn">
                            <Link to={`/room/${Rooms[6]?._id}/`}>Show Room</Link>
                        </div>
                    </div>
                </div>

                <div className="item" id="item8">
                    <span>{Rooms[7]?.room_name}</span>
                    <div className="itemOverlay">
                        <div className="overlayBtn">
                            <Link to={`/room/${Rooms[7]?._id}/`}>Show Room</Link>
                        </div>
                    </div>
                </div>

                <div className="item" id="item9">
                    <span>{Rooms[8]?.room_name}</span>
                    <div className="itemOverlay">
                        <div className="overlayBtn">
                            <Link to={`/room/${Rooms[8]?._id}/`}>Show Room</Link>
                        </div>
                    </div>
                </div>

                <div className="item" id="item10">
                    <span>{Rooms[9]?.room_name}</span>
                    <div className="itemOverlay">
                        <div className="overlayBtn">
                            <Link to={`/room/${Rooms[9]?._id}/`} >Show Room</Link>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default GridAlbum