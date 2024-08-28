// pages/MenuInicial.tsx
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { mostraTodosEstadosBrasileiros, obterCidadesPorEstado } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChangeEvent, useEffect, useState } from "react";
import CarouselItemComponent from "@/components/CarouselItemComponent";

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

  useEffect(() => {
    if (estado) {
      const cidadesPorEstado = obterCidadesPorEstado(estado);
      setCidade(cidadesPorEstado);
    } else {
      setCidade([]);
      setCidadeSelecionada("");
    }
  }, [estado]);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setEsportes((prevEsportes) => ({
      ...prevEsportes,
      [id]: checked,
    }));
  };

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
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <div className="relative">
              <Label className="absolute top-5 z-20">Filtros</Label>
              <AccordionTrigger><div></div></AccordionTrigger>
              <AccordionContent className="p-2">
                <div className="flex flex-col space-y-2">
                  <Input 
                    type="text" 
                    placeholder="Pesquisa por nome" 
                    className="border border-muted/40 border-white text-sm" 
                    value={nomePesquisa}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNomePesquisa(e.target.value)}
                  />
                  <div className="space-y-1">
                    <Label className="text-sm font-bold">Data</Label>
                    <Input 
                      type="date" 
                      placeholder="Date" 
                      className="border border-muted/40 text-sm border-white" 
                      value={data}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setData(e.target.value)}
                    />
                    <div className="flex space-x-2">
                      <div className="flex items-center space-x-2">
                        <Label className="text-sm font-bold">Hora início</Label>
                        <Input 
                          id="horaInicio" 
                          type="time" 
                          value={horaInicio} 
                          className="time-input border-white ml-2 w-1/2" 
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setHoraInicio(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center space-x-2 m-2">
                        <Label className="text-sm font-bold">Hora fim</Label>
                        <Input 
                          id="horaFim" 
                          type="time" 
                          value={horaFim} 
                          className="time-input border-white ml-2 w-1/2" 
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setHoraFim(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                    <Select value={estado} onValueChange={(value) => setEstado(value)}>
                        <SelectTrigger className="border border-muted/40 text-sm border-white">
                          <SelectValue placeholder="Escolha um estado" />
                        </SelectTrigger>
                        <SelectContent className="border border-muted/40 text-sm">
                          {mostraTodosEstadosBrasileiros().map((estado) => (
                            <SelectItem key={estado} value={estado}>{estado}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select 
                        value={cidadeSelecionada} 
                        onValueChange={(value) => setCidadeSelecionada(value)}
                        disabled={!estado} // Desabilita o campo se o estado não estiver preenchido
                      >
                        <SelectTrigger className="border border-muted/40 text-sm border-white">
                          <SelectValue placeholder="Escolha uma cidade" />
                        </SelectTrigger>
                        <SelectContent className="border border-muted/40 text-sm">
                          {cidade.map((cidade) => (
                            <SelectItem key={cidade} value={cidade}>{cidade}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="space-y-1">
                        <Label className="text-xs font-medium">Esportes</Label>
                        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                          {Object.keys(esportes).map((sport) => (
                            <div key={sport} className="flex items-center space-x-1">
                              <Checkbox 
                                id={sport} 
                                className="border border-muted/40 border-white" 
                                checked={esportes[sport as keyof Esportes]}
                                //onChange={handleCheckboxChange}
                              />
                              <Label htmlFor={sport} className="text-xs">{sport.replace(/([A-Z])/g, ' $1').toUpperCase()}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-5" onClick={handleFilter}>Pesquisar</Button>
                  </div>
                </div>
              </AccordionContent>
            </div>
          </AccordionItem>
        </Accordion>
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
            />
            <CarouselItemComponent 
              imageSrc="/forever_alone.png" 
              title="Presidio Santa Augusta1" 
              location="Criciúma, SC" 
              price="R$ 110,00" 
            />
            <CarouselItemComponent 
              imageSrc="/quadra_arlivre.png" 
              title="Arranca a Sola" 
              location="Meleiro, SC" 
              price="R$ 180,00" 
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
            />
            <CarouselItemComponent 
              imageSrc="/quadra_campo.png" 
              title="Campo de Vôlei" 
              location="Rio de Janeiro, RJ" 
              price="R$120,00" 
            />
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
