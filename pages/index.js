import { useRouter } from 'next/router';
import { useState } from 'react';

const InputForm = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!inputValue) {
      alert('Please enter a number');
      return;
    } else {
      router.push(`/todos?n=${inputValue}`);
    }
  };

  return (

    <div className='h-screen flex justify-center items-center bg-[#eee4f0]'>
      
      <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
        <label>Get a todo list</label>
        <input
          placeholder='Enter a number'
          className='border-2 border-black rounded-md p-2'
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          
        />
        <button 
        className='border border-black rounded-md p-2'
        type="submit">
          Get ToDos
        </button>
      </form>
    </div>
  );
};

export default InputForm;