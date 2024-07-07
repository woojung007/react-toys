import Content from "./content";
import Footer from "./footer";
import Header from "./header";
import "./style.css";

const Page = () => {
  return (
    <div className="page">
      <Header />
      <Content />
      <Footer />
    </div>
  );
};

export default Page;
