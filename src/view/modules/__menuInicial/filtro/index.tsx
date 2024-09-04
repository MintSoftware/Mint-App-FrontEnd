import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { mostraTodosEstadosBrasileiros, obterCidadesPorEstado } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChangeEvent, useEffect } from "react";

interface Esportes {
  volei: boolean;
  futsal: boolean;
  beachTennis: boolean;
  futebolSociety: boolean;
  voleiDePraia: boolean;
  tenis: boolean;
  basquete: boolean;
}

interface FiltroProps {
  nomePesquisa: string;
  setNomePesquisa: (value: string) => void;
  data: string;
  setData: (value: string) => void;
  horaInicio: string;
  setHoraInicio: (value: string) => void;
  horaFim: string;
  setHoraFim: (value: string) => void;
  estado: string;
  setEstado: (value: string) => void;
  cidade: string[];
  setCidade: (value: string[]) => void;
  cidadeSelecionada: string;
  setCidadeSelecionada: (value: string) => void;
  esportes: Esportes;
  setEsportes: (value: Esportes) => void;
  handleFilter: () => void;
}

export default function  Filtro({
  nomePesquisa,
  setNomePesquisa,
  data,
  setData,
  horaInicio,
  setHoraInicio,
  horaFim,
  setHoraFim,
  estado,
  setEstado,
  cidade,
  setCidade,
  cidadeSelecionada,
  setCidadeSelecionada,
  esportes,
  //setEsportes,
  handleFilter,
}: FiltroProps) {
  useEffect(() => {
    if (estado) {
      const cidadesPorEstado = obterCidadesPorEstado(estado);
      setCidade(cidadesPorEstado);
    } else {
      setCidade([]);
      setCidadeSelecionada("");
    }
  }, [estado]);

  return (
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
              </div>
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
                disabled={!estado} 
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
          </AccordionContent>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
