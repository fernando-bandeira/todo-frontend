import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Home() {

  const [tasks, setTasks] = useState([]);
  const [target, setTarget] = useState(0);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState(false);

  const getTasks = () => {
    api.get('tasks/').then((response) => {
      setTasks(response.data);
    });
  }

  useEffect(() => {
    getTasks();
  }, []);

  const editTask = (task) => {
    setEdit(true);
    setTarget(task.id);
    setTitle(task.title);
    setDesc(task.description);
    setStatus(task.status);
  }

  const saveTask = () => {
    let newTask = {
      title: title,
      description: desc,
      status: status,
    };
    if (edit === true) {
      api.put(`tasks/${target}/`, newTask);
    } else {
      api.post('tasks/', newTask);
    }
  }

  const deleteTask = (id) => {
    api.delete(`tasks/${id}/`).then(() => {
      getTasks();
    });
    console.log(tasks)
  }

  return (
    <div className="ml-4">
      <h1>Task Manager</h1>
      <hr />
      <form>
        Tarefa:
        <br />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        Descrição:
        <br />
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <br />
        <br />
        <input
          id="status"
          type="checkbox"
          checked={status}
          onChange={(e) => setStatus(e.target.checked)}
        />
        <label htmlFor="status" className="cursor-pointer">Feita</label>
        <br />
        <br />
        <input
          id="sobrescrever"
          type="checkbox"
          disabled={!edit}
          checked={edit}
          onChange={() => setEdit(!edit)}
        />
        <label htmlFor="sobrescrever" className="cursor-pointer">Sobrescrever tarefa</label>
        <br />
        <br />
        <button onClick={saveTask}>Salvar</button>
      </form>
      <h2>Feitas</h2>
      <ul>
        {tasks.filter(t => t.status === true)?.map((task) => (
          <li key={task.id}>
            <span
              className="line-through cursor-pointer"
              onClick={() => { editTask(task) }}
            >
              {task.title}
            </span>
            <span className="text-red-500 font-bold ml-4 cursor-pointer" onClick={() => deleteTask(task.id)}>X</span>
          </li>
        ))}
      </ul>
      <h2>A fazer</h2>
      <ul>
        {tasks?.filter(t => t.status === false).map((task) => (
          <li key={task.id}>
            <span
              className="cursor-pointer"
              onClick={() => { editTask(task) }}
            >
              {task.title}
            </span>
            <span className="text-red-500 font-bold ml-4 cursor-pointer" onClick={() => deleteTask(task.id)}>X</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
