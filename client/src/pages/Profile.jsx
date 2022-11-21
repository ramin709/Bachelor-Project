import React , {useEffect , useState} from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import ProfileSideBar from '../components/ProfileSideBar/ProfileSideBar.jsx'
import ProfileMainCard from '../components/ProfileMainCard/ProfileMainCard'
import '../assets/pageStyles/Profile.css'
import {getUserData} from '../api/api.js'

const Profile = () => {

  const [user, setUser] = useState('');
  console.log('user is' , user);

  useEffect(() => {
    const getUserInfo = async() => {
      const {data} = await getUserData();
      setUser(data.user);
    }

    getUserInfo();
  } , [])


  return (
    <div className='profileContainer'>
      <Navbar />
      <main className="mainProfile">
        <ProfileSideBar user={user} />
        <ProfileMainCard user={user} />
      </main>
      <Footer />
    </div>
  )
}

export default Profile