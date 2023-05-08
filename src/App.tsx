import { useState } from "react";
import "./index.css";
import { getConfig } from "utils/config";
import TextInput from "components/TextField";
import usePhotos from "hooks/usePhotos";
import Button from "components/Button";
import Spinner from "components/Spinner";
import ScrollTrigger from "components/ScrollTrigger";

const DEFAULT_QUERY = {
  query: "",
};

function App() {
  const [parameter, setParameter] = useState(DEFAULT_QUERY);
  const { data, error, isLoading, next } = usePhotos(parameter.query, {
    perPage: 20,
  });
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
        <ScrollTrigger onTrigger={next}>
          <div className="masonry">
            {data.map((photo) => (
              <figure>
                <img src={photo.urls.thumb} alt={photo.alt_description} />
                <figcaption>
                  <span className="mb-2 description">{photo.user.name}</span>
                  <span className="description">{photo.description}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </ScrollTrigger>
        {isLoading && <Spinner />}
      </div>
    </div>
  );
}

export default App;
