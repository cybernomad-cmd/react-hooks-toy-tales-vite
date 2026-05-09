import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);

  // STORE TOYS
  const [toys, setToys] = useState([]);

  // GET ALL TOYS
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // ADD TOY
  function addToy(newToy) {
    setToys([...toys, newToy]);
  }

  // DELETE TOY
  function deleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    }).then(() => {
      const updatedToys = toys.filter((toy) => toy.id !== id);
      setToys(updatedToys);
    });
  }

  // LIKE TOY
  function likeToy(toy) {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: toy.likes + 1,
      }),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        const updatedToys = toys.map((t) =>
          t.id === updatedToy.id ? updatedToy : t
        );

        setToys(updatedToys);
      });
  }

  return (
    <>
      <Header />

      {showForm ? <ToyForm addToy={addToy} /> : null}

      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>

      <ToyContainer
        toys={toys}
        deleteToy={deleteToy}
        likeToy={likeToy}
      />
    </>
  );
}

export default App;