import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { ArrowLeft, Play, Pause, Square, Camera, CheckCircle, User, Calendar, Clock } from 'lucide-react';

interface LabVisionMeasurementProps {
  examId: string;
  onLogout: () => void;
  onBack: () => void;
  onComplete: () => void;
}

export default function LabVisionMeasurement({ 
  examId, 
  onLogout, 
  onBack, 
  onComplete 
}: LabVisionMeasurementProps) {
  
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState('Preparação');

  // Mock patient data baseado no examId
  const [patientInfo] = useState(() => {
    const patients = {
      '2': { 
        name: 'João Carlos Oliveira', 
        age: 45, 
        gender: 'M',
        type: 'Análise Histopatológica',
        doctor: 'Dr. Carlos Mendes',
        priority: 'alta'
      },
      '3': { 
        name: 'Ana Paula Costa', 
        age: 32, 
        gender: 'F',
        type: 'Citologia Cervical',
        doctor: 'Dra. Maria Fernanda',
        priority: 'media'
      },
      '5': { 
        name: 'Pedro Santos Lima', 
        age: 58, 
        gender: 'M',
        type: 'Biópsia de Próstata',
        doctor: 'Dr. Roberto Silva',
        priority: 'alta'
      },
      '6': { 
        name: 'Luciana Rocha', 
        age: 28, 
        gender: 'F',
        type: 'Análise de Linfonodo',
        doctor: 'Dr. João Pereira',
        priority: 'baixa'
      }
    };
    return patients[examId as keyof typeof patients] || { 
      name: 'Paciente não encontrado', 
      age: 0, 
      gender: 'N/A',
      type: 'Tipo não identificado',
      doctor: 'Médico não identificado',
      priority: 'media'
    };
  });

  const steps = [
    'Preparação',
    'Calibração',
    'Captura de Imagem',
    'Análise Automática',
    'Validação',
    'Finalização'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && !isPaused && !isComplete) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
        setProgress(prev => {
          const newProgress = prev + 0.5; // Aumenta 0.5% a cada segundo
          
          // Atualiza o step baseado no progresso
          const stepIndex = Math.floor(newProgress / (100 / steps.length));
          if (stepIndex < steps.length) {
            setCurrentStep(steps[stepIndex]);
          }
          
          if (newProgress >= 100) {
            setIsComplete(true);
            setIsRunning(false);
            setCurrentStep('Concluído');
            return 100;
          }
          return newProgress;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, isPaused, isComplete]);

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setProgress(0);
    setTimeElapsed(0);
    setCurrentStep('Preparação');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'alta':
        return <Badge variant="destructive">Alta</Badge>;
      case 'media':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Média</Badge>;
      case 'baixa':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Baixa</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-900 flex flex-col overflow-hidden relative">
      {/* Botão Voltar - Fixo no canto superior direito */}
      <div className="absolute top-2 right-2 z-10">
        <Button
          variant="ghost"
          onClick={onBack}
          size="sm"
          className="text-slate-300 hover:text-white hover:bg-slate-800/80 backdrop-blur-sm h-8 px-3 rounded-full border border-slate-700/50"
        >
          <ArrowLeft className="w-3 h-3 mr-1" />
          <span className="text-xs">Voltar</span>
        </Button>
      </div>

      {/* Layout compacto para iPhone 5 landscape (568x320) */}
      <div className="flex-1 flex items-center justify-center p-2">
        
        {/* Área de Visualização Central */}
        <div className="w-full h-full max-h-[300px]">
          <Card className="bg-slate-800 border-slate-700 h-full">
            <CardHeader className="pb-2 pt-3 px-3">
              <CardTitle className="text-white flex items-center text-sm">
                <Camera className="w-3 h-3 mr-1" />
                Visualização da Amostra
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 h-[calc(100%-60px)] flex flex-col">
              {/* Área da câmera - compacta */}
              <div className="flex-1 bg-slate-900 rounded border border-slate-600 flex items-center justify-center relative overflow-hidden min-h-[120px]">
                {isComplete ? (
                  <div className="text-center">
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-1" />
                    <p className="text-green-400 text-xs">Medição Concluída!</p>
                    <p className="text-slate-400 text-xs">Resultados salvos</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mb-2 mx-auto">
                      <div className={`w-12 h-12 rounded-full border-2 ${
                        isRunning && !isPaused ? 'border-blue-500 animate-pulse' : 'border-slate-500'
                      }`}>
                      </div>
                    </div>
                    <p className="text-slate-300 text-xs">
                      {isRunning && !isPaused ? 'Analisando...' : 'Posicione a amostra'}
                    </p>
                    <p className="text-slate-500 text-xs mt-1">
                      {currentStep}
                    </p>
                  </div>
                )}
                
                {/* Overlay de progresso compacto */}
                {isRunning && (
                  <div className="absolute bottom-1 left-1 right-1">
                    <div className="bg-slate-800/90 rounded p-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white text-xs">{currentStep}</span>
                        <span className="text-slate-300 text-xs">{progress.toFixed(0)}%</span>
                      </div>
                      <Progress value={progress} className="h-1" />
                    </div>
                  </div>
                )}
              </div>

              {/* Controles compactos */}
              <div className="mt-2 flex items-center justify-center space-x-2">
                {!isComplete ? (
                  <>
                    {!isRunning ? (
                      <Button
                        onClick={handleStart}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white px-3 h-7 text-xs"
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Iniciar
                      </Button>
                    ) : (
                      <Button
                        onClick={handlePause}
                        variant="outline"
                        size="sm"
                        className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-3 h-7 text-xs"
                      >
                        <Pause className="w-3 h-3 mr-1" />
                        {isPaused ? 'Retomar' : 'Pausar'}
                      </Button>
                    )}
                    
                    <Button
                      onClick={handleStop}
                      variant="outline"
                      size="sm"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-3 h-7 text-xs"
                      disabled={!isRunning && progress === 0}
                    >
                      <Square className="w-3 h-3 mr-1" />
                      Parar
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={onComplete}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 h-7 text-xs"
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Ver Resultados
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}