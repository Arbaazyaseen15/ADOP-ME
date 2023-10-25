import { useState, useEffect } from "react";
import useBreedList from "./useBreedList";
import Result from "./Result"

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParam = () => {
  const [location, setLocation] = useState("");
  const [animal, updateAnimal] = useState("");
  const [breed, updateBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [BREEDS] = useBreedList(animal);

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    console.log(json.pets);

    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              updateAnimal(e.target.value);
              updateBreed("");
            }}
            onBlur={(e) => {
              updateAnimal(e.target.value);
              updateBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal, idx) => (
              <option key={idx} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        {/* Breed options */}
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            disabled={BREEDS.length === 0}
            value={breed}
            onChange={(e) => {
              updateBreed(e.target.value);
            }}
            onBlur={(e) => {
              updateBreed(e.target.value);
            }}
          >
            <option />
            {BREEDS.map((breed, idx) => (
              <option key={idx} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button>Submit</button>
      </form>
      <Result pets={pets} />
    </div>
  );
};

export default SearchParam;
