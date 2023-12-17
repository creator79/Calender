import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Get stored value from local storage or use the provided initial value
  const storedValue = JSON.parse(localStorage.getItem(key)) || initialValue;

  // Create state to hold the current value
  const [value, setValue] = useState(storedValue);
  // const [getValue , setGetValue] = useState(storedValue);

  // Function to update both local storage and state
  const updateValue = (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  // console.log(storedValue);

  return [value, updateValue];
};

export default useLocalStorage;
