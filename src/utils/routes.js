
import Company from "../Components/Company";
import CompanySlider from "../Components/CompanySlider";
import MenuPage from "../Components/MenuPage";
import News from "../Components/News";
import Services from "../Components/Services";
import Slider from "../Components/Slider";
import Team from "../Components/Team";
import LoginPage from "../pages/LoginPage";
import LogOutPage from "../pages/LogOutPage";

 

export const routes = [
  {
    id: 1,
    path: "/",
    component: Company,
  },
  {
    id: 2,
    path: "/company-slider",
    component: CompanySlider,
  },
  {
    id:3,
    path: "/news",
    component: News
  },
  {
    id:4,
    path:"/menu",
    component: MenuPage
  },
  {
    id:5,
    path:"/slider",
    component: Slider
  },
  {
    id:6,
    path:"/services",
    component: Services
  },
  {
    id:7,
    path:"/team",
    component: Team
  },
  {
    id:8,
    path:"/logout",
    component: LogOutPage
  }
 
  
];

export const loginRoutes =[
  {
    id:1,
    path:"/login",
    component: <LoginPage />
  }
]


export const menubar = [
  { id: 1, title: "Company", path: "/" },
  { id: 2, title: "Company Slider", path: "/company-slider" },
  { id: 3, title: "News", path: "/news" },
  { id: 4, title: "Menu", path: "/menu" },
  { id: 5, title: "Slider", path: "/slider" },
  { id: 6, title: "Services", path: "/services" },
  { id: 7, title: "Team", path: "/team" }
];
