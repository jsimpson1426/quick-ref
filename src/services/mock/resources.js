let cards = [
  {
    title: "This is a PDF example",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis id consectetur purus ut faucibus.",
    file: "pupper.pdf",
    _id: "5eb56859a4cd2175d1d1d8f7",
    tags: ["pdf", "example", "dog", "goodboy"]
  },
  {
    title: "Here's a Word Document",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis id consectetur purus ut faucibus.",
    file: "pupper.docx",
    _id: "5eb56865def0e5029a8eb55e",
    tags: ["word", "document", "pupper"]
  },
  {
    title: "Now a GIF Example",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis id consectetur purus ut faucibus.",
    file: "pupper.gif",
    _id: "5eb5686d987fc7d5b6f9b9f9",
    tags: ["gif", "dog", "example"]
  },
  {
    title: "Another Example! A JPG this time!",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis id consectetur purus ut faucibus.",
    file: "pupper.jpg",
    _id: "5eb56874be2fea2c53eb713f",
    tags: ["jpg", "picture", "dog", "example","goodboy"]
  },
  {
    title: "Now an Excel Spreadsheet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis id consectetur purus ut faucibus.",
    file: "pupper.xlsx",
    _id: "5eb5687ac37ce33e5f7db02d",
    tags: ["excel", "dog"]
  },
  {
    title: "This Example is a PNG",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis id consectetur purus ut faucibus.",
    file: "pupper.png",
    _id: "5eb5688561f14cd025528d40",

    tags: ["png", "example"]
  },
  {
    title: "Repeat of the PDF Example",
    description:
      "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    file: "pupper.pdf",
    _id: "5eb5688c5c5f56ea951288b9",
    tags: ["repeat", "dog", "pdf"]
  },
  {
    title: "Yet another PDF Example Repeat",
    description:
      "Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. ",
    file: "pupper.pdf",
    _id: "5eb568925f7c648f4a0c388e",
    tags: ["repeat", "dog", "pdf", "another"]
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
