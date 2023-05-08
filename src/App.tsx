import { useEffect, useState } from "react";
import "./index.css";
import TextInput from "components/TextField";
import usePhotos from "hooks/usePhotos";
import Button from "components/Button";
import Spinner from "components/Spinner";
import ScrollTrigger from "components/ScrollTrigger";
import Modal from "components/Modal";
import ErrorComponent from "components/ErrorComponent";
import { getQueryParam } from "utils/url";

function App() {
  const { data, error, loading, hasNext, nextPage, refetch, submit } =
    usePhotos({
      perPage: 20,
    });
  const [activeImage, setActiveImage] = useState({
    image: "",
    alt: "",
    id: "",
  });
  const [q, setQ] = useState("");

  useEffect(() => {
    const img = getQueryParam("image");
    const id = getQueryParam("id");
    const alt = getQueryParam("alt");
    if (img && id && alt) {
      setActiveImage({ alt, image: img, id });
    }
  }, []);

  return (
    <div className="container py-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(q);
        }}
      >
        <TextInput
          placeholder="Try 'Funny Cats'"
          value={q}
          onChange={(val) => setQ(val)}
        />
        <div className="flex items-center justify-center py-4 sm:p-4">
          <Button size="sm" type="submit">
            Search
          </Button>
        </div>
      </form>

      <div className="py-4">
        <ScrollTrigger onTrigger={nextPage}>
          <div className="masonry">
            {data.map((photo) => (
              <figure
                onClick={() =>
                  setActiveImage({
                    image: photo.urls.full,
                    alt: photo.alt_description,
                    id: photo.id,
                  })
                }
              >
                <img src={photo.urls.thumb} alt={photo.alt_description} />
                <figcaption>
                  <span className="mb-2 description">{photo.user.name}</span>
                  <span className="description">{photo.description}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </ScrollTrigger>
        {loading && <Spinner />}

        {error && !loading && <ErrorComponent onClick={refetch} />}

        {!hasNext && "No More Picture :("}
      </div>

      <Modal
        onClose={() => setActiveImage({ image: "", alt: "", id: "" })}
        alt={activeImage.alt}
        image={activeImage.image}
        id={activeImage.id}
      />
    </div>
  );
}

export default App;
