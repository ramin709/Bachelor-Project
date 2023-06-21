import React, { useState, useEffect, useRef } from 'react'
import { sendProfileChange, sendChangePassData, getReservationHistory, addReview } from '../../api/api'
import './ProfileMainCard.css'
import {AiFillCloseCircle} from 'react-icons/ai'
import Rating from '@mui/material/Rating';

const ProfileMainCard = ({ user }) => {

    const EDIT_PROFILE = 'Edit Profile'
    const EDIT_PASSWORD = 'Edit Password'
    const History = 'Reserve History'

    console.log(user);

    const [activeTab, setActiveTab] = useState(EDIT_PROFILE);
    const [enableEdit, setEnableEdit] = useState(false);
    const [activeReview , setActiveReview] = useState('');
    const [review , setReview] = useState({rating: 0 , review: ''})
    const [history, setHistory] = useState([]);
    const ref = useRef();
    const [profileFormData, setProfileFormData] = useState({
        first_name: user?.first_name,
        last_name: user?.last_name,
        email: user?.email,
        phone_number: user?.phone_number,
        username: user?.username,
        gender: user?.gender,
        birthday: user?.birthday,
    })

    const [passwordFormData, setPasswordFormData] = useState({
        old_password: '',
        new_password: '',
        confirm_new_password: '',
    })

    useEffect(() => {
        const getHistory = async () => {
            const { data } = await getReservationHistory();
            console.log(data)
            setHistory(data);
        }

        if (activeTab === History) {
            getHistory();
        }

    }, [activeTab])


    const handleEdit = (e) => {
        e.preventDefault();
        setEnableEdit(true)
        ref.current.focus();
    }

    const handleTabChange = (tab) => {

        switch (tab) {
            case EDIT_PROFILE:
                setActiveTab(EDIT_PROFILE);
                break;
            case EDIT_PASSWORD:
                setActiveTab(EDIT_PASSWORD);
                break;
            case History:
                setActiveTab(History);
                break;
            default:
                return;
        }

        setEnableEdit(false)
    }

console.log(history)

    const handleChangeInfo = async (e) => {
        e.preventDefault();

        console.log(profileFormData);
        const data = await sendProfileChange(profileFormData);
        console.log(data);
    }

    const handlePasswordForm = async (e) => {
        e.preventDefault();

        const data = await sendChangePassData(passwordFormData);
        console.log(data);
    }

    const closeAddReview = (e) => {
        if (e.target.className === "overlay" || (e.target.localName === "path" || e.target.localName === "svg")) {
            setActiveReview({ rating: 0, review: '' });
            setReview({ review: '', rating: 0 });
        }
    }

    const sendReview = async() => {
        await addReview({ ...review, reservationId: activeReview?._id });
    }

    return (
        <div className='profileMainCardContainer'>
            <div className="profileMainCard">
                <div className="ProfileMainInnerCard">
                    <div className="cardTabsContainer">
                        <ul className="cardTabs">
                            <li className={`cardTabItem ${activeTab === EDIT_PROFILE ? "activeTab" : ""}`} onClick={() => handleTabChange(EDIT_PROFILE)}>
                                Edit Information
                            </li>

                            <li className={`cardTabItem ${activeTab === EDIT_PASSWORD ? "activeTab" : ""}`} onClick={() => handleTabChange(EDIT_PASSWORD)}>
                                Change Password
                            </li>

                            <li className={`cardTabItem ${activeTab === History ? "activeTab" : ""}`} onClick={() => handleTabChange(History)}>
                                Reserve History
                            </li>
                        </ul>
                    </div>

                    {
                        activeTab === EDIT_PROFILE ?
                            <form className="profileForm">
                                <h5 className="profileFormTitle">Profile Information</h5>
                                <div className="profileFormInputs">
                                    <div className="profileInputItem">
                                        <label htmlFor="firstName">First Name</label>
                                        <input type="text" ref={ref}
                                            name="first_name"
                                            id="firstName"
                                            disabled={!enableEdit}
                                            onChange={(e) => setProfileFormData({ ...profileFormData, first_name: e.target.value })}
                                            defaultValue={user?.first_name}
                                        />
                                    </div>
                                    <div className="profileInputItem">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input type="text" name="last_name" id="lastName" disabled={!enableEdit}
                                            onChange={(e) => setProfileFormData({ ...profileFormData, last_name: e.target.value })}
                                            defaultValue={user?.last_name}
                                        />
                                    </div>
                                    <div className="profileInputItem">
                                        <label htmlFor="email">Email</label>
                                        <input type="text" name="email" id="email" disabled={!enableEdit}
                                            defaultValue={user?.email}
                                            onChange={(e) => setProfileFormData({ ...profileFormData, email: e.target.value })} />
                                    </div>
                                    <div className="profileInputItem">
                                        <label htmlFor="Phone">Phone</label>
                                        <input type="text" name="phone" id="Phone" disabled={!enableEdit}
                                            defaultValue={user?.phone_number}
                                            onChange={(e) => setProfileFormData({ ...profileFormData, phone: e.target.value })} />
                                    </div>
                                    <div className="profileInputItem">
                                        <label htmlFor="userName">Username</label>
                                        <input type="text" name="username" id="userName" disabled={!enableEdit}
                                            defaultValue={user?.username}
                                            onChange={(e) => setProfileFormData({ ...profileFormData, username: e.target.value })} />
                                    </div>
                                    <div className="profileInputItem">
                                        <label htmlFor="userName">Birth Date</label>
                                        <input type="date" name="username" id="userName" disabled={!enableEdit}
                                            defaultValue={user?.birthday}
                                            onChange={(e) => setProfileFormData({ ...profileFormData, birth_date: e.target.value })} />
                                    </div>
                                    <div className="radioProfileContainer">

                                        <label htmlFor="male" className="radioLabel">Male
                                            <input className="profileRadioInput" name="gender" type="radio" value="male" id="male"
                                                disabled={!enableEdit}
                                                defaultChecked={user?.gender === "male" ? true: null}
                                                onChange={(e) => setProfileFormData({ ...profileFormData, gender: e.target.value })} />
                                            <span className="checkmark"></span>
                                        </label>


                                        <label htmlFor="female" className="radioLabel">Female
                                            <input className="profileRadioInput" name="gender" type="radio" value="female" id="female"
                                                disabled={!enableEdit}
                                                defaultChecked={user?.gender === "female" ? true: null}
                                                onChange={(e) => setProfileFormData({ ...profileFormData, gender: e.target.value })} />
                                            <span className="checkmark"></span>
                                        </label>

                                    </div>

                                </div>
                                <div className="profileFormBtn">
                                    <button className="profileBtn" onClick={(e) => handleChangeInfo(e)}>Save Changes</button>
                                    <button className="profileBtn" onClick={(e) => handleEdit(e)}>Edit Information</button>
                                </div>
                            </form> : null}
                    {
                        activeTab === EDIT_PASSWORD ?
                            <form className="profileForm">
                                <h5 className="profileFormTitle">Change Password</h5>
                                <div className="profileFormPasswords">
                                    <div className="profilePassItem">
                                        <label htmlFor="oldPassword">Old Password</label>
                                        <input type="password" name="old_password" id="oldPassword"
                                            disabled={!enableEdit}
                                            onChange={(e) => setPasswordFormData({ ...passwordFormData, old_password: e.target.value })} />
                                    </div>
                                    <div className="profilePassItem">
                                        <label htmlFor="newPassword">New Password</label>
                                        <input type="password" name="new_password" id="newPassword"
                                            disabled={!enableEdit}
                                            onChange={(e) => setPasswordFormData({ ...passwordFormData, new_password: e.target.value })} />
                                    </div>
                                    <div className="profilePassItem">
                                        <label htmlFor="confirm_new_password">Confirm New Password</label>
                                        <input type="password" name="confirm_new_password" id="confirm_new_password"
                                            disabled={!enableEdit}
                                            onChange={(e) => setPasswordFormData({ ...passwordFormData, confirm_new_password: e.target.value })} />
                                    </div>
                                </div>
                                <div className="profileFormBtn">
                                    <button className="profileBtn" onClick={(e) => handlePasswordForm(e)}>Save Changes</button>
                                    <button className="profileBtn" onClick={(e) => handleEdit(e)}>Edit Information</button>
                                </div>
                            </form> : null
                    }

                    {
                        activeTab === History ?

                            <div className="profileHistory">
                                <h5 className="profileFormTitle">Reserve History</h5>

                                <div className="innerProfileHistory">
                                    <table className="profileTable">
                                        <thead className="profileTableHeader">
                                            <tr>
                                                <th className="profileTableHeaderCell">Date</th>
                                                <th className="profileTableHeaderCell">No.Room</th>
                                                <th className="profileTableHeaderCell">Room Type</th>
                                                <th className="profileTableHeaderCell">Cost</th>
                                                <th className="profileTableHeaderCell">Review</th>
                                            </tr>
                                        </thead>
                                        <tbody className="profileTableBody">
                                            {
                                                history.map(singleHistory =>
                                                    singleHistory.roomsInfo.map(roomInfo =>
                                                        roomInfo.room_number.map(room => {
                                                            return (
                                                                <tr className="profileTableRow">
                                                                    <td className="profileTableBodyCell">
                                                                        {new Date(singleHistory.check_in).toDateString()} &nbsp;
                                                                        to
                                                                        &nbsp;
                                                                        {new Date(singleHistory.check_out).toDateString()}
                                                                    </td>
                                                                    <td className="profileTableBodyCell">{room}</td>
                                                                    <td className="profileTableBodyCell">{roomInfo.room_name}</td>
                                                                    <td className="profileTableBodyCell">$ {roomInfo.total_cost / roomInfo.count}</td>
                                                                    <td className="profileTableBodyCell" > <button className="addReviewBtn" onClick={() => setActiveReview(singleHistory)}>{singleHistory?.review ? 'Preview' : 'Add Review'}</button></td>
                                                                </tr>
                                                            )
                                                        })
                                                    )
                                                )
                                            }
                                        </tbody>
                                    </table>
                                    <div className="overlay" style={activeReview?._id ? { display: 'initial' } : { display: 'none' }} onClick={(e) => closeAddReview(e)}>
                                        <div className="addReviewCard" >
                                            <div className="addReviewCardContainer">
                                                <div className="addReviewCardHeader">
                                                    <h4 className="addReviewTitle">Write a review</h4>
                                                    <div className="addReviewCardCloseIcon">
                                                        <AiFillCloseCircle style={{ width: '100%', height: '100%' }} onClick={(e) => closeAddReview(e)} />
                                                    </div>
                                                </div>

                                                <div className="addReviewContent">
                                                    <div className="addReviewInputContainer">
                                                        <label htmlFor="rating" className="addReviewLabel">Rating</label>
                                                        <Rating id="rating" className="ratingComp" readOnly={activeReview?.review ? true : false} value={activeReview?.rating ? activeReview.rating : review.rating} onChange={(e) => setReview({ ...review, rating: e.target.value })}></Rating>
                                                    </div>

                                                    <div className="addReviewTextContainer">
                                                        <label htmlFor="review" className="addReviewLabel">Review</label>
                                                        <textarea name="review" id="review" className="addReviewTextarea" disabled={activeReview?.review ? true : false} value={activeReview?.review && activeReview.review} onChange={(e) => setReview({ ...review, review: e.target.value })}></textarea>
                                                    </div>
                                                </div>

                                                {
                                                    activeReview?.review ? null : <div className="addReviewCardFooter">
                                                        <button className="addReviewBtn" onClick={(e) => sendReview(e)}>Send</button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> :

                            null
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileMainCard