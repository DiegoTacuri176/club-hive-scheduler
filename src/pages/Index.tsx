
import { HeroSection } from "@/components/home/HeroSection"
import { FeaturedFacilities } from "@/components/home/FeaturedFacilities"
import { UpcomingEvents } from "@/components/home/UpcomingEvents"
import { HowItWorks } from "@/components/home/HowItWorks"
import { facilities, events } from "@/data/mockData"

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedFacilities facilities={facilities} />
      <HowItWorks />
      <UpcomingEvents events={events} />
    </div>
  )
}

export default Index
