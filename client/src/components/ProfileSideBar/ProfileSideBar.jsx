import React from 'react'
import './ProfileSideBar.css'
import { AiOutlinePaperClip } from 'react-icons/ai'

const ProfileSideBar = ({user}) => {
    return (
        <div className='profileSideBarContainer'>
            <div className="profileSideBarCard">
                <div className="innerProfileCard">
                    <div className="profileImgContainer">
                        <img src={user?.profile_img} alt="profileImg" />
                    </div>

                    <div className="profileInfo">
                        <h6 className="profileUserName">{user?.username}</h6>
                        <div className="profileName">
                            <span className="Name">{user?.first_name}</span>
                            <span className="Name">{user?.last_name}</span>
                        </div>

                        <div className="furtherInfo">
                            <span className="email">{user?.email}</span>
                            <span className="Phone">{user?.phone_number}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profileSideBarUpload">
                <h6 className="uploadTitle">Select Profile Image</h6>
                <div className="uploadSection">
                    <div className="uploadIcon">
                        <label htmlFor="file-input">
                            <AiOutlinePaperClip />
                        </label>

                        <input id="file-input" type="file" />
                    </div>

                    <div className="uploadDesc">
                        <span className="uploadDescItem">Choose Your Image</span>
                        <span className="uploadDescItem">JPG, WEBP, PNG max size 600kB</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSideBar