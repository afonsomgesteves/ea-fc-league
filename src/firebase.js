// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  increment,
  updateDoc,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDzGK7FiqLbemOXysCj4diu4LppGga6z5Q',
  authDomain: 'fifa-score-fa096.firebaseapp.com',
  databaseURL:
    'https://fifa-score-fa096-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'fifa-score-fa096',
  storageBucket: 'fifa-score-fa096.appspot.com',
  messagingSenderId: '287213314872',
  appId: '1:287213314872:web:7270f71ef66f35d22c57cd',
}

export const PlayerInitStruc = (name, email) => ({
  name,
  email,
  gamesPlayed: 0,
  wins: 0,
  draws: 0,
  losses: 0,
  points: 0,
})

const firebase = initializeApp(firebaseConfig)
export const firestore = getFirestore(firebase)
export const auth = getAuth(firebase)

export const updatePlayersStats = (data) => {
  const { teamA, teamB } = data
  const updatePlayer = (player, stats) => {
    const userRef = doc(firestore, 'players', player.value)
    console.log(userRef)
    updateDoc(userRef, stats)
  }

  const teamAGoals = parseInt(teamA.goals, 10)
  const teamBGoals = parseInt(teamB.goals, 10)

  if (teamAGoals !== teamBGoals) {
    // Update the winning team.
    const winningTeam = teamAGoals > teamBGoals ? teamA : teamB
    winningTeam.players.forEach((p) => {
      updatePlayer(p, {
        gamesPlayed: increment(1),
        wins: increment(1),
        points: increment(3),
      })
    })

    // Update the losing team.
    const losingTeam = teamAGoals < teamBGoals ? teamA : teamB
    losingTeam.players.forEach((p) => {
      updatePlayer(p, {
        gamesPlayed: increment(1),
        losses: increment(1),
      })
    })
  } else {
    // Update the teams that drew.
    teamA.players.forEach((p) => {
      updatePlayer(p, {
        gamesPlayed: increment(1),
        draws: increment(1),
        points: increment(1),
      })
    })

    teamB.players.forEach((p) => {
      updatePlayer(p, {
        gamesPlayed: increment(1),
        draws: increment(1),
        points: increment(1),
      })
    })
  }
}

export const addGameEntry = async (data) => {
  await addDoc(collection(firestore, 'games'), {
    timestamp: new Timestamp(Date.parse(data?.date) / 1000, 0),
    teamA: {
      goals: parseInt(data.teamA.goals),
      players: await Promise.all(
        data.teamA.players.map((p) => doc(firestore, 'players', p.value))
      ),
    },
    teamB: {
      goals: parseInt(data.teamB.goals),
      players: await Promise.all(
        data.teamB.players.map((p) => doc(firestore, 'players', p.value))
      ),
    },
  })
}

export const getTeamPlayers = async (game, team) => {
  const teamObj = team === 'teamA' ? game.teamA : game.teamB
  const players = await Promise.all(
    teamObj?.players.map(async (p) => {
      const playerInfo = await getDoc(p)
      return playerInfo.data()
    })
  )
  return players
}
