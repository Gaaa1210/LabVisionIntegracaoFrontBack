import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  User, 
  FileText, 
  Camera, 
  Play, 
  Pause, 
  StopCircle, 
  Save,
  Activity,
  Monitor
} from 'lucide-react';
import Header from './Header';

interface CreateExamProps {
  onBack: () => void;
  onLogout: () => void;
  onSaveExam: () => void;
  userType: 'doctor' | 'pathologist';
}

export default function CreateExam({ onBack, onLogout, onSaveExam, userType }: CreateExamProps) {
  const [activeTab, setActiveTab] = useState('patient-info');
  const [isLabVisionRunning, setIsLabVisionRunning] = useState(false);
  const [measurementProgress, setMeasurementProgress] = useState(0);
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    gender: '',
    cpf: '',
    phone: '',
    email: '',
    address: '',
    examType: '',
    clinicalHistory: '',
    observations: ''
  });

  const handleStartLabVision = () => {
    setIsLabVisionRunning(true);
    setMeasurementProgress(0);
    
    // Simular progresso da medição
    const interval = setInterval(() => {
      setMeasurementProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLabVisionRunning(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const handleStopLabVision = () => {
    setIsLabVisionRunning(false);
    setMeasurementProgress(0);
  };

  const handleInputChange = (field: string, value: string) => {
    setPatientData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header userType="doctor" onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Dashboard
          </Button>
          
          <h2 className="text-2xl text-slate-800 mb-2">Criar Novo Exame</h2>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className={`grid w-full ${userType === 'doctor' ? 'grid-cols-1' : 'grid-cols-2'}`}>
            <TabsTrigger value="patient-info" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Informações do Paciente
            </TabsTrigger>
            {userType === 'pathologist' && (
              <TabsTrigger value="measurements" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Medições LabVision
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="patient-info" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Dados do Paciente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      value={patientData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Digite o nome completo do paciente"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="age">Idade *</Label>
                    <Input
                      id="age"
                      type="number"
                      value={patientData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      placeholder="Idade do paciente"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gênero *</Label>
                    <Select onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o gênero" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="feminino">Feminino</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                        <SelectItem value="nao-informado">Não informado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF *</Label>
                    <Input
                      id="cpf"
                      value={patientData.cpf}
                      onChange={(e) => handleInputChange('cpf', e.target.value)}
                      placeholder="000.000.000-00"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={patientData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={patientData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="paciente@email.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={patientData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Endereço completo do paciente"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="examType">Tipo de Exame *</Label>
                  <Select onValueChange={(value) => handleInputChange('examType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de exame" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="biopsia-mama">Biópsia de Mama</SelectItem>
                      <SelectItem value="histopatologica">Análise Histopatológica</SelectItem>
                      <SelectItem value="citologia-cervical">Citologia Cervical</SelectItem>
                      <SelectItem value="biopsia-pele">Biópsia de Pele</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="clinicalHistory">Histórico Clínico</Label>
                  <Textarea
                    id="clinicalHistory"
                    value={patientData.clinicalHistory}
                    onChange={(e) => handleInputChange('clinicalHistory', e.target.value)}
                    placeholder="Descreva o histórico clínico relevante do paciente"
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="observations">Observações</Label>
                  <Textarea
                    id="observations"
                    value={patientData.observations}
                    onChange={(e) => handleInputChange('observations', e.target.value)}
                    placeholder="Observações adicionais sobre o exame"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {userType === 'pathologist' && (
            <TabsContent value="measurements" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Visualização da Câmera */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-blue-600" />
                    Câmera LabVision - Tempo Real
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative bg-slate-900 rounded-lg aspect-video flex items-center justify-center">
                    {isLabVisionRunning ? (
                      <div className="text-center space-y-4">
                        <Monitor className="w-16 h-16 text-green-400 mx-auto animate-pulse" />
                        <Badge className="bg-green-100 text-green-800">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                          Câmera Ativa
                        </Badge>
                        <p className="text-green-400 text-sm">Capturando imagens em tempo real</p>
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                        <Monitor className="w-16 h-16 text-slate-400 mx-auto" />
                        <Badge variant="secondary">Câmera Inativa</Badge>
                        <p className="text-slate-400 text-sm">Inicie o LabVision para ativar a câmera</p>
                      </div>
                    )}
                  </div>
                  
                  {isLabVisionRunning && (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm text-slate-600">
                        <span>Qualidade da imagem:</span>
                        <span className="text-green-600">Alta (1080p)</span>
                      </div>
                      <div className="flex justify-between text-sm text-slate-600">
                        <span>FPS:</span>
                        <span className="text-green-600">30 fps</span>
                      </div>
                      <div className="flex justify-between text-sm text-slate-600">
                        <span>Zoom:</span>
                        <span className="text-blue-600">40x</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Controles do LabVision */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    Controles de Medição
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col gap-4">
                    {!isLabVisionRunning ? (
                      <Button
                        onClick={handleStartLabVision}
                        className="bg-green-600 hover:bg-green-700 text-white w-full"
                        size="lg"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Iniciar LabVision
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setIsLabVisionRunning(false)}
                          variant="outline"
                          className="flex-1"
                        >
                          <Pause className="w-4 h-4 mr-2" />
                          Pausar
                        </Button>
                        <Button
                          onClick={handleStopLabVision}
                          variant="destructive"
                          className="flex-1"
                        >
                          <StopCircle className="w-4 h-4 mr-2" />
                          Parar
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Progresso da Medição</span>
                      <span className="text-slate-800">{measurementProgress}%</span>
                    </div>
                    <Progress value={measurementProgress} className="h-3" />
                    
                    {measurementProgress > 0 && measurementProgress < 100 && (
                      <p className="text-sm text-blue-600">Medição em andamento...</p>
                    )}
                    
                    {measurementProgress === 100 && (
                      <Badge className="bg-green-100 text-green-800 w-full justify-center py-2">
                        Medição Concluída com Sucesso!
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-3 border-t pt-4">
                    <h4 className="text-sm text-slate-600">Status do Sistema</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Conexão LabVision:</span>
                        <Badge className={isLabVisionRunning ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-600"}>
                          {isLabVisionRunning ? "Conectado" : "Desconectado"}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Calibração:</span>
                        <Badge className="bg-green-100 text-green-800">OK</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Temperatura:</span>
                        <Badge className="bg-blue-100 text-blue-800">25°C</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resultados das Medições */}
            {measurementProgress === 100 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Resultados das Medições
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-600 mb-1">Área Total</p>
                      <p className="text-xl text-slate-800">2.45 mm²</p>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-600 mb-1">Perímetro</p>
                      <p className="text-xl text-slate-800">8.73 mm</p>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-600 mb-1">Densidade</p>
                      <p className="text-xl text-slate-800">74.2%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          )}
        </Tabs>

        {/* Botões de Ação */}
        <div className="flex justify-end gap-4 mt-8">
          <Button variant="outline" onClick={onBack}>
            Cancelar
          </Button>
          <Button
            onClick={onSaveExam}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!patientData.name || !patientData.age || !patientData.cpf || !patientData.examType}
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar Exame
          </Button>
        </div>
      </main>
    </div>
  );
}