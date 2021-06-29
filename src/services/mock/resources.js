let cards = [
  {
    title: "How to do Stuff!",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis id consectetur purus ut faucibus.",
    file: "example.pdf",
    _id: "5eb56859a4cd2175d1d1d8f7",
    tags: ["HowToDoStuff", "Whatstuffyoucando", "HowMuchstuffandthings", "nowthatsalotofstufftodoman", "nowthatssomethingtodoman"]
  },
  {
    title: "Things about Stuff",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis id consectetur purus ut faucibus.",
    file: "example.pdf",
    _id: "5eb56865def0e5029a8eb55e",
    tags: ["thingz", "standards", "about", "content", "field"]
  },
  {
    title: "Content and Things",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis id consectetur purus ut faucibus.",
    file: "example.pdf",
    _id: "5eb5686d987fc7d5b6f9b9f9",
    tags: ["Handbook", "content"]
  },
  {
    title: "Using Search Bars",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis id consectetur purus ut faucibus.",
    file: "example.pdf",
    _id: "5eb56874be2fea2c53eb713f",
    tags: ["stuff", "thingz", "content"]
  },
  {
    title: "Material to Search",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis id consectetur purus ut faucibus.",
    file: "example.pdf",
    _id: "5eb5687ac37ce33e5f7db02d",
    tags: ["search", "conduct", "content"]
  },
  {
    title: "Searchbars",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis id consectetur purus ut faucibus.",
    file: "example.pdf",
    _id: "5eb5688561f14cd025528d40",

    tags: ["tag", "beanz"]
  },
  {
    title: "This is on Page 2",
    description:
      "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    file: "example.pdf",
    _id: "5eb5688c5c5f56ea951288b9",
    tags: ["stuff", "phone"]
  },
  {
    title: "Stuff on Page 2",
    description:
      "Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. ",
    file: "example.pdf",
    _id: "5eb568925f7c648f4a0c388e",
    tags: ["tag", "beanz"]
  },
];

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
