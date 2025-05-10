
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { FacilityCard } from "@/components/facilities/FacilityCard"
import { Facility } from "@/types"

interface FeaturedFacilitiesProps {
  facilities: Facility[]
}

export function FeaturedFacilities({ facilities }: FeaturedFacilitiesProps) {
  // Get just a subset of facilities to feature
  const featuredFacilities = facilities.slice(0, 3)
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-heading">Nuestras Instalaciones</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Disfruta de nuestras modernas instalaciones diseñadas para brindarte la mejor experiencia deportiva y social.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredFacilities.map((facility) => (
            <FacilityCard key={facility.id} facility={facility} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link to="/facilities">Ver Todas las Instalaciones</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
