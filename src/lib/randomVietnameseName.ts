import { ho, ten_gai, ten_nam } from "@/constants/vietnameseName";

export const randomVietnameseName = (type: "male" | "female") => {
  // Randomly select a surname
  const randomHo = ho[Math.floor(Math.random() * ho.length)];

  // Randomly select a given name based on the type
  let randomTen;
  if (type === "male") {
    randomTen = ten_nam[Math.floor(Math.random() * ten_nam.length)];
  } else {
    randomTen = ten_gai[Math.floor(Math.random() * ten_gai.length)];
  }

  // Combine and return the full name
  return `${randomHo} ${randomTen}`;
};
