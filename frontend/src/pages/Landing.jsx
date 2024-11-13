
import Bento from "../components/BentoGrid";
import Features from "../components/Features";
import { Hero } from "../components/hero";
import Stats from "../components/Stats";
import { FooterSection } from "../components/FooterSection";

export function Landing(){
    return(
        <>
        <Hero/>
        <Features/>
        <Bento/>
        <Stats/>
        <FooterSection/>
        </>
    );
}