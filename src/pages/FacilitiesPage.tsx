
import { useState } from "react";
import { facilities } from "@/data/mockData";
import { FacilityCard } from "@/components/facilities/FacilityCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FacilitiesPage = () => {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  // Filter facilities based on the selected type and search term
  const filteredFacilities = facilities.filter((facility) => {
    const matchesFilter = filter === "all" || facility.type === filter;
    const matchesSearch = facility.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      <div className="bg-gradient-to-r from-club-blue to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4 font-heading">Instalaciones</h1>
          <p className="max-w-3xl">
            Explora todas las instalaciones disponibles en nuestro club. Puedes
            reservar canchas, salas y más para tu uso personal o eventos.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="facility-type">Tipo de Instalación</Label>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger id="facility-type">
                  <SelectValue placeholder="Todos los tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="court">Canchas</SelectItem>
                  <SelectItem value="pool">Piscinas</SelectItem>
                  <SelectItem value="gym">Gimnasios</SelectItem>
                  <SelectItem value="salon">Salones</SelectItem>
                  <SelectItem value="other">Otros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="facility-search">Buscar</Label>
              <Input
                id="facility-search"
                placeholder="Nombre de la instalación"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredFacilities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacilities.map((facility) => (
              <FacilityCard key={facility.id} facility={facility} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No se encontraron instalaciones
            </h3>
            <p className="text-gray-500">
              Intenta con otros filtros o términos de búsqueda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacilitiesPage;
