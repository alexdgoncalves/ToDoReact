import styles from './Task.module.css';

import { Trash } from 'phosphor-react';

import { TaskType } from './NewTask';

interface TaskProps extends TaskType {
  onDeleteTask: (id: string) => void;
  onCompleteTask: (id: string) => void;
}

export function Task({ id, content, onDeleteTask, onCompleteTask }: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(id);
  }

  function handleCompleteTask() {
    onCompleteTask(id);
  }

  return (
    <li className={styles.task}>
      <div className={styles.round}>
        <input
          type="checkbox"
          id={id}
          onClick={handleCompleteTask}
        />
        <label htmlFor={id}></label>
      </div>
      <p>{content}</p>
      <button
        onClick={handleDeleteTask}>
        <Trash size={20} />
      </button>
    </li>
  )
}