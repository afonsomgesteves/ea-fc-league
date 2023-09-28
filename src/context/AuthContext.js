import { useContext, createContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { PlayerInitStruc, auth, firestore } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({
      hd: 'caixamagica.pt',
    })
    signInWithPopup(auth, provider)
  }

  const logOut = () => {
    signOut(auth)
  }

  useEffect(() => {
    navigate('/')
  }, [user])

  const getUserInfo = async (currentUser) => {
    if (currentUser) {
      const userRef = doc(firestore, 'players', currentUser.uid)
      const userDoc = await getDoc(userRef)
      if (userDoc.exists()) {
        const userData = userDoc.data()
        return { ...currentUser, name: userData.name }
      } else return { ...currentUser, name: currentUser.displayName }
    }
    return null
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      const updatedUser = await getUserInfo(currentUser)
      setUser(updatedUser)
      console.log('User', currentUser)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userRef = doc(firestore, 'players', user.uid)
      const userDoc = await getDoc(userRef)
      // If the user document does not exist, create a new one.
      if (!userDoc.exists()) {
        await setDoc(userRef, PlayerInitStruc(user.displayName, user.email), {
          merge: true,
        })
      }
    }
  })

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}
