import React from 'react'
import Icon  from '../Table/Icon/Icon'
import './RoomSummary.css'

const RoomSummary = ({ services }) => {
    return (
        <section className="RoomSummaryContainer">
            <h4 className="titleRoomInfo">
                Room Aminities
            </h4>

            <div className="aminitiesContainer">
                {


                    services.map(service => (
                        <span>
                            {

                                <div className="aminitesItem">
                                    <Icon item={service} className="icons" />
                                    {service}
                                </div>

                            }
                        </span>
                    ))
                }
            </div>
        </section>
    )
}

export default RoomSummary