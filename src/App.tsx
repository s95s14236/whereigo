import "./App.css";
// import Footer from "./components/Footer";
import Content from "./components/Content";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Content />
        {/* <Footer /> */}
      </div>
    </QueryClientProvider>
  );
}

export default App;
