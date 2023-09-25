import { Controller, useFieldArray, useForm } from 'react-hook-form'
import styles from './styles.css'
import Select from 'react-select'
import { addGameEntry, updatePlayersStats } from '../../firebase'
import { useNavigate } from 'react-router-dom'

const TeamFieldArray = ({ team, control, players }) => {
  const { fields, append } = useFieldArray({
    control,
    name: `${team?.value}.players`,
  })
  const playerOptions = players.map((p) => ({
    value: p.id,
    label: p.name,
  }))

  return (
    <div className="team">
      <p className="subtitle">{team?.name}</p>
      <div className="players">
        {fields.map((_, index) => (
          <div key={index}>
            <p>Player {index + 1}</p>
            <Controller
              control={control}
              name={`${team?.value}.players.${index}.value`}
              render={({ field: { onChange, value, name, ref } }) => (
                <>
                  <Select
                    ref={ref}
                    name={name}
                    options={playerOptions}
                    value={playerOptions.find((c) => c.value === value)}
                    onChange={(e) =>
                      e.value
                        ? onChange(e.value)
                        : onChange(e.map((c) => c.value))
                    }
                  />
                </>
              )}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          append({ value: '' })
        }}
      >
        Add player
      </button>
    </div>
  )
}

export default function NewGameForm({ players }) {
  const { register, handleSubmit, control } = useForm()
  const navigate = useNavigate()

  const teams = [
    { name: 'Team A', value: 'teamA' },
    { name: 'Team B', value: 'teamB' },
  ]

  const onSubmit = async (data) => {
    try {
      await Promise.all([updatePlayersStats(data), addGameEntry(data)])
      navigate('/history')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="formContainer">
      <h1>Register Game</h1>
      <div className="teams">
        {teams.map((team, index) => (
          <TeamFieldArray
            players={players}
            team={team}
            control={control}
            key={index}
          />
        ))}
      </div>
      <div className="scoreContainer">
        <p className="subtitle">Score</p>
        <div className="score">
          <div className="teamScore">
            <p>{teams[0]?.name}</p>
            <input
              type="number"
              {...register(`${teams[0]?.value}.goals`)}
            ></input>
          </div>
          <div className="teamScore">
            <p>{teams[1]?.name}</p>
            <input
              type="number"
              {...register(`${teams[1]?.value}.goals`)}
            ></input>
          </div>
        </div>
      </div>
      <div className="dateContainer">
        <p className="subtitle">Date</p>
        <div className={styles.date}>
          <input type="datetime-local" {...register('date')}></input>
        </div>
      </div>
      <input type="submit" />
    </form>
  )
}
