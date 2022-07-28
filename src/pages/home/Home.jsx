import { HomeBanner } from './banner';
import { CompanyCasting } from './company';
import { HomeFeature } from './feature';
import { Introduce } from './introduce';
import { HomeReferences } from './references';
import { HomeTestimonials } from './testimonials';

const Home = () => {
  return (
    <>
      <HomeBanner />
      <CompanyCasting />
      <Introduce />
      <HomeReferences />
      <HomeFeature />
      <HomeTestimonials />
    </>
  );
};

export default Home;
