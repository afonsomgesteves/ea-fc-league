/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import './styles.css'
import ReactSelect from 'react-select'

function sortByRatio(players) {
  const pointsPerGame = (p) => p.points / p.gamesPlayed
  return players.sort((a, b) => pointsPerGame(b) - pointsPerGame(a))
}

function sortByPoints(players) {
  return players.sort((a, b) => b?.points - a?.points)
}

const TableHeader = () => {
  return (
    <div className="tableEntry">
      <p className="rank">#</p>
      <p className="name">Player Name</p>
      <p>J</p>
      <p>V</p>
      <p>E</p>
      <p>D</p>
      <p>P</p>
    </div>
  )
}

const TableEntry = ({ player, rank }) => {
  return (
    <div className="tableEntry">
      <p className="rank">{rank}</p>
      <p className="name">{player?.name}</p>
      <p>{player?.gamesPlayed}</p>
      <p>{player?.wins}</p>
      <p>{player?.draws}</p>
      <p>{player?.losses}</p>
      <p>{player?.points}</p>
    </div>
  )
}

export default function LeaderboardTable({ leaderboard }) {
  const [sortingFilter, setSortingFilter] = useState('points')
  const [players, setPlayers] = useState([])

  const sortingOptions = [
    { value: 'points', label: 'Pontos' },
    { value: 'ratio', label: 'Rácio de vitórias' },
  ]

  useEffect(() => {
    if (sortingFilter === 'ratio') {
      setPlayers(sortByRatio([...players]))
    } else if (sortingFilter === 'points') {
      setPlayers(sortByPoints([...players]))
    }
  }, [sortingFilter])

  useEffect(() => {
    setPlayers(sortByPoints(leaderboard))
  }, [leaderboard])

  const selectStyles = {
    control: (styles) => ({ ...styles, width: '200px' }),
  }

  return (
    <div className="tableContainer">
      <div className="tableTop">
        <p>A ordenar por:</p>
        <ReactSelect
          options={sortingOptions}
          value={sortingOptions.find((c) => c.value === sortingFilter)}
          defaultValue={sortingOptions[0]}
          onChange={(e) => setSortingFilter(e.value)}
          styles={selectStyles}
        />
      </div>
      <div className="tableItems">
        <TableHeader />
        {players.map((p, index) => (
          <>
            {p.gamesPlayed ? (
              <TableEntry key={index} player={p} rank={index + 1} />
            ) : (
              <></>
            )}
          </>
        ))}
      </div>
    </div>
  )
}
