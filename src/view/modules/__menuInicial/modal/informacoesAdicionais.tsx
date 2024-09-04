import { Label } from "@/components/ui/label";

interface AdditionalInfoProps {
    sports: string[];
    characteristics: string[];
    hourlyRate: string;
  }
  
  const AdditionalInfo = ({ sports, characteristics, hourlyRate }: AdditionalInfoProps) => {
    return (
      <>
       <Label >Esportes: {sports}</Label>
       <Label >Características: {characteristics}</Label>
       <Label >Valor por hora: {hourlyRate}</Label>
      </>
    );
  };
  
  export default AdditionalInfo;