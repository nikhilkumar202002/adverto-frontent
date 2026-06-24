const squareImages = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
  "21.jpg",
].map((fileName, index) => ({
  id: `square-${index + 1}`,
  title: "Featured Portfolio",
  subtitle: "Branding · 2024",
  image: `/case-studies/1200 x 1200/${fileName}`,
  alt: `Featured portfolio square image ${index + 1}`,
}));

const landscapeImages = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
].map((fileName, index) => ({
  id: `landscape-${index + 1}`,
  title: "Featured Portfolio",
  subtitle: "Campaign · 2024",
  image: `/case-studies/1200 x 900/${fileName}`,
  alt: `Featured portfolio landscape image ${index + 1}`,
}));

const splitEveryOther = (items, startIndex) =>
  items.filter((_, index) => index % 2 === startIndex);

export const featuredPortfolioTiles = {
  leftTop: {
    intervalMs: 2200,
    projects: splitEveryOther(squareImages, 0),
  },
  leftBottom: {
    intervalMs: 3000,
    projects: splitEveryOther(landscapeImages, 0),
  },
  rightTop: {
    intervalMs: 3600,
    projects: splitEveryOther(landscapeImages, 1),
  },
  rightBottom: {
    intervalMs: 4200,
    projects: splitEveryOther(squareImages, 1),
  },
};
