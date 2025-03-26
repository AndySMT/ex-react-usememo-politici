import { useState, useEffect, useMemo } from "react";
import Card from "./components/Card";

function App() {
  const [politicians, setPoliticians] = useState([]);

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

  const [search, setSearch] = useState("");
  const filteredList = useMemo(() => {
    return politicians.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.biography.toLowerCase().includes(search.toLowerCase())
    );
  }, [politicians, search]);

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
            className="border bg-amber-50 h-6 w-30 mt-6 absolute right-2.5 rounded-2xl p-1"
          />
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
