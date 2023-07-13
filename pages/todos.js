import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';

const TodosPage = () => {
  const router = useRouter();
  const { query } = router;
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (query.n) {
      const n = parseInt(query.n);
      if (n > 0 && n < 100) {
        fetchTodos(n);
      }
    }
  }, [query.n]);

  const fetchTodos = async (n) => {
    const todoPromises = Array.from({ length: n }, () =>
      fetch(`https://jsonplaceholder.typicode.com/todos/${getRandomId()}`)
      .then((response) => response.json())
    );
    const todoResults = await Promise.all(todoPromises);
    const sortedTodos = sortTodos(todoResults);
    setTodos(sortedTodos);
  };

  const getRandomId = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const sortTodos = (todos) => {
    const completedFalse = todos
      .filter((todo) => !todo.completed)
      .sort((a, b) => a.title.localeCompare(b.title));
    const completedTrue = todos
      .filter((todo) => todo.completed)
      .sort((a, b) => a.title.localeCompare(b.title));
    return [...completedFalse, ...completedTrue];
  };

  const handleCheckboxChange = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  return (
    <div className='min-h-screen bg-[#eee4f0] p-4 space-y-4'>
      <h1 className='text-lg font-bold'>Here are Your Todos...</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label className='flex flex-row items-center '>
            <div className='text-xs text-gray-500 rounded-full border mr-5 bg-[#efd5ff] p-2'>
                {todo.id}
            </div>
              
            <div className='text-lg'>
             {todo.title}
            </div>
            <div>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCheckboxChange(todo.id)}
                className='ml-20'
              />
            </div>

            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodosPage;