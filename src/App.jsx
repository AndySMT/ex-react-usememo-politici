import { useState, useEffect } from "react";

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

  return (
    <>
      <div className="container mx-auto bg-amber-400">
        <h1 className="text-6xl italic font-bold flex justify-center align-middle mb-5">
          Lista Politici
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          {politicians.map((politician, id) => {
            return (
              <div
                key={id}
                className="max-w-sm bg-white rounded-lg overflow-hidden"
              >
                <div className="p-2 flex justify-center items-cente">
                  <img
                    src={politician.image}
                    alt={politician.name}
                    className="w-auto h-100"
                  />
                </div>
                <div className="flex justify-between font-bold m-4">
                  <p>{politician.name}</p>
                  <p className="italic">{politician.position}</p>
                </div>
                <p className="p-1 m-2">{politician.biography}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
