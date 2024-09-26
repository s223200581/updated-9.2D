// Import the useState hook from React to manage the state within the custom hook
import { useState } from 'react';

/**
 * Custom hook to handle form input state and change events.
 * 
 * @param {any} initialValue - The initial value of the form input.
 * @returns {object} An object containing the current value of the input and a change handler.
 */
const useFormInput = (initialValue) => {
  // Declare a state variable 'value' initialized to the 'initialValue'
  const [value, setValue] = useState(initialValue);

  /**
   * Event handler for updating the state with the new value from the input field.
   * 
   * @param {object} e - The event object from the input field.
   */
  const handleChange = (e) => {
    // Update the 'value' state with the current value of the input field
    setValue(e.target.value);
  };

  // Return an object with the current value and the change handler
  return {
    value,          // Current value of the input field
    onChange: handleChange  // Handler to update the value when the input changes
  };
};

// Export the custom hook as the default export of this module
export default useFormInput;