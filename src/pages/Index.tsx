import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import StatsCard from '@/components/Dashboard/StatsCard';
import ProgressChart from '@/components/Dashboard/ProgressChart';
import TasksList from '@/components/Dashboard/TasksList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Target, 
  FileText, 
  BarChart3, 
  Award, 
  TrendingUp, 
  Users,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const Index = () => {
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
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Charts and Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProgressChart data={progressData} />
          
          <Card>
            <CardHeader>
              <CardTitle>الفجوات والتحسينات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg bg-red-50">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div>
                      <h4 className="font-medium">فجوة في الموارد البشرية</h4>
                      <p className="text-sm text-muted-foreground">
                        نقص في أدلة التدريب والتطوير
                      </p>
                    </div>
                  </div>
                  <span className="text-red-500 font-medium">28%</span>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg bg-orange-50">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-orange-500" />
                    <div>
                      <h4 className="font-medium">فرصة تحسين</h4>
                      <p className="text-sm text-muted-foreground">
                        تطوير آليات إدارة المعرفة
                      </p>
                    </div>
                  </div>
                  <span className="text-orange-500 font-medium">32%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TasksList tasks={tasks} />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>إجراءات سريعة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <Target className="h-4 w-4" />
                  <span>إضافة معيار جديد</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <FileText className="h-4 w-4" />
                  <span>رفع دليل</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <BarChart3 className="h-4 w-4" />
                  <span>بدء تقييم</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <Users className="h-4 w-4" />
                  <span>إدارة الفرق</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
