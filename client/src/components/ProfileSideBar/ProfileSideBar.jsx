import React from 'react'
import './ProfileSideBar.css'
import { AiOutlinePaperClip } from 'react-icons/ai'
import {changeProfileImg} from '../../api/api.js'

const ProfileSideBar = ({user}) => {


    const handleUpload = async(e) => {
        const formData = new FormData();
        formData.append('file' , e.target.files[0])
        const {data} = await changeProfileImg(formData);
        console.log(data);
    }

    return (
        <div className='profileSideBarContainer'>
            <div className="profileSideBarCard">
                <div className="innerProfileCard">
                    <div className="profileImgContainer">
                        <img src={user?.profileImg} alt="profileImg" />
                    </div>

                    <div className="profileInfo">
                        <h6 className="profileUserName">{user?.username}</h6>
                        <div className="profileName">
                            <span className="Name">{user?.firstName}</span>
                            <span className="Name">{user?.lastName}</span>
                        </div>

                        <div className="furtherInfo">
                            <span className="email">{user?.email}</span>
                            <span className="Phone">{user?.phoneNumber}</span>
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

                        <input id="file-input" type="file" onChange={(e) => handleUpload(e)} />
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