import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import StatsCard from '@/components/Dashboard/StatsCard';
import ProgressChart from '@/components/Dashboard/ProgressChart';
import TasksList from '@/components/Dashboard/TasksList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Target, 
  FileText, 
  BarChart3, 
  Award, 
  TrendingUp, 
  Users,
  CheckCircle,
  AlertTriangle,
  Plus,
  Upload,
  Play,
  Settings
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Sample data - in real app, this would come from API
  const stats = [
    {
      title: 'نسبة التميز الكلية',
      value: '81%',
      subtitle: 'من الهدف المحدد',
      trend: 'up' as const,
      trendValue: '+5%',
      icon: <Target className="h-4 w-4" />,
      color: 'blue' as const,
    },
    {
      title: 'المعايير المكتملة',
      value: '15',
      subtitle: 'من أصل 20 معيار',
      trend: 'up' as const,
      trendValue: '+2',
      icon: <CheckCircle className="h-4 w-4" />,
      color: 'green' as const,
    },
    {
      title: 'الأدلة المعتمدة',
      value: '142',
      subtitle: 'دليل معتمد',
      trend: 'up' as const,
      trendValue: '+12',
      icon: <FileText className="h-4 w-4" />,
      color: 'orange' as const,
    },
    {
      title: 'الجوائز المتقدمة',
      value: '3',
      subtitle: 'جوائز نشطة',
      trend: 'neutral' as const,
      trendValue: '',
      icon: <Award className="h-4 w-4" />,
      color: 'red' as const,
    },
  ];

  const progressData = [
    { name: 'القيادة والإدارة', progress: 95, color: '#3b82f6' },
    { name: 'الحوكمة والشفافية', progress: 87, color: '#10b981' },
    { name: 'الموارد البشرية', progress: 72, color: '#f59e0b' },
    { name: 'إدارة المعرفة', progress: 68, color: '#ef4444' },
    { name: 'الشراكات والموارد', progress: 82, color: '#8b5cf6' },
  ];

  const tasks = [
    {
      id: '1',
      title: 'رفع أدلة معيار القيادة',
      description: 'رفع الأدلة المتبقية لمعيار القيادة والإدارة',
      dueDate: '15 ديسمبر 2024',
      priority: 'high' as const,
      status: 'pending' as const,
    },
    {
      id: '2',
      title: 'مراجعة التقييم الذاتي',
      description: 'مراجعة نتائج التقييم الذاتي للحوكمة',
      dueDate: '20 ديسمبر 2024',
      priority: 'medium' as const,
      status: 'in-progress' as const,
    },
    {
      id: '3',
      title: 'تحديث بيانات الموارد البشرية',
      description: 'تحديث ملفات الموظفين والتدريب',
      dueDate: '25 ديسمبر 2024',
      priority: 'low' as const,
      status: 'pending' as const,
    },
  ];

  // Handler functions for quick actions
  const handleAddCriterion = () => {
    navigate('/criteria');
    toast({
      title: "إضافة معيار جديد",
      description: "سيتم الانتقال إلى صفحة المعايير لإضافة معيار جديد",
    });
  };

  const handleUploadEvidence = () => {
    navigate('/evidence');
    toast({
      title: "رفع دليل",
      description: "سيتم الانتقال إلى صفحة الأدلة لرفع دليل جديد",
    });
  };

  const handleStartEvaluation = () => {
    navigate('/evaluations');
    toast({
      title: "بدء التقييم",
      description: "سيتم الانتقال إلى صفحة التقييمات لبدء تقييم جديد",
    });
  };

  const handleManageTeams = () => {
    navigate('/teams');
    toast({
      title: "إدارة الفرق",
      description: "سيتم الانتقال إلى صفحة إدارة الفرق",
    });
  };

  // Handler for gaps and improvements
  const handleGapClick = (type: 'gap' | 'improvement', title: string) => {
    toast({
      title: type === 'gap' ? "فجوة مُحددة" : "فرصة تحسين مُحددة",
      description: `تم تحديد: ${title}`,
    });
  };

  // Handler for stat card clicks
  const handleStatClick = (statTitle: string) => {
    toast({
      title: "تفاصيل الإحصائية",
      description: `عرض تفاصيل: ${statTitle}`,
    });
  };

  // Handler for progress chart clicks
  const handleProgressClick = (criterionName: string) => {
    toast({
      title: "تفاصيل المعيار",
      description: `عرض تفاصيل معيار: ${criterionName}`,
    });
  };

  // Handler for task clicks
  const handleTaskClick = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      toast({
        title: "تفاصيل المهمة",
        description: `عرض تفاصيل: ${task.title}`,
      });
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">لوحة التحكم الرئيسية</h1>
            <p className="text-muted-foreground mt-2">
              نظرة شاملة على أداء الجمعية في معايير التميز
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard 
              key={index} 
              {...stat} 
              onClick={() => handleStatClick(stat.title)}
            />
          ))}
        </div>

        {/* Charts and Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProgressChart data={progressData} onItemClick={handleProgressClick} />
          
          <Card>
            <CardHeader>
              <CardTitle>الفجوات والتحسينات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div 
                  className="flex items-center justify-between p-3 border rounded-lg bg-destructive/10 cursor-pointer hover:bg-destructive/20 transition-colors"
                  onClick={() => handleGapClick('gap', 'فجوة في الموارد البشرية')}
                >
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <div>
                      <h4 className="font-medium">فجوة في الموارد البشرية</h4>
                      <p className="text-sm text-muted-foreground">
                        نقص في أدلة التدريب والتطوير
                      </p>
                    </div>
                  </div>
                  <span className="text-destructive font-medium">28%</span>
                </div>
                
                <div 
                  className="flex items-center justify-between p-3 border rounded-lg bg-accent/10 cursor-pointer hover:bg-accent/20 transition-colors"
                  onClick={() => handleGapClick('improvement', 'فرصة تحسين')}
                >
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    <div>
                      <h4 className="font-medium">فرصة تحسين</h4>
                      <p className="text-sm text-muted-foreground">
                        تطوير آليات إدارة المعرفة
                      </p>
                    </div>
                  </div>
                  <span className="text-accent font-medium">32%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TasksList tasks={tasks} onTaskClick={handleTaskClick} />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>إجراءات سريعة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  className="w-full flex items-center justify-center space-x-2" 
                  variant="outline"
                  onClick={handleAddCriterion}
                >
                  <Target className="h-4 w-4" />
                  <span>إضافة معيار جديد</span>
                </Button>
                <Button 
                  className="w-full flex items-center justify-center space-x-2" 
                  variant="outline"
                  onClick={handleUploadEvidence}
                >
                  <FileText className="h-4 w-4" />
                  <span>رفع دليل</span>
                </Button>
                <Button 
                  className="w-full flex items-center justify-center space-x-2" 
                  variant="outline"
                  onClick={handleStartEvaluation}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>بدء تقييم</span>
                </Button>
                <Button 
                  className="w-full flex items-center justify-center space-x-2" 
                  variant="outline"
                  onClick={handleManageTeams}
                >
                  <Users className="h-4 w-4" />
                  <span>إدارة الفرق</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
