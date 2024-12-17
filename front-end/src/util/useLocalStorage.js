import { useEffect, useState } from "react";

//Defining the default value and the local storage key value we want to be accessing
function useLocalState(defaultValue, key) {
  //This is the get part of the operations
  //Value is the value, setValue is how you set the value
  const [value, setValue] = useState(() => {
    //Seeing if the key value exists in localStorage
    const localStorageValue = localStorage.getItem(key);

    //If it exists, return its value. Else, return the default value
    return localStorageValue !== null
      ? JSON.parse(localStorageValue)
      : defaultValue;
  });

  //This is the set part of the operation
  //Run every time the key or the value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  //Returning the value and the setValue function
  //This allows use to use Local Storage exactly how we would use UseState
  return [value, setValue];
}

//Exporting the function so it can be accessed outside
export { useLocalState };
