
import Company from "../pages/Company";
import MenuPage from "../pages/MenuPage";
import News from "../pages/News";
import Services from "../pages/Services";
import Slider from "../pages/Slider";
import Team from "../pages/Team";
import LogOutPage from "../pages/LogOutPage";
import CompanySlider from "../pages/CompanySlider";

 

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




export const menubar = [
  { id: 1, title: "Company", path: "/" },
  { id: 2, title: "Company Slider", path: "/company-slider" },
  { id: 3, title: "News", path: "/news" },
  { id: 4, title: "Menu", path: "/menu" },
  { id: 5, title: "Slider", path: "/slider" },
  { id: 6, title: "Services", path: "/services" },
  { id: 7, title: "Team", path: "/team" }
];
