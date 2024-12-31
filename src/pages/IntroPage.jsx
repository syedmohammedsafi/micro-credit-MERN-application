import Features from "../components/Features";
import Steps from "../components/Steps";
import Stats from "../components/Stats";
import Categories from "../components/Category";
import Banner from "../components/Banner";

function IntroPage() {
  return (
      <div className="w-full bg-gray-100"> 
        <Banner/>
        <Features/>
        <Steps/>
        <Stats/>
        <Categories/>
      </div>
  );
}

export default IntroPage;