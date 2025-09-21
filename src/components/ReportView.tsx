import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { ArrowLeft, CheckCircle, Edit, FileText, User, Calendar, Microscope } from 'lucide-react';
import Header from './Header';

interface ReportViewProps {
  examId: string;
  onBack: () => void;
  onLogout: () => void;
  userType: 'doctor' | 'pathologist';
}

export default function ReportView({ examId, onBack, onLogout, userType }: ReportViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedReport, setEditedReport] = useState('');

  // Mock report data - in real app this would come from props or API
  const reportData = {
    id: examId,
    patient: 'Maria Silva Santos',
    type: 'Biópsia de Mama',
    date: '2024-01-15',
    reportDate: '2024-01-17',
    pathologist: 'Dr. Ana Patologista',
    requestingDoctor: 'Dr. Carlos Mendes',
    status: 'concluido',
    measurements: {
      width: '1.2 cm',
      length: '1.5 cm',
      height: '0.8 cm'
    },
    automaticReport: `LAUDO HISTOPATOLÓGICO

MATERIAL EXAMINADO: Fragmento de tecido mamário obtido por biópsia core.

DESCRIÇÃO MACROSCÓPICA: Recebido fragmento de tecido de coloração pardacenta, medindo 1,5 x 1,2 x 0,8 cm.

DESCRIÇÃO MICROSCÓPICA: O material examinado revela parênquima mamário com arquitetura preservada. Observam-se ductos e lóbulos de aspecto usual, sem alterações significativas. Estroma fibroso circunjacente sem particularidades. Ausência de atipias celulares, figuras de mitose atípicas ou sinais de malignidade.

DIAGNÓSTICO: Parênquima mamário sem alterações histopatológicas significativas. Ausência de malignidade no material examinado.

OBSERVAÇÕES: Correlacionar com dados clínicos e achados radiológicos. Em caso de discordância clínico-patológica, considerar nova amostragem.`
  };

  const handleEdit = () => {
    setEditedReport(reportData.automaticReport);
    setIsEditing(true);
  };

  const handleConfirm = () => {
    setIsEditing(false);
    // In real app, this would save the report
  };

  const handleSave = () => {
    setIsEditing(false);
    // In real app, this would save the edited report
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header userType={userType} onLogout={onLogout} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-slate-600 hover:text-slate-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {userType === 'doctor' ? 'Voltar ao Dashboard' : 'Voltar aos Exames'}
          </Button>
          
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl text-slate-800">Laudo Histopatológico</h2>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              Concluído
            </Badge>
          </div>
          <p className="text-slate-600">Relatório detalhado do exame</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Informações do Exame
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm text-slate-600">Paciente:</label>
                <p>{reportData.patient}</p>
              </div>
              <div>
                <label className="text-sm text-slate-600">Médico Solicitante:</label>
                <p>{reportData.requestingDoctor}</p>
              </div>
              <div>
                <label className="text-sm text-slate-600">Patologista:</label>
                <p>{reportData.pathologist}</p>
              </div>
              <div>
                <label className="text-sm text-slate-600">Data do Exame:</label>
                <p>{new Date(reportData.date).toLocaleDateString('pt-BR')}</p>
              </div>
              <div>
                <label className="text-sm text-slate-600">Data do Laudo:</label>
                <p>{new Date(reportData.reportDate).toLocaleDateString('pt-BR')}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Microscope className="w-5 h-5 mr-2 text-blue-600" />
                Medidas da Amostra
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-slate-600 mb-1">Largura</p>
                  <p className="text-lg">{reportData.measurements.width}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-slate-600 mb-1">Comprimento</p>
                  <p className="text-lg">{reportData.measurements.length}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-slate-600 mb-1">Altura</p>
                  <p className="text-lg">{reportData.measurements.height}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Laudo Automático
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div>
                <Textarea
                  value={editedReport}
                  onChange={(e) => setEditedReport(e.target.value)}
                  className="min-h-96 mb-4 font-mono text-sm"
                />
                <div className="flex justify-end space-x-3">
                  <Button 
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="text-slate-600"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Salvar Alterações
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <pre className="whitespace-pre-wrap font-mono text-sm text-slate-700 mb-6 bg-slate-50 p-4 rounded-lg">
                  {reportData.automaticReport}
                </pre>
                
                {userType === 'pathologist' && (
                  <div className="flex justify-end space-x-3">
                    <Button 
                      variant="outline"
                      onClick={handleEdit}
                      className="text-slate-600"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Editar Laudo
                    </Button>
                    <Button 
                      onClick={handleConfirm}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Confirmar Laudo
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}