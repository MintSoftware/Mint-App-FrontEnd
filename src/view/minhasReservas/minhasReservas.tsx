import * as React from 'react'
import { format, addDays, subDays, isSameDay, isAfter, startOfDay, endOfDay, addMonths, subMonths, parse, setHours, setMinutes, addHours } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronLeft, ChevronRight, CalendarIcon, Clock } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Evento {
  id: number
  local: string
  data: Date
  horario: string
}

const hoje = startOfDay(new Date())
const mesAtual = hoje.getMonth()
const anoAtual = hoje.getFullYear()

const eventosIniciais: Evento[] = [
  { id: 1, local: 'Sala de Reuniões A', data: hoje, horario: '09:00 às 10:00' },
  { id: 2, local: 'Restaurante Central', data: addDays(hoje, 2), horario: '12:00 às 13:00' },
  { id: 3, local: 'Escritório Principal', data: addDays(hoje, 5), horario: '14:00 às 15:00' },
  { id: 4, local: 'Sala de Conferências', data: addDays(hoje, 7), horario: '10:00 às 11:00' },
  { id: 5, local: 'Área de Lazer', data: addDays(hoje, 10), horario: '19:00 às 20:00' },
]

interface AgendaModalProps {
  onClose: () => void
}

const buscarLocaisDoBackend = async (): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return ['Sala de Reuniões A', 'Sala de Reuniões B', 'Escritório Principal', 'Restaurante Central', 'Área de Lazer', 'Sala de Conferências']
}

export default function MinhasReservas({ onClose }: AgendaModalProps) {
  const [dataSelecionada, setDataSelecionada] = React.useState<Date>(hoje)
  const [mesExibido, setMesExibido] = React.useState<Date>(hoje)
  const [eventos, setEventos] = React.useState<Evento[]>(eventosIniciais)
  const [eventoSelecionado, setEventoSelecionado] = React.useState<Evento | null>(null)
  const [modoEdicao, setModoEdicao] = React.useState(false)
  const [modalHorarioAberto, setModalHorarioAberto] = React.useState(false)
  const [alertaCancelamentoAberto, setAlertaCancelamentoAberto] = React.useState(false)
  const [alertaEdicaoAberto, setAlertaEdicaoAberto] = React.useState(false)
  const [detalhesEventoAberto, setDetalhesEventoAberto] = React.useState(false)
  const [locaisDisponiveis, setLocaisDisponiveis] = React.useState<string[]>([])

  React.useEffect(() => {
    buscarLocaisDoBackend().then(setLocaisDisponiveis)
  }, [])

  const handleDiaAnterior = React.useCallback(() => {
    const novoDia = subDays(dataSelecionada, 1)
    setDataSelecionada(novoDia)
    if (novoDia.getMonth() !== mesExibido.getMonth()) {
      setMesExibido(novoDia)
    }
  }, [dataSelecionada, mesExibido])

  const handleProximoDia = React.useCallback(() => {
    const novoDia = addDays(dataSelecionada, 1)
    setDataSelecionada(novoDia)
    if (novoDia.getMonth() !== mesExibido.getMonth()) {
      setMesExibido(novoDia)
    }
  }, [dataSelecionada, mesExibido])

  const handleMesAnterior = React.useCallback(() => {
    setMesExibido(prevMes => subMonths(prevMes, 1))
  }, [])

  const handleProximoMes = React.useCallback(() => {
    setMesExibido(prevMes => addMonths(prevMes, 1))
  }, [])

  const temEventos = React.useCallback((data: Date) => {
    return eventos.some(evento => isSameDay(evento.data, data))
  }, [eventos])

  const ehHoje = React.useCallback((data: Date) => {
    return isSameDay(data, hoje)
  }, [])

  const getEventosPorData = React.useCallback((data: Date) => {
    return eventos.filter(evento => isSameDay(evento.data, data))
  }, [eventos])

  const handleEventoClick = (evento: Evento) => {
    setEventoSelecionado(evento)
    setModoEdicao(false)
    setDetalhesEventoAberto(true)
  }

  const handleFecharDetalhes = () => {
    setEventoSelecionado(null)
    setModoEdicao(false)
    setDetalhesEventoAberto(false)
  }

  const handleEditarEvento = () => {
    setModoEdicao(true)
  }

  const handleSalvarEdicao = () => {
    setAlertaEdicaoAberto(true)
  }

  const confirmarEdicao = () => {
    if (eventoSelecionado) {
      setEventos(prevEventos => {
        const eventosAtualizados = prevEventos.filter(ev => ev.id !== eventoSelecionado.id)
        return [...eventosAtualizados, eventoSelecionado]
      })
      setModoEdicao(false)
      setAlertaEdicaoAberto(false)
      setDetalhesEventoAberto(false)
      setDataSelecionada(eventoSelecionado.data)
    }
  }

  const cancelarEdicao = () => {
    setAlertaEdicaoAberto(false)
    setModoEdicao(false)
  }

  const handleCancelarEvento = () => {
    setAlertaCancelamentoAberto(true)
  }

  const confirmarCancelamento = () => {
    if (eventoSelecionado) {
      setEventos(prevEventos => 
        prevEventos.filter(ev => ev.id !== eventoSelecionado.id)
      )
      setEventoSelecionado(null)
      setAlertaCancelamentoAberto(false)
      setDetalhesEventoAberto(false)
    }
  }

  const cancelarCancelamento = () => {
    setAlertaCancelamentoAberto(false)
  }

  const handleLocalChange = (value: string) => {
    if (eventoSelecionado) {
      setEventoSelecionado({ ...eventoSelecionado, local: value })
    }
  }

  const handleDataChange = (date: Date | undefined) => {
    if (date && eventoSelecionado) {
      setEventoSelecionado({ ...eventoSelecionado, data: date })
    }
  }

  const handleHorarioClick = () => {
    setModalHorarioAberto(true)
  }

  const handleSelecionarHorario = (horario: string) => {
    if (eventoSelecionado) {
      setEventoSelecionado({ ...eventoSelecionado, horario })
      setModalHorarioAberto(false)
    }
  }

  const gerarHorarios = () => {
    const horarios = []
    for (let i = 0; i < 24; i++) {
      const inicio = `${i.toString().padStart(2, '0')}:00`
      const fim = `${(i + 1).toString().padStart(2, '0')}:00`
      horarios.push(`${inicio} às ${fim}`)
    }
    return horarios
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card w-full max-w-md rounded-lg shadow-lg overflow-hidden flex flex-col h-[90vh] sm:h-[80vh]">
        <div className="p-4 border-b flex justify-between items-center">
          <Button variant="ghost" onClick={onClose} className="text-sm">
            Voltar
          </Button>
          <h2 className="text-lg font-semibold">Minhas Reservas</h2>
          <div className="w-16" />
        </div>
        <div className="flex-grow flex flex-col overflow-hidden">
          <div className="p-4 flex-shrink-0 flex flex-col items-center">
            <div className="flex justify-between items-center w-full mb-4">
              <Button variant="outline" size="icon" onClick={handleMesAnterior}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold">
                {format(mesExibido, "MMMM yyyy", { locale: ptBR })}
              </h3>
              <Button variant="outline" size="icon" onClick={handleProximoMes}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Calendar
              mode="single"
              selected={dataSelecionada}
              onSelect={(date) => date && setDataSelecionada(date)}
              month={mesExibido}
              onMonthChange={setMesExibido}
              className="rounded-md border shadow w-full"
              locale={ptBR}
              modifiers={{
                evento: temEventos,
                hoje: ehHoje,
                selecionado: (date) => isSameDay(date, dataSelecionada)
              }}
              modifiersStyles={{
                evento: { 
                  backgroundColor: '#10b981', 
                  color: 'white', 
                  fontWeight: 'bold',
                },
                hoje: {
                  border: '1px solid #10b981',
                },
                selecionado: {
                  border: '2px solid #10b981',
                  backgroundColor: 'transparent',
                  color: 'inherit'
                }
              }}
              styles={{
                day_selected: {
                  backgroundColor: 'transparent',
                  color: 'inherit'
                },
                day_today: {
                  color: '#10b981',
                  fontWeight: 'bold'
                }
              }}
              classNames={{
                day_selected: 'bg-transparent text-inherit',
                day_today: 'text-emerald-500 font-bold',
                table: 'w-full border-collapse',
                head_row: 'flex',
                head_cell: 'text-muted-foreground font-normal text-[0.8rem] w-9 h-9 flex-shrink-0 flex items-center justify-center',
                row: 'flex w-full mt-2',
                cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 h-9 w-9 flex-shrink-0 flex items-center justify-center',
                day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
                day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
                day_hidden: 'invisible',
                nav: 'hidden',
                caption: 'hidden',
                root: 'w-full'
              }}
            />
          </div>
          <div className="p-4 border-t flex-grow flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" size="icon" onClick={handleDiaAnterior}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold">
                {format(dataSelecionada, "d 'de' MMMM, EEEE", { locale: ptBR })}
              </h3>
              <Button variant="outline" size="icon" onClick={handleProximoDia}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="flex-grow">
              {getEventosPorData(dataSelecionada).map((evento) => (
                <div 
                  key={evento.id} 
                  className="mb-4 p-3 bg-muted rounded-md cursor-pointer hover:bg-muted/80"
                  onClick={() => handleEventoClick(evento)}
                >
                  <h4 className="font-semibold">{evento.local}</h4>
                  <p className="text-sm text-muted-foreground">{evento.horario}</p>
                </div>
              ))}
              {getEventosPorData(dataSelecionada).length === 0 && (
                <p className="text-center text-muted-foreground">Nenhum evento agendado para este dia.</p>
              )}
            </ScrollArea>
          </div>
        </div>
      </div>

      <Dialog open={detalhesEventoAberto} onOpenChange={handleFecharDetalhes}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{modoEdicao ? "Editar Evento" : "Detalhes do Evento"}</DialogTitle>
          </DialogHeader>
          {eventoSelecionado && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Local:</label>
                {modoEdicao ? (
                  <Select onValueChange={handleLocalChange} defaultValue={eventoSelecionado.local}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um local" />
                    </SelectTrigger>
                    <SelectContent>
                      {locaisDisponiveis.map((local) => (
                        <SelectItem key={local} value={local}>
                          {local}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p>{eventoSelecionado.local}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Data:</label>
                {modoEdicao ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`w-full justify-start text-left font-normal`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(eventoSelecionado.data, "PPP", { locale: ptBR })}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={eventoSelecionado.data}
                        onSelect={handleDataChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                ) : (
                  <p>{format(eventoSelecionado.data, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Horário:</label>
                {modoEdicao ? (
                  <Button
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal`}
                    onClick={handleHorarioClick}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {eventoSelecionado.horario}
                  </Button>
                ) : (
                  <p>{eventoSelecionado.horario}</p>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            {modoEdicao ? (
              <>
                <Button onClick={handleSalvarEdicao}>Salvar</Button>
                <Button variant="outline" onClick={() => setModoEdicao(false)}>Cancelar</Button>
              </>
            ) : (
              <>
                <Button onClick={handleEditarEvento}>Editar</Button>
                <Button variant="destructive" onClick={handleCancelarEvento}>Cancelar Evento</Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={modalHorarioAberto} onOpenChange={setModalHorarioAberto}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Selecione o horário desejado</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[300px] pr-4">
            <div className="flex flex-col items-center">
              {gerarHorarios().map((horario) => (
                <Button
                  key={horario}
                  variant="ghost"
                  className="w-full justify-center mb-2"
                  onClick={() => handleSelecionarHorario(horario)}
                >
                  {horario}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <AlertDialog open={alertaCancelamentoAberto} onOpenChange={setAlertaCancelamentoAberto}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar Evento</AlertDialogTitle>
            <AlertDialogDescription>
              Deseja prosseguir com o cancelamento?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelarCancelamento}>Não</AlertDialogCancel>
            <AlertDialogAction onClick={confirmarCancelamento}>Sim</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={alertaEdicaoAberto} onOpenChange={setAlertaEdicaoAberto}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Editar Evento</AlertDialogTitle>
            <AlertDialogDescription>
              Deseja prosseguir com a edição?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelarEdicao}>Não</AlertDialogCancel>
            <AlertDialogAction onClick={confirmarEdicao}>Sim</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}