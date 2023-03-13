import homeIcon from "../../assets/images/home.svg";
import generalIcon from "../../assets/images/generalIcon.svg";
import businessIcon from "../../assets/images/businessIcon.svg";
import healthIcon from "../../assets/images/healthIcon.svg";
import scienceIcon from "../../assets/images/scienceIcon.svg";
import sportIcon from "../../assets/images/sportIcon.svg";
import technologyIcon from "../../assets/images/technologyIcon.svg";
import favorites from "../../assets/images/favorites.png";

export interface NavItemProps {
  id: string;
  image: string;
  name: string;
  route: string;
  category: string;
}

export interface Item {
  multimedia: [{ url: string }];
  _id: number;
  news_desk: string;
  headline: {
    main: string;
  };
  byline: {
    original: string;
  };
  article: Object;
}

export const mobileGridData: NavItemProps[] = [
  {
    id: "1",
    image: homeIcon,
    name: "Home",
    route: "/home",
    category: "",
  },
  {
    id: "2",
    image: generalIcon,
    name: "General",
    route: "/general",
    category: "Home",
  },
  {
    id: "3",
    image: businessIcon,
    name: "Business",
    route: "/business",
    category: "Business",
  },
  {
    id: "4",
    image: healthIcon,
    name: "Health",
    route: "/health",
    category: "Health",
  },
  {
    id: "5",
    image: scienceIcon,
    name: "Science",
    route: "/science",
    category: "Science",
  },
  {
    id: "6",
    image: sportIcon,
    name: "Sports",
    route: "/sports",
    category: "Sports",
  },
  {
    id: "7",
    image: technologyIcon,
    name: "Technology",
    route: "/technology",
    category: "Technology",
  },
  {
    id: "8",
    image: favorites,
    name: "Favorites",
    route: "/favorites",
    category: "",
  },
];
