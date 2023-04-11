import styles from './NewTask.module.css';

import { v4 as uuidv4 } from 'uuid';

import { PlusCircle } from 'phosphor-react';
import { EmptyTask } from './EmptyTask';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { Task } from './Task';

export interface TaskType {
  id: string;
  isCompleted: boolean;
  content: string;
};

export function NewTask() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const [countTasks, setCountTasks] = useState(0);

  const [completedTasks, setCompletedTasks] = useState(0);

  const [newTaskText, setNewTaskText] = useState("");

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newTask = {
      id: uuidv4(),
      isCompleted: false,
      content: newTaskText,
    }

    setTasks([...tasks, newTask]);
    setCountTasks((state) => state + 1);
    setNewTaskText("")
  };

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");

    setNewTaskText(event.target.value);
  };

  function completeTask(idToComplete: string) {
    const taskComplete = tasks.map(task => {
      if (task.id === idToComplete) {
        task.isCompleted = !task.isCompleted;
      }
      return task
    });

    const taskCompleted = tasks.reduce((i, curr) => {
      if (curr.isCompleted) i++
      return i
    }, 0);

    setCompletedTasks(taskCompleted);
    setTasks(taskComplete);
  }

  function deleteTask(idToDelete: string) {
    const taskWithoutDeletedOne = tasks.filter(task => {
      if (task.id === idToDelete && task.isCompleted) {
        setCompletedTasks(state => state - 1);
      }

      return task.id !== idToDelete;
    });
    setCountTasks((state) => state - 1);
    setTasks(taskWithoutDeletedOne);
  };

  return (
    <form onSubmit={handleCreateNewTask} className={styles.container}>
      <div className={styles.newTask}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={newTaskText}
          onChange={handleNewTaskChange}
          required
        />
        <button
          title="Criar">
          Criar
          < PlusCircle size={18} />
        </button>
      </div >
      <header className={styles.info}>
        <p className={styles.create}>Tarefas criadas<span>{countTasks}</span></p>
        <p className={styles.done}>Concluídas
          {
            countTasks > 0
              ? <span>{completedTasks} de {countTasks}</span>
              : <span> {countTasks}</span>
          }
        </p>
      </header>

      <div>
        {
          tasks.length > 0 ?
            <ul className={styles.list}>
              {
                tasks.map(task => {
                  return (
                    <Task
                      key={task.id}
                      id={task.id}
                      isCompleted={task.isCompleted}
                      content={task.content}
                      onDeleteTask={deleteTask}
                      onCompleteTask={completeTask}
                    />
                  )
                })
              }
            </ul>
            : <EmptyTask />
        }
      </div>
    </form >

  )
}