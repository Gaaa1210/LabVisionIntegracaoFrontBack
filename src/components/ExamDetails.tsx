import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { ArrowLeft, Send, FileText, User, Calendar, Microscope } from 'lucide-react';
import Header from './Header';

interface ExamDetailsProps {
  examId: string;
  onBack: () => void;
  onLogout: () => void;
  onSendResult: () => void;
}

export default function ExamDetails({ examId, onBack, onLogout, onSendResult }: ExamDetailsProps) {
  const [result, setResult] = useState('');

  // Mock exam data - in real app this would come from props or API
  const examData = {
    id: examId,
    patient: 'João Carlos Oliveira',
    type: 'Análise Histopatológica',
    date: '2024-01-18',
    requestingDoctor: 'Dr. Carlos Mendes',
    priority: 'alta',
    samples: ['Amostra A1', 'Amostra A2'],
    clinicalHistory: 'Paciente masculino, 45 anos, com histórico de dor abdominal persistente há 3 meses. Ultrassom anterior mostrou área suspeita no fígado.',
    measurements: {
      width: '2.5 cm',
      length: '3.2 cm',
      height: '1.8 cm'
    }
  };

  const handleSendResult = () => {
    if (result.trim()) {
      onSendResult();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header userType="pathologist" onLogout={onLogout} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-slate-600 hover:text-slate-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar aos Exames Pendentes
          </Button>
          
          <h2 className="text-2xl text-slate-800 mb-2">Detalhes do Exame</h2>
          <p className="text-slate-600">Analise o exame e forneça o resultado</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Informações do Paciente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm text-slate-600">Paciente:</label>
                <p>{examData.patient}</p>
              </div>
              <div>
                <label className="text-sm text-slate-600">Médico Solicitante:</label>
                <p>{examData.requestingDoctor}</p>
              </div>
              <div>
                <label className="text-sm text-slate-600">Data da Solicitação:</label>
                <p>{new Date(examData.date).toLocaleDateString('pt-BR')}</p>
              </div>
              <div>
                <label className="text-sm text-slate-600">Prioridade:</label>
                <Badge variant="destructive" className="ml-2">Alta</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Microscope className="w-5 h-5 mr-2 text-blue-600" />
                Detalhes do Exame
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm text-slate-600">Tipo:</label>
                <p>{examData.type}</p>
              </div>
              <div>
                <label className="text-sm text-slate-600">Amostras:</label>
                <p>{examData.samples.join(', ')}</p>
              </div>
              <div>
                <label className="text-sm text-slate-600">Medidas:</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  <div className="bg-slate-50 p-2 rounded">
                    <p className="text-xs text-slate-600">Largura</p>
                    <p className="text-sm">{examData.measurements.width}</p>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <p className="text-xs text-slate-600">Comprimento</p>
                    <p className="text-sm">{examData.measurements.length}</p>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <p className="text-xs text-slate-600">Altura</p>
                    <p className="text-sm">{examData.measurements.height}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Histórico Clínico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700">{examData.clinicalHistory}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resultado da Análise</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={result}
              onChange={(e) => setResult(e.target.value)}
              placeholder="Digite aqui o resultado da análise patológica..."
              className="min-h-32 mb-4"
            />
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline"
                onClick={onBack}
                className="text-slate-600"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSendResult}
                disabled={!result.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar Resultado
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}