import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { LOGOUT } from '../redux/constants';

const Logout = () => {

  const navigator = useNavigate();
  const dispath = useDispatch();

  useEffect(() => {
    dispath({type: LOGOUT})

    navigator('/')
  })


  return (
    <div>Logout</div>
  )
}

export default Logout