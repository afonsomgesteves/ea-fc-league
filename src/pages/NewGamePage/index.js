import React, { useEffect, useState } from 'react'
import NewGameForm from '../../components/NewGameForm'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '../../firebase'
import styles from './style.module.css'

export default function NewGamePage() {
  const [players, setPlayers] = useState([])

  const getPlayersData = async () => {
    const playersArray = []
    const playersData = await getDocs(collection(firestore, 'players'))
    playersData.forEach((p) => playersArray.push({ id: p.id, ...p.data() }))
    setPlayers(playersArray)
  }

  useEffect(() => {
    getPlayersData()
  }, [])

  return (
    <div className={styles.container}>
      <h1>Registar jogo</h1>
      <NewGameForm players={players} />
    </div>
  )
}
