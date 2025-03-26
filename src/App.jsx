import { useState, useEffect, useMemo } from "react";
import Card from "./components/Card";

function App() {
  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("");

  useEffect(() => {
    async function fetchPoliticians() {
      try {
        const response = await fetch(
          "https://boolean-spec-frontend.vercel.app/freetestapi/politicians"
        );
        if (!response.ok) {
          throw new Error("Errore HTTP");
        }
        const data = await response.json();
        setPoliticians(data);
      } catch (error) {
        console.error("Errore recupero politici:", error);
      }
    }
    fetchPoliticians();
  }, []);

  const filteredList = useMemo(() => {
    return politicians.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.biography.toLowerCase().includes(search.toLowerCase())
    );
  }, [politicians, search]);

  const filteredPosition = useMemo(() => {
    return [...new Set(politicians.map((p) => p.position))];
  }, [politicians]);
  return (
    <>
      <div className="container mx-auto bg-amber-400 pb-10">
        <div className="flex justify-center align-middle mb-5 relative">
          <h1 className="text-6xl italic font-bold  ">Lista Politici</h1>
          <input
            type="text"
            placeholder="🔍 Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border h-6 w-30 mt-6 absolute right-2.5 rounded-2xl p-1"
          />
        </div>
        <div className="flex justify-center mb-5">
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="border rounded-2xl "
          >
            <option value="">Seleziona Ruolo</option>
            {filteredPosition.map((position, index) => (
              <option key={index} value={position}>
                {position}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {filteredList.map((politician, id) => {
            return <Card key={id} politician={politician} />;
          })}
        </div>
      </div>
    </>
  );
}

export default App;
