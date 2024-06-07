import { useState } from 'react';
import { dbank_backend } from 'declarations/dbank_backend';
import Formdiv from './components/formdiv';

function App() {
  const [greeting, setGreeting] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    dbank_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  return (
    <>
      <Formdiv />
    </>
  );
}

export default App;