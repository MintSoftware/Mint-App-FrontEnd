import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

interface LocalSelecionadoProps {
  localTitle: string;
}

export default function LocalSelecionado({ localTitle }: LocalSelecionadoProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  // Dados mockados - na implementação real, estes viriam do backend
  const userName = "João Silva";
  const userPhoto = "/placeholder.svg";
  const companyLogo = "/placeholder.svg";
  const localPhotos = ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"];
  const localInfo = {
    sports: "Futebol, Vôlei",
    characteristics: "Coberto, Grama sintética",
    hourlyRate: "R$ 100,00"
  };
  const schedule = {
    "Segunda": ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"],
    "Terça": ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"],
    // ... outros dias da semana
  };
  const unavailableTimes = ["Segunda 13:00", "Terça 11:00"];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? localPhotos.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === localPhotos.length - 1 ? 0 : prev + 1));
  };

  const handleTimeSelect = (day: string, time: string) => {
    const timeString = `${day} ${time}`;
    setSelectedTimes((prev) => 
      prev.includes(timeString)
        ? prev.filter(t => t !== timeString)
        : [...prev, timeString]
    );
  };

  const isTimeAvailable = (day: string, time: string) => {
    return !unavailableTimes.includes(`${day} ${time}`);
  };

  // Função mockada para buscar dados do local baseado no título (exemplo)
  const fetchLocalData = (title: string) => {
    // Simulação de busca de dados baseados no título
    // Em uma aplicação real, você faria uma chamada para a API para obter as informações reais
    console.log(`Buscando dados para o local: ${title}`);
  };

  useEffect(() => {
    fetchLocalData(localTitle);
  }, [localTitle]);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold">Reservar Local</div>
          <div className="flex items-center gap-2">
            <span>{userName}</span>
            <img src={userPhoto} alt={userName} className="w-10 h-10 rounded-full" />
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <img src={companyLogo} alt="Logo da empresa" className="h-16" />
        </div>

        <div className="relative mb-4">
          <img 
            src={localPhotos[currentImageIndex]} 
            alt={`Foto do local ${currentImageIndex + 1}`} 
            className="w-full h-64 object-cover rounded-lg"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-1/2 left-2 transform -translate-y-1/2"
            onClick={handlePrevImage}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-1/2 right-2 transform -translate-y-1/2"
            onClick={handleNextImage}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <div className="space-y-2 mb-4">
          <p><strong>Esportes:</strong> {localInfo.sports}</p>
          <p><strong>Características:</strong> {localInfo.characteristics}</p>
          <p><strong>Valor por hora:</strong> {localInfo.hourlyRate}</p>
        </div>

        <Accordion type="single" collapsible className="mb-4">
          <AccordionItem value="horarios">
            <AccordionTrigger>Horários</AccordionTrigger>
            <AccordionContent>
              {Object.entries(schedule).map(([day, times]) => (
                <div key={day} className="mb-2">
                  <h3 className="font-semibold">{day}</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {times.map((time) => {
                      const isAvailable = isTimeAvailable(day, time);
                      return (
                        <label 
                          key={`${day}-${time}`} 
                          className={`flex items-center space-x-2 ${isAvailable ? '' : 'opacity-50'}`}
                        >
                          <Checkbox 
                            checked={selectedTimes.includes(`${day} ${time}`)}
                            onCheckedChange={() => isAvailable && handleTimeSelect(day, time)}
                            disabled={!isAvailable}
                          />
                          <span>{time}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex justify-end space-x-2">
          <Button variant="outline">Voltar</Button>
          <Button disabled={selectedTimes.length === 0}>Reservar</Button>
        </div>
      </CardContent>
    </Card>
  );
}
