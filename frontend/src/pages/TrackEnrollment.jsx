import { FooterSection } from "../components/FooterSection";
import { Navbar } from "../components/Navbar";
import { CardViewCourses } from "../components/CardViewCourses";

export default function TrackEnrollment() {
  return (
    <>
      <Navbar />
        <div className="">
            <CardViewCourses/>
        </div>
      <FooterSection />
    </>
  );
}


