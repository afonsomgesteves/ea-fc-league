/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import LeaderboardTable from '../components/LeaderboardTable'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '../firebase'

export default function LeaderboardPage() {
  const [players, setPlayers] = useState([])

  const getPlayersData = async () => {
    const playersArray = []
    const playersData = await getDocs(collection(firestore, 'players'))
    playersData.forEach((p) => playersArray.push(p.data()))
    setPlayers(playersArray)
  }

  useEffect(() => {
    getPlayersData()
  }, [])

  return (
    <div>
      <h1>Leaderboard</h1>
      <LeaderboardTable leaderboard={players} />
    </div>
  )
}
