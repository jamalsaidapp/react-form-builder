import React from 'react';
import FormBuilder from './components/FormBuilder';

const schema = [
  { type: 'text', required: true, hidden: false, conditional: '' },
  { type: 'date', required: false, hidden: false, conditional: '' },
  // add more fields as needed
];

const App = () => {
  return (
      <div  style={{textAlign: 'center'}}>
        <h1>Form Builder</h1>
        <FormBuilder schema={schema} />
      </div>
  );
};

export default App;
