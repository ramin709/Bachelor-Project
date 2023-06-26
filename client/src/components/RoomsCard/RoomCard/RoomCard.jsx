import {useEffect , useState} from 'react'
import Icon  from '../../Table/Icon/Icon'
import { MdOutlineRoomService } from 'react-icons/md'
import { GiConfirmed } from 'react-icons/gi'
import './RoomCard.css'
import { getUserNameAndLastName } from '../../../api/api'

const RoomCard = ({ room, guest }) => {

    const [userInfo, setUserInfo] = useState({})
    useEffect(() => {
        const getUserInfo = async() => {
            const {data} = await getUserNameAndLastName();
            console.log(data);
            setUserInfo(data);
        }

        getUserInfo();
    }, [])

    console.log(room)

    return (
        <div className="RoomCardContainer">
            <div className="innerRoomCard">
                <h4 className="RoomCardTitle">{room.name}</h4>
            </div>

            <div className="roomCardInfo">
                <GiConfirmed className="roomCardIcon" /> Your room will be ready for check-in at 14:00
            </div>
            <div className="roomCardInfo">
                <MdOutlineRoomService className="roomCardIcon" /> 24-hour front desk – Help whenever you need it!
            </div>

            <div className="roomServices">
                {
                    room.services.map((service) => <span key={Object.values(service)[0]}>{

                        <div className="roomServiceItem">
                            <Icon item={service.service} />
                            <span>{service.service}</span>
                        </div>

                    }</span>)
                }

            </div>

            <div className="guestsNumber">
                <h4 className="guestTitle">Number of guests:</h4>
                <span>{guest}</span>
            </div>

            <div className="guestsNumber">
                <h4 className="guestTitle">Full guest name: </h4>
                <span>{userInfo?.firstName}  {userInfo?.lastName}</span>
            </div>
        </div>
    )
}

export default RoomCard