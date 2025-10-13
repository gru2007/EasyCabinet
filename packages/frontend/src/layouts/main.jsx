import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function Main(props) {
  return (
    <>
      <Header />
      <main class="min-h-[60vh] space-y-10">
        {props.children}
      </main>
      <Footer />
    </>
  );
}
