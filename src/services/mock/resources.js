let cards = [
  {
    _id: "5eb3fc6df3b6c4188aa6eeb3",
    title: "Title One",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget",
    tags: ["1", "2", "3"],
  },
  {
    _id: "5eb3fc7a1282452c9ea1e607",
    title: "Title Two",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget",
  },
  {
    _id: "5eb3fca09f865731ef6e6405",
    title: "Title Three",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget",
  },

  {
    _id: "5eb3fca4f08c991f9940c88b",
    title: "Title Four",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget",
  },
  {
    _id: "5eb3fca97e9b329475619523",
    title: "Title Five",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget",
  },
  {
    _id: "5eb3fcafdab73215039e3ce9",
    title: "Title Six",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget",
  },

  {
    _id: "5eb3fcb3d19a4b2e3cdad505",
    title: "Title Seven",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget",
  },
  {
    _id: "5eb3fcb7b09554a05ad03540",
    title: "Title Eight",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget",
  },
];

cards = [];

export function getResources() {
  return cards;
}

export function getResource(id) {
  return cards.find((card) => card._id === id);
}

export function saveResource(data) {
  let cardInDB = cards.find((item) => data._id === item._id) || {};
  cardInDB.title = data.title;
  cardInDB.description = data.description;
  cardInDB.file = data.file;
  cardInDB.tags = data.tags;
  cardInDB.fileToUpload = data.fileToUpload;

  if (!cardInDB._id) {
    cardInDB._id = Date.now().toString();
    cards.push(cardInDB);
  }

  return cardInDB;
}
