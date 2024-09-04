import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import CarouselItemComponent from "@/view/dashboard/menuInicial/carrosel";import Filtro from "./menuInicial/filtro";
'1'

interface Esportes {
  volei: boolean;
  futsal: boolean;
  beachTennis: boolean;
  futebolSociety: boolean;
  voleiDePraia: boolean;
  tenis: boolean;
  basquete: boolean;
}

export default function MenuInicial() {
  const [nomePesquisa, setNomePesquisa] = useState("");
  const [data, setData] = useState("");
  const [horaInicio, setHoraInicio] = useState("00:00");
  const [horaFim, setHoraFim] = useState("00:00");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState<string[]>([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const [esportes, setEsportes] = useState<Esportes>({
    volei: false,
    futsal: false,
    beachTennis: false,
    futebolSociety: false,
    voleiDePraia: false,
    tenis: false,
    basquete: false,
  });

  const handleFilter = () => {
    console.log({
      nomePesquisa,
      data,
      horaInicio,
      horaFim,
      estado,
      cidadeSelecionada,
    });
  };

  return (
    <div className="p-2 h-[100vh]">
      <div className="flex flex-col items-center">
        <img src="/logo.png" alt="Logo" className="w-20 h-17 mx-6 mb-6" />
      </div>
      <div className="p-2 rounded-lg shadow-md">
        <Filtro
          nomePesquisa={nomePesquisa}
          setNomePesquisa={setNomePesquisa}
          data={data}
          setData={setData}
          horaInicio={horaInicio}
          setHoraInicio={setHoraInicio}
          horaFim={horaFim}
          setHoraFim={setHoraFim}
          estado={estado}
          setEstado={setEstado}
          cidade={cidade}
          setCidade={setCidade}
          setCidadeSelecionada={setCidadeSelecionada}
          esportes={esportes}
          setEsportes={setEsportes}
          handleFilter={handleFilter} cidadeSelecionada={""} 
        />
        </div>
        <div className="space-y-2">
          <Label className="text-sm">Lugares baseados nas suas últimas pesquisas</Label>
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItemComponent 
                imageSrc="/abandonado.png"
                title="Bar do Zé"
                location="Criciúma, SC"
                price="R$150,00"
                additionalInfo={{
                  sports: ["Futebol, Vôlei"],
                  characteristics: ["Coberto, Grama sintética"],
                  hourlyRate: "R$ 100,00"
              }} additionalImages={[]}              />
              <CarouselItemComponent 
                imageSrc="/forever_alone.png" 
                title="Presidio Santa Augusta1" 
                location="Criciúma, SC" 
                price="R$ 110,00" 
                additionalInfo={{
                  sports: ["Futebol, Vôlei"],
                  characteristics:[ "Coberto, Grama sintética"],
                  hourlyRate: "R$ 100,00"
                }} additionalImages={[]}  
              />
              <CarouselItemComponent 
                imageSrc="/quadra_arlivre.png" 
                title="Arranca a Sola" 
                location="Meleiro, SC" 
                price="R$ 180,00"
                additionalInfo={{
                  sports: ["Futebol, Vôlei"],
                  characteristics: ["Coberto, Grama sintética"],
                  hourlyRate: "R$ 100,00"
                }} additionalImages={[]}
              />
            </CarouselContent>
          </Carousel>
        </div>
        <div>
          <Label className="text-sm">Últimas Reservas</Label>
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItemComponent 
              imageSrc="/quadra_boa.png"
              title="Quadra de Futebol"
              location="São Paulo, SP"
              price="R$100,00"
              additionalInfo={{
                sports: ["Futebol, Vôlei"],
                characteristics: ["Coberto, Grama sintética"],
                hourlyRate: "R$ 100,00"
              }} additionalImages={[]}              />
              <CarouselItemComponent 
                imageSrc="/quadra_campo.png" 
                title="Campo de Vôlei" 
                location="Rio de Janeiro, RJ" 
                price="R$120,00" 
                additionalInfo={{
                  sports:[ "Futebol, Vôlei"],
                  characteristics: ["Coberto, Grama sintética"],
                  hourlyRate: "R$ 100,00"
                }} additionalImages={[]}
              />
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    );
  }
  