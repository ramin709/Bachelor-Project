import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRoomsSummary } from '../../api/api'
import './GridAlbum.css'

const GridAlbum = () => {

    const [Rooms, setRooms] = useState(null);

    useEffect(() => {
        const getRooms = async () => {
            const { data } = await getRoomsSummary();
            setRooms(data);
        }

        getRooms();
    }, [])


    return (
        Rooms && <div className="albumContainer">
            <div className="albumGridContainer">
                {
                    Rooms.map((room, index) => (
                        <div className="item" id={`item${index+1}`} key={room.name} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)), url(${room?.roomImg})`}}>
                            <span>{room.name}</span>
                            <div className="itemOverlay">
                                <div className="overlayBtn">
                                    <Link to={`/room/${room.name}/`} >Show Room</Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default GridAlbum