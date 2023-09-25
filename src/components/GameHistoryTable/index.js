import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import { getTeamPlayers } from '../../firebase'

function extractPlayerNames(players) {
  console.log(players)
  const playerNames = players?.map((player) => player.name)
  return playerNames?.join(' & ')
}

const TableEntry = ({ game }) => {
  console.log(game)
  const [teamAPlayers, setTeamAPlayers] = useState([])
  const [teamBPlayers, setTeamBPlayers] = useState([])

  useEffect(() => {
    const fetchTeamPlayers = async (team) => {
      try {
        const players = await getTeamPlayers(game, team)
        return players
      } catch (error) {
        console.error(`Error fetching ${team} players:`, error)
        throw error
      }
    }

    const fetchData = async () => {
      try {
        const [teamA, teamB] = await Promise.all([
          fetchTeamPlayers('teamA'),
          fetchTeamPlayers('teamB'),
        ])

        setTeamAPlayers(teamA)
        setTeamBPlayers(teamB)
      } catch (error) {
        console.error('Error fetching team data:', error)
      }
    }

    fetchData()
  }, [game])

  const dateObject = game?.timestamp?.toDate()
  const date = `${dateObject.getFullYear()}-${
    dateObject.getMonth() + 1
  }-${dateObject.getDate()}`
  const time = `${dateObject.getHours()}:${dateObject.getMinutes()}`
  return (
    <div className={styles.tableEntry}>
      <div className={styles.date}>
        <p>{date}</p>
        <p>{time}</p>
      </div>
      <div className={styles.teams}>
        <div className={styles.team}>
          <p>{extractPlayerNames(teamAPlayers)}</p>
          <p className={styles.result}>{game?.teamA?.goals}</p>
        </div>
        <div className={styles.team}>
          <p>{extractPlayerNames(teamBPlayers)}</p>
          <p className={styles.result}>{game?.teamB?.goals}</p>
        </div>
      </div>
    </div>
  )
}

export default function GameHistoryTable({ games }) {
  return (
    <div className={styles.tableContainer}>
      {games.map((game, index) => (
        <TableEntry key={index} game={game} />
      ))}
    </div>
  )
}
