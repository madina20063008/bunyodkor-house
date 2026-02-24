import { Hero } from './Hero';
import { About } from './About';
import { Features } from './Features';
import { Banner } from './Banner';
import { UnderConstruction } from './UnderConstruction';
import { Regions } from './Regions';
import { Reviews } from './Reviews';
import { Contact } from './Contact';
import { Footer } from './Footer';
import { ApartmentFinderSection } from './ApartmentFinderSection';
import OurProjects from './OurProjects';
import React from "react";

interface HomePageProps {
  lang: "en" | "ru" | "uz" | "ar" | "zh";
}

export function HomePage({ lang }: HomePageProps) {
  return (
    <>
      <Hero lang={lang} />
      <ApartmentFinderSection lang={lang} />
      <Features lang={lang} />
      <OurProjects lang={lang} />
      <Banner lang={lang} />
      {/* <ReadyHomes lang={lang} /> */}
      <UnderConstruction lang={lang} />
      <Regions lang={lang} />
      <About lang={lang} />
      <Reviews lang={lang} />
      <Contact lang={lang} />
      <Footer lang={lang} />
    </>
  );
}
