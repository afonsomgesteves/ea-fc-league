import { Controller, useFieldArray, useForm } from 'react-hook-form'
import styles from './styles.css'
import Select from 'react-select'
import { addGameEntry, updatePlayersStats } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove } from '@fortawesome/free-solid-svg-icons'

const TeamFieldArray = ({ team, control, players }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${team?.value}.players`,
  })
  const playerOptions = players.map((p) => ({
    value: p.id,
    label: (
      <div className="playerOption">
        <p>{p.name}</p>
        <p>({p.email})</p>
      </div>
    ),
  }))

  return (
    <div className="team">
      <p className="subtitle">{team?.name}</p>
      {fields.length > 0 && (
        <div className="players">
          {fields.map((item, index) => (
            <div key={item?.id} className="playerSelectContainer">
              <p>Jogador {index + 1}</p>
              <div className="controllerContainer">
                <Controller
                  control={control}
                  name={`${team?.value}.players.${index}.value`}
                  render={({ field: { onChange, value, name, ref } }) => (
                    <>
                      <Select
                        ref={ref}
                        name={name}
                        options={playerOptions}
                        className="react-select-container"
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
                <button
                  type="button"
                  onClick={() => {
                    console.log(index)
                    remove(index)
                  }}
                >
                  <FontAwesomeIcon icon={faRemove}></FontAwesomeIcon>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => {
          append({ value: '' })
        }}
      >
        Adicionar jogador
      </button>
    </div>
  )
}

export default function NewGameForm({ players }) {
  const { register, handleSubmit, control } = useForm()
  const navigate = useNavigate()

  const teams = [
    { name: 'Equipa A', value: 'teamA' },
    { name: 'Equipa B', value: 'teamB' },
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
      <div className="innerFormContainer">
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
          <p className="subtitle">Resultado</p>
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
          <p className="subtitle">Data</p>
          <div className={styles.date}>
            <input type="datetime-local" {...register('date')}></input>
          </div>
        </div>
      </div>
      <button type="submit" className="submitButton">
        Registar
      </button>
    </form>
  )
}
