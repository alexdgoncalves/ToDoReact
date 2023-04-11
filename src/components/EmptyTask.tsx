import styles from './EmptyTask.module.css';

import clipboard from '../assets/clipboard.svg';

export function EmptyTask() {
  return (
    <div className={styles.empty}>
      <img src={clipboard} />
      <div className={styles.emptyTexts}>
        <p>Você ainda não tem tarefas cadastradas</p>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </div>
    </div>
  )
}