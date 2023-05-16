import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import FrameComponent8 from "./pages/FrameComponent8";
import FrameComponent from "./pages/FrameComponent";
import FrameComponent1 from "./pages/FrameComponent1";
import FrameComponent2 from "./pages/FrameComponent2";
import FrameComponent3 from "./pages/FrameComponent3";
import FrameComponent4 from "./pages/FrameComponent4";
import FrameComponent5 from "./pages/FrameComponent5";
import FrameComponent6 from "./pages/FrameComponent6";
import FrameComponent7 from "./pages/FrameComponent7";
import { useEffect } from "react";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/frame-118":
        title = "";
        metaDescription = "";
        break;
      case "/frame-117":
        title = "";
        metaDescription = "";
        break;
      case "/frame-116":
        title = "";
        metaDescription = "";
        break;
      case "/frame-115":
        title = "";
        metaDescription = "";
        break;
      case "/frame-114":
        title = "";
        metaDescription = "";
        break;
      case "/frame-113":
        title = "";
        metaDescription = "";
        break;
      case "/frame-112":
        title = "";
        metaDescription = "";
        break;
      case "/frame-111":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<FrameComponent8 />} />
      <Route path="/frame-118" element={<FrameComponent />} />
      <Route path="/frame-117" element={<FrameComponent1 />} />
      <Route path="/frame-116" element={<FrameComponent2 />} />
      <Route path="/frame-115" element={<FrameComponent3 />} />
      <Route path="/frame-114" element={<FrameComponent4 />} />
      <Route path="/frame-113" element={<FrameComponent5 />} />
      <Route path="/frame-112" element={<FrameComponent6 />} />
      <Route path="/frame-111" element={<FrameComponent7 />} />
    </Routes>
  );
}
export default App;
