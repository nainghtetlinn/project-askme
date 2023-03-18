const bgs = [
  {
    backgroundColor: "#0093E9",
    backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
  },
  {
    backgroundColor: "#8EC5FC",
    backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
  },
  {
    backgroundColor: "#D9AFD9",
    backgroundImage: "linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)",
  },
  {
    backgroundColor: "#00DBDE",
    backgroundImage: "linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)",
  },
  {
    backgroundColor: "#85FFBD",
    backgroundImage: "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",
  },
  {
    backgroundColor: "#FBAB7E",
    backgroundImage: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
  },
  {
    backgroundColor: "#FF9A8B",
    backgroundImage:
      "linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)",
  },
  {
    backgroundColor: "#FF3CAC",
    backgroundImage:
      "linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
  },
  {
    backgroundColor: "#FEE140",
    backgroundImage: "linear-gradient(90deg, #FEE140 0%, #FA709A 100%)",
  },
  {
    backgroundColor: "#FA8BFF",
    backgroundImage:
      "linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)",
  },
];

let last = 0;

export const getbg = () => {
  const random = Math.floor(Math.random() * bgs.length);
  if (random === last) {
    last = random + 1;
    return bgs[random + 1];
  }
  last = random;
  return bgs[random];
};
