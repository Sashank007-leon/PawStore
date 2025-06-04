import { useNavigate } from "react-router-dom";

const dogBreeds = [
  {
    name: "Golden Retriever",
    image: "/dogs/golden.jpg",
    slug: "golden-retriever",
  },
  {
    name: "Husky",
    image: "/dogs/husky.jpg",
    slug: "siberian-husky",
  },
  {
    name: "Pitbull",
    image: "/dogs/pitbull.jpg",
    slug: "pitbull",
  },
  {
    name: "German Shepard",
    image: "/dogs/german.jpg",
    slug: "german-shepard",
  },
  {
    name: "Pug",
    image: "/dogs/pug.jpg",
    slug: "pug",
  },
  {
    name: "Japanese Spitz",
    image: "/dogs/spitz.jpg",
    slug: "japanese-spitz",
  },
  {
    name: "Labrador",
    image: "/dogs/labrador.jpg",
    slug: "labrador",
  },
];

const DogBreed = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-6 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Dog Breed</h2>
      <p className="text-gray-600 mb-12 max-w-xl mx-auto">
        Find yourself a perfect friend from a wide variety of choices.
      </p>

      <div className="flex flex-wrap justify-center gap-16">
        {dogBreeds.map((breed) => (
          <div
            key={breed.slug}
            className="flex flex-col items-center hover:scale-105 transition-transform cursor-pointer"
            onClick={() => navigate(`/dogs?breed=${encodeURIComponent(breed.name)}`)}
          >
            <img
              src={breed.image}
              alt={breed.name}
              className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-full shadow-md"
            />
            <p className="mt-2 font-medium text-black">{breed.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DogBreed;