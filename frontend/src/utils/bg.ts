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

export const getbgandtext = () => {
  let random = Math.floor(Math.random() * bgs.length);
  if (random === last) {
    random++;
  }
  last = random;
  const bg = bgs[random];
  const text = getTextColor(bg.backgroundColor);
  return {
    ...bg,
    color: text,
  };
};

function getRGB(c: any) {
  return parseInt(c, 16) || c;
}

function getsRGB(c: any) {
  return getRGB(c) / 255 <= 0.03928
    ? getRGB(c) / 255 / 12.92
    : Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4);
}

function getLuminance(hexColor: any) {
  return (
    0.2126 * getsRGB(hexColor.substr(1, 2)) +
    0.7152 * getsRGB(hexColor.substr(3, 2)) +
    0.0722 * getsRGB(hexColor.substr(-2))
  );
}

function getContrast(f: string, b: string) {
  const L1 = getLuminance(f);
  const L2 = getLuminance(b);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

function getTextColor(bgColor: string) {
  const whiteContrast = getContrast(bgColor, "#ffffff");
  const blackContrast = getContrast(bgColor, "#000000");

  return whiteContrast > blackContrast ? "#ffffff" : "#000000";
}
