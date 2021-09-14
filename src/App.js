
import './App.css';
import { useState, useEffect } from 'react'
function App() {

  const url = `https://black-history-month-api.herokuapp.com/people`
  const [people, setPeople] = useState([])
  const [filtered, setFiltered] = useState([])
  const [serchInput, setSearchInput] = useState(" ")
  const [isLoading, setIsLoading] = useState(true)

  const fetchApi = async () => {
    const res = await fetch(url)
    const data = await res.json()
    setPeople(data)
    setIsLoading(false)

  }

  useEffect(() => {
    fetchApi()
  }, [])

  const searchPeople = (arg) => {
    setSearchInput(arg)

    if (serchInput) {
      const filteredSearch = people.filter((person) => (
        Object.values(person).join("").toLowerCase().includes(arg.toLowerCase())
      ))
      setFiltered(filteredSearch)
    } else {
      setFiltered(people)
    }
  }


  return (
    <>
    {isLoading? <h1 className="text-pink-900 uppercase font-bold text-2xl md:text-4xl lg:text-6xl text-center mb-10  flex items-center justify-center h-screen">Loading...</h1>:
      <div className="my-10">
        <h1 className="text-pink-900 uppercase font-bold text-2xl md:text-4xl lg:text-6xl text-center mb-10">Search Input Filter</h1>
        <input
          name="text"
          id="text" placeholder="search..."
          type="text"
          onChange={e => searchPeople(e.target.value)}
          autoComplete="off"
          className="w-1/2 block mx-auto py-2 px-5 rounded shadow  mb-10"
        />
        {serchInput.length > 1 ?
          <section className="px-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:max-w-5xl xl:mx-auto">
            {filtered.map(({ id, name, dob, description, image }) => (
              <article key={id} className="bg-pink-300 p-5 rounded shadow">
                <img src={image} alt={name} title={name} className="h-96 w-full"></img>
                <h3 className="font-bold text-xl mt-1">{name}</h3>
                <p>DOB: {dob}</p>
              </article>
            ))}
          </section> :
          <section className="px-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:max-w-5xl xl:mx-auto">
            {people.map(({ id, name, dob, description, image }) => (
              <article key={id} className="bg-pink-300 p-5 rounded shadow">
                <img src={image} alt={name} title={name} className="h-96 w-full"></img>
                <h3 className="font-bold text-xl mt-1">{name}</h3>
                <p>DOB: {dob}</p>
              </article>
            ))}
          </section>}
      </div>}
    </>
  );
}

export default App;
