import React, { useRef, useState  } from 'react'
import Navbar from '../Navbar/Navbar'
import {useDispatch} from 'react-redux'
import { Link , useNavigate } from 'react-router-dom'
import {signInUser, signUpUser} from '../../redux/actions/user.js'
import './Sign.css'
const Sign = ({ signUp }) => {

    const [SignData, setSignData] = useState({ username: '', password: '', confirm_password: '', firstName: '', lastName: '', check: '' })
    const [submit, setSubmit] = useState(false);
    const dispath = useDispatch();
    const [loginData, setLoginData] = useState({ username: '', password: '' })
    var inputList = { username: '', password: '', confirm_password: '', firstName: '', lastName: '', check: '' }

    const navigator = useNavigate();

    const style = { border: '2px solid red' }
    const style2 = { border: '2px solid rgba(27, 27, 48, 0.726)' }

    var isInputEmpty = true;

    const errorRef = useRef();
    const checkRef = useRef();

    const handleForm = (e) => {
        isInputEmpty = false;
        e.preventDefault();


        if (signUp) {
            Object.keys(SignData).forEach((item => {

                if (SignData[item] === '') {
                    isInputEmpty = true;
                    inputList[item] = true;

                    if (item === 'check') {
                        checkRef.current.textContent = 'You have to check this'
                        checkRef.current.style.color = 'red'
                    }
                }
            }))
        } else {
            Object.keys(loginData).forEach((item => {

                if (loginData[item] === '') {
                    isInputEmpty = true;
                    inputList[item] = true;

                    if (item === 'check') {
                        checkRef.current.textContent = 'You have to check this'
                        checkRef.current.style.color = 'red'
                    }
                }
            }))
        }

        if (isInputEmpty) {
            errorRef.current.textContent = 'Some of your inputs are empty';
            errorRef.current.style.color = 'red';
            setSubmit({
                username: inputList.username,
                password: inputList.password,
                confirm_password: inputList.confirm_password,
                firstName: inputList.firstName,
                lastName: inputList.lastName
            });
        } else {
            if(signUp){
                dispath(signUpUser(SignData , navigator))
            }else{
                console.log(loginData);
                dispath(signInUser(loginData , navigator))
            }   
        }
    }

    return (

        <form className="container">
            <Navbar />

            <div className="innerContainer">
                {
                    signUp ?
                        <div className="box">
                            <h4>Sign Up</h4>
                            <span ref={errorRef}></span>
                            <input type="text"
                                className="inputs"
                                placeholder="Username"
                                onChange={(e) => setSignData({ ...SignData, username: e.target.value })}
                                style={submit.username === true ? style : style2}
                                onFocus={() => { errorRef.current.textContent = ''; setSubmit(false); }}
                            />

                            <input type="text"
                                className="inputs"
                                placeholder="First Name"
                                onChange={(e) => setSignData({ ...SignData, firstName: e.target.value })}
                                style={submit.firstName === true ? style : null}
                                onFocus={() => { errorRef.current.textContent = ''; setSubmit(false); }}
                            />

                            <input type="text"
                                className="inputs"
                                placeholder="Last Name"
                                onChange={(e) => setSignData({ ...SignData, lastName: e.target.value })}
                                style={submit.lastName === true ? style : null}
                                onFocus={() => { errorRef.current.textContent = ''; setSubmit(false); }}
                            />

                            <input type="password"
                                className="inputs"
                                placeholder="Password"
                                onChange={(e) => setSignData({ ...SignData, password: e.target.value })}
                                style={submit.password === true ? style : null}
                                onFocus={() => { errorRef.current.textContent = ''; setSubmit(false); }}
                            />

                            <input type="password"
                                className="inputs"
                                placeholder="Confirm Password"
                                onChange={(e) => setSignData({ ...SignData, confirm_password: e.target.value })}
                                style={submit.confirm_password === true ? style : null}
                                onFocus={() => { errorRef.current.textContent = ''; setSubmit(false); }}
                            />

                            <div className="radioContainer">
                                <input type="radio"
                                    id="radio"
                                    className="radio"
                                    onChange={() => { setSignData({ ...SignData, check: true }); checkRef.current.textContent = ''; errorRef.current.textContent = '' }}
                                />

                                <label htmlFor="radio">
                                    I accept tems and conditions
                                </label>
                            </div>
                            <span ref={checkRef}>

                            </span>

                            <button className="btn"
                                onClick={(e) => handleForm(e)}>Sign Up</button>

                            <span>Already have an account? <Link to="/signIn">Sign In</Link></span>
                        </div>

                        :

                        <div className="box">
                            <h4>Sign In</h4>
                            <span ref={errorRef}></span>
                            <input type="text"
                                className="inputs"
                                placeholder="Username"
                                style={submit.username === true ? style : null}
                                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                                onFocus={() => { errorRef.current.textContent = ''; setSubmit(false); }}
                            />

                            <input type="password"
                                className="inputs"
                                placeholder="Password"
                                style={submit.password === true ? style : null}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                onFocus={() => { errorRef.current.textContent = ''; setSubmit(false); }}
                            />
                            <button className="btn"
                                onClick={(e) => handleForm(e)}>
                                Sign In
                            </button>

                            <span>Don't you have an account? <Link to="/signUp">Sign Up</Link></span>
                        </div>
                }
            </div>
        </form>
    )
}

export default Sign