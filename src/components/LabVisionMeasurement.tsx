import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { ArrowLeft, Play, Pause, Square, Camera, CheckCircle, User, Calendar, Clock } from 'lucide-react';
import Header from './Header';

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
    <div className="min-h-screen bg-slate-900">
      <Header userType="pathologist" onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[rgba(0,0,0,0)]">
        
        {/* Header da tela */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar aos Exames
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl text-white mb-2">Lab Vision - Medição em Andamento</h2>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-400">Sistema Online</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Câmera/Visualizador Principal */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Camera className="w-5 h-5 mr-2" />
                  Visualização da Amostra
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Simulação da câmera */}
                <div className="aspect-video bg-slate-900 rounded-lg border-2 border-slate-600 flex items-center justify-center relative overflow-hidden">
                  {isComplete ? (
                    <div className="text-center">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <p className="text-green-400 text-lg">Medição Concluída!</p>
                      <p className="text-slate-400 text-sm">Resultados foram salvos automaticamente</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-32 h-32 bg-slate-700 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <div className={`w-24 h-24 rounded-full border-4 ${
                          isRunning && !isPaused ? 'border-blue-500 animate-pulse' : 'border-slate-500'
                        }`}>
                        </div>
                      </div>
                      <p className="text-slate-300">
                        {isRunning && !isPaused ? 'Analisando amostra...' : 'Posicione a amostra no centro'}
                      </p>
                      <p className="text-slate-500 text-sm mt-2">
                        Status: {currentStep}
                      </p>
                    </div>
                  )}
                  
                  {/* Overlay de progresso */}
                  {isRunning && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-slate-800/80 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white text-sm">{currentStep}</span>
                          <span className="text-slate-300 text-sm">{progress.toFixed(0)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Controles da medição */}
                <div className="mt-6 flex items-center justify-center space-x-4">
                  {!isComplete ? (
                    <>
                      {!isRunning ? (
                        <Button
                          onClick={handleStart}
                          className="bg-green-600 hover:bg-green-700 text-white px-8"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Iniciar
                        </Button>
                      ) : (
                        <Button
                          onClick={handlePause}
                          variant="outline"
                          className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8"
                        >
                          <Pause className="w-4 h-4 mr-2" />
                          {isPaused ? 'Retomar' : 'Pausar'}
                        </Button>
                      )}
                      
                      <Button
                        onClick={handleStop}
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8"
                        disabled={!isRunning && progress === 0}
                      >
                        <Square className="w-4 h-4 mr-2" />
                        Parar
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={onComplete}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Ver Resultados
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Painel de Informações */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Informações do Paciente */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Informações do Paciente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-slate-400 text-sm">Nome</p>
                  <p className="text-white">{patientInfo.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-slate-400 text-sm">Idade</p>
                    <p className="text-white">{patientInfo.age} anos</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Gênero</p>
                    <p className="text-white">{patientInfo.gender === 'M' ? 'Masculino' : 'Feminino'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Tipo de Exame</p>
                  <p className="text-white">{patientInfo.type}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Médico Solicitante</p>
                  <p className="text-white">{patientInfo.doctor}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Prioridade</p>
                  <div className="mt-1">{getPriorityBadge(patientInfo.priority)}</div>
                </div>
              </CardContent>
            </Card>

            {/* Status da Medição */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Status da Medição
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-slate-400 text-sm">Tempo Decorrido</p>
                  <p className="text-white text-2xl">{formatTime(timeElapsed)}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Progresso</p>
                  <p className="text-white text-xl">{progress.toFixed(0)}%</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Etapa Atual</p>
                  <p className="text-white">{currentStep}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Status</p>
                  <p className={`${
                    isComplete ? 'text-green-400' : 
                    isRunning && !isPaused ? 'text-blue-400' : 
                    isPaused ? 'text-yellow-400' : 'text-slate-400'
                  }`}>
                    {isComplete ? 'Concluído' : 
                     isRunning && !isPaused ? 'Em andamento' : 
                     isPaused ? 'Pausado' : 'Aguardando'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Próximos Passos */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Próximos Passos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {steps.map((step, index) => {
                    const currentIndex = steps.indexOf(currentStep);
                    const isCompleted = index < currentIndex || isComplete;
                    const isCurrent = index === currentIndex && !isComplete;
                    
                    return (
                      <div 
                        key={step} 
                        className={`flex items-center space-x-2 p-2 rounded ${
                          isCompleted ? 'bg-green-900/50 text-green-400' :
                          isCurrent ? 'bg-blue-900/50 text-blue-400' :
                          'text-slate-500'
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${
                          isCompleted ? 'bg-green-500' :
                          isCurrent ? 'bg-blue-500' :
                          'bg-slate-600'
                        }`} />
                        <span>{step}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}