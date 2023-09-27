import React from 'react'
import styles from './style.module.css'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <div className={styles.homepageContainer}>
      <div className={styles.elementContainer}>
        <h1>Bem-vindos à liga oficial de FC 24 da Caixa Mágica!</h1>
        <p>
          Aqui podem registar os jogos para no fim da época apurarmos o
          derradeiro campeão.
        </p>
        <p>
          Façam o login através da conta Google para poder ver e registar
          resultados. Assim podemos manter registo dos utilizadores e
          adicioná-los ao jogos de maneira autêntica.
        </p>
      </div>
      <button onClick={() => navigate('/newgame')}>Adicionar jogo</button>
      <p>
        Para registar issues ou submeterem possíveis melhoramentos, usem o{' '}
        <a href="https://github.com/afonsomgesteves/ea-fc-league">
          Repositório do projeto
        </a>
      </p>
    </div>
  )
}
