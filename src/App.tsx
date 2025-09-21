import { useState } from 'react';
import LoginPage from './components/LoginPage';
import DoctorDashboard from './components/DoctorDashboard';
import PathologistDashboard from './components/PathologistDashboard';
import LabVisionExams from './components/LabVisionExams';
import LabVisionMeasurement from './components/LabVisionMeasurement';
import ExamDetails from './components/ExamDetails';
import ReportView from './components/ReportView';
import CreateExam from './components/CreateExam';
import UnlockDevicePage from './components/UnlockDevicePage';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

type UserType = 'doctor' | 'pathologist';
type Page = 'login' | 'doctor-dashboard' | 'pathologist-dashboard' | 'exam-details' | 'report-view' | 'create-exam' | 'labvision-exams' | 'labvision-measurement' | 'unlock-device';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [selectedExamId, setSelectedExamId] = useState<string>('');
  const [selectedLabId, setSelectedLabId] = useState<string>('');
  const [selectedDeviceName, setSelectedDeviceName] = useState<string>('');


  const handleLogin = (user: UserType) => {
    setUserType(user);
    if (user === 'doctor') {
      setCurrentPage('doctor-dashboard');
      toast.success('Login realizado com sucesso! Bem-vindo ao LabVision.');
    } else {
      setCurrentPage('pathologist-dashboard');
      toast.success('Login realizado com sucesso! Bem-vindo ao LabVision.');
    }
  };

  const handleLogout = () => {
    setUserType(null);
    setCurrentPage('login');
    setSelectedExamId('');
    setSelectedLabId('');
    toast.info('Logout realizado com sucesso.');
  };

  const handleViewReport = (examId: string) => {
    setSelectedExamId(examId);
    setCurrentPage('report-view');
  };

  const handleViewExamDetails = (examId: string) => {
    setSelectedExamId(examId);
    setCurrentPage('exam-details');
  };



  const handleBackToDashboard = () => {
    if (userType === 'doctor') {
      setCurrentPage('doctor-dashboard');
    } else {
      setCurrentPage('pathologist-dashboard');
    }
    setSelectedExamId('');
    setSelectedLabId('');
  };

  const handleRequestUnlock = (labId: string, deviceName: string) => {
    setSelectedLabId(labId);
    setSelectedDeviceName(deviceName);
    setCurrentPage('unlock-device');
  };

  const handleUnlockSuccess = (password: string) => {
    toast.success('✅ LabVision desbloqueado com sucesso');
    setCurrentPage('labvision-exams');
  };

  const handleUnlockCancel = () => {
    setCurrentPage('pathologist-dashboard');
    setSelectedLabId('');
    setSelectedDeviceName('');
  };

  const handleSelectLab = (labId: string) => {
    setSelectedLabId(labId);
    toast.success('✅ LabVision desbloqueado com sucesso');
    setCurrentPage('labvision-exams');
  };

  const handleStartMeasurement = (examId: string) => {
    setSelectedExamId(examId);
    setCurrentPage('labvision-measurement');
  };

  const handleBackToLabExams = () => {
    setCurrentPage('labvision-exams');
    setSelectedExamId('');
  };

  const handleMeasurementComplete = () => {
    toast.success('Medição concluída com sucesso!');
    setCurrentPage('exam-details');
  };

  const handleSendResult = () => {
    toast.success('Resultado enviado com sucesso!');
    handleBackToDashboard();
  };

  const handleCreateExam = () => {
    setCurrentPage('create-exam');
  };

  const handleSaveExam = () => {
    toast.success('Exame criado com sucesso!');
    if (userType === 'doctor') {
      setCurrentPage('doctor-dashboard');
    } else {
      setCurrentPage('pathologist-dashboard');
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      

      
      case 'doctor-dashboard':
        return (
          <DoctorDashboard 
            onLogout={handleLogout}
            onViewReport={handleViewReport}
            onCreateExam={handleCreateExam}
          />
        );
      
      case 'pathologist-dashboard':
        return (
          <PathologistDashboard 
            onLogout={handleLogout}
            onViewExamDetails={handleViewExamDetails}
            onSelectLab={handleRequestUnlock}
          />
        );
      
      case 'exam-details':
        return (
          <ExamDetails 
            examId={selectedExamId}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
            onSendResult={handleSendResult}
          />
        );
      
      case 'report-view':
        return (
          <ReportView 
            examId={selectedExamId}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
            userType={userType!}
          />
        );
      
      case 'create-exam':
        return (
          <CreateExam 
            onBack={() => {
              if (userType === 'doctor') {
                setCurrentPage('doctor-dashboard');
              } else {
                setCurrentPage('pathologist-dashboard');
              }
            }}
            onLogout={handleLogout}
            onSaveExam={handleSaveExam}
            userType={userType!}
          />
        );
      
      case 'labvision-exams':
        return (
          <LabVisionExams 
            labId={selectedLabId}
            onLogout={handleLogout}
            onBack={() => setCurrentPage('pathologist-dashboard')}
            onStartMeasurement={handleStartMeasurement}
            onViewExamDetails={handleViewExamDetails}
          />
        );
      
      case 'labvision-measurement':
        return (
          <LabVisionMeasurement 
            examId={selectedExamId}
            onLogout={handleLogout}
            onBack={handleBackToLabExams}
            onComplete={handleMeasurementComplete}
          />
        );
      
      case 'unlock-device':
        return (
          <UnlockDevicePage 
            deviceName={selectedDeviceName}
            onUnlock={handleUnlockSuccess}
            onCancel={handleUnlockCancel}
            onLogout={handleLogout}
          />
        );
      
      default:
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  return (
    <div className="size-full">
      {renderCurrentPage()}
      <Toaster position="top-right" />
    </div>
  );
}