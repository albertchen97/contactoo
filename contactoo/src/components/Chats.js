import React, { useRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import { auth } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'

export default function Chats() {
  const history = useHistory()
  const { user } = useAuth()  // useAuth == useContext == returns context value == our user
  const [loading, setLoading] = useState(true)

  // get file given url, we are looking for a user photo
  const getFile = async (url) => {
    const response = await fetch(url, {
      mode: 'no-cors' // no-cors bypasses firebase project's CORS restrictions (they block access to photourl)
    })
    const data = await response.blob()  // blobs are files you want to get in binary format, we want a blob for our image
    return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' })
  }

  useEffect(() => {
    // if not auth user, go back to homepage
    if (!user) {
      history.push('/')
      return
    }

    // request get existing user from chatengine api
    // provide project-id where user is in + their info to find them
    axios.get('https://api.chatengine.io/users/me/', {
      headers: {
        'Project-ID': process.env.REACT_APP_CHAT_ENGINE_ID,
        "Private-Key": process.env.REACT_APP_CHAT_ENGINE_KEY,
        'User-Name': 'sample',
        'User-Secret': 'sample'
      }
    }
      // {
      //   headers: {
      //     'Project-ID': process.env.REACT_APP_CHAT_ENGINE_ID,
      //     // 'user-name': user.email,
      //     // 'user-secret': user.uid,
      //     "Private-Key": process.env.REACT_APP_CHAT_ENGINE_KEY
      //   }
      // }
    )
      .then(() => {
        // once api resolves the get promise, we are done loading
        setLoading(false)
      })
      .catch(() => {
        // if api rejects the get promise (user doesn't exist yet), we want to create new user
        let formdata = new FormData()
        formdata.append('email', user.email)
        formdata.append('username', user.email)
        formdata.append('secret', user.uid)

        // get user's profile pic
        getFile(user.photoURL)
          .then((avatar) => {
            formdata.append('avatar', avatar, avatar.name)
            // now to create new user since user doesn't exist yet on chatengine
            // axios post is requesting chatengine api to create something
            axios.post('https://api.chatengine.io/users/', formdata, {
              headers: {
                'Private-key': process.env.REACT_APP_CHAT_ENGINE_KEY
              }
            })
              .then(() => setLoading(false)) // if post request is resolved (successful) then done loading
              .catch((error) => console.log(error)) // if post request is rejected then log reject value
          })
      })
  }, [user, history])

  const handleLogout = async () => {
    // wait for await statement to finish before doing rest of function
    // await is like a promise, it can return a resolve or reject variable depending if promise is resolved
    await auth.signOut()
    history.push('/')
  }

  // chatengine component wants us to give it user data in it's props, but we must wait for that data to be fetched
  // put a loading screen until user data is finished being fetched
  if (!user || loading) return (
    <div>
      loading
    </div>
  )

  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className='logo-tab'>
          Unichat
        </div>
        <div onClick={handleLogout} className='logout-tab'>
          logout
        </div>
      </div>

      <ChatEngine
        height='calc(100vh-66px)'
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  )
}
