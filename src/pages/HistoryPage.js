/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import GameHistoryTable from '../components/GameHistoryTable'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { firestore } from '../firebase'

export default function HistoryPage() {
  const [games, setGames] = useState([])

  const getGamesData = async () => {
    const gamesData = await getDocs(
      query(collection(firestore, 'games'), orderBy('timestamp', 'desc'))
    )
    const gamesArray = await Promise.all(
      gamesData.docs.map(async (doc) => doc.data())
    )
    setGames(gamesArray)
  }

  useEffect(() => {
    getGamesData()
  }, [])

  useEffect(() => {
    console.log(games)
  }, [games])

  return (
    <div>
      <h1>History</h1>
      {games && <GameHistoryTable games={games} />}
    </div>
  )
}
