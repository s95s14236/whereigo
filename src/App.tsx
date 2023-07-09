import { Provider } from "react-redux";
import "./App.css";
// import Footer from "./components/Footer";
import Content from "./components/Content";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AttractionDetailPage from "./views/Attraction/AttractionDetailPage";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store} >
        <BrowserRouter>
          <Routes>
            <Route path="" element={
              <div className="App">
                <Content />
                {/* <Footer /> */}
              </div>
            } />
            <Route path="/attraction/:attractionId" element={<AttractionDetailPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>


    </QueryClientProvider>
  );
}

export default App;
