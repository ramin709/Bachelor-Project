import { useState, useEffect } from 'react'
import './FeaturedRooms.css'
import { fetchFeaturedRooms } from '../../api/api'

const FeaturedRooms = () => {

    const [rooms, setRooms] = useState([{name: '' , costPerDay: 0 , roomImg: [] , description: ''}])

    useEffect(() => {
        const getData = async() => {
            const data  = await fetchFeaturedRooms()
            console.log(data)
            const pureData = data.data
            console.log(pureData)
            setRooms(pureData)
        }

        getData()
    }, [])

    console.log(rooms)
    return (
        <section>
            <h3 className="sectionTitle">Featured Rooms</h3>
            <div className="featuredRoomContainer">

                {rooms.map((room ,index) => 
                    (<div className="featuredRoom" key={index}>
                        <div className="imageSection">
                            {<img src={room?.roomImg} alt={room.name} />}
                        </div>
                        <div className="infoSection">
                            <h4 className="infoSectionTitle">{room.name}</h4>
                            <span className="cost">${room.costPerDay}/Night</span>
                            <p className="infoDescription">
                                {room.description}
                            </p>
                        </div>
                    </div>)
                )}
            </div>
        </section>
    )
}

export default FeaturedRooms