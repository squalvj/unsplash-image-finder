import { useState } from "react";
import "./index.css";
import { getConfig } from "utils/config";
import TextInput from "components/TextField";
import usePhotos from "hooks/usePhotos";
import Button from "components/Button";

const DEFAULT_QUERY = {
  query: "",
  perpage: 20,
  page: 1,
};

function App() {
  const [parameter, setParameter] = useState(DEFAULT_QUERY);
  const { data, error, isLoading } = usePhotos(
    parameter.query,
    parameter.page,
    parameter.perpage
  );
  const [q, setQ] = useState("");
  return (
    <div className="container">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        Picture Finder
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setParameter((prev) => ({ ...prev, query: q }));
        }}
      >
        <TextInput value={q} onChange={(val) => setQ(val)} />
        <div className="flex items-center justify-center py-4 sm:p-4">
          <Button size="sm" type="submit">
            Search
          </Button>
        </div>
      </form>

      <div className="py-4">
        <div className="masonry">
          {data.map((photo) => (
            <figure>
              <img
                src={photo.urls.thumb}
                alt={photo.alt_description}
              />
              <figcaption>
                <span className="mb-2">{photo.user.name}</span>
                <span className="description">{photo.description}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
