import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, AlertCircle, CheckCircle, Plus, Search, Filter } from 'lucide-react';

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const tasks = [
    {
      id: 1,
      title: 'رفع أدلة معيار القيادة',
      description: 'مطلوب رفع الأدلة المرتبطة بمعيار القيادة والإدارة',
      priority: 'عالية',
      status: 'معلقة',
      dueDate: '2024-01-25',
      assignedTo: 'أحمد محمد',
      criterion: 'القيادة والإدارة'
    },
    {
      id: 2,
      title: 'مراجعة تقرير الحوكمة',
      description: 'مراجعة واعتماد تقرير الحوكمة للربع الأخير',
      priority: 'متوسطة',
      status: 'قيد التنفيذ',
      dueDate: '2024-01-30',
      assignedTo: 'فاطمة أحمد',
      criterion: 'الحوكمة'
    },
    {
      id: 3,
      title: 'إكمال التقييم الذاتي',
      description: 'إكمال التقييم الذاتي لمعيار الموارد البشرية',
      priority: 'عالية',
      status: 'مكتملة',
      dueDate: '2024-01-20',
      assignedTo: 'محمد علي',
      criterion: 'الموارد البشرية'
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'تحديث',
      title: 'تحديث حالة الجائزة',
      message: 'تم قبول الجمعية للمرحلة الثانية من جائزة التميز',
      time: '2024-01-22 10:30',
      status: 'جديد'
    },
    {
      id: 2,
      type: 'تنبيه',
      title: 'اقتراب موعد التسليم',
      message: 'باقي 3 أيام على موعد تسليم أدلة معيار القيادة',
      time: '2024-01-22 09:15',
      status: 'مقروء'
    },
    {
      id: 3,
      type: 'مهمة',
      title: 'مهمة جديدة',
      message: 'تم تكليفك بمراجعة تقرير الموارد المالية',
      time: '2024-01-21 14:20',
      status: 'جديد'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'عالية': return 'bg-red-100 text-red-800';
      case 'متوسطة': return 'bg-yellow-100 text-yellow-800';
      case 'منخفضة': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مكتملة': return 'bg-green-100 text-green-800';
      case 'قيد التنفيذ': return 'bg-blue-100 text-blue-800';
      case 'معلقة': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'تحديث': return 'bg-blue-100 text-blue-800';
      case 'تنبيه': return 'bg-orange-100 text-orange-800';
      case 'مهمة': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddTask = () => {
    toast({
      title: "إضافة مهمة جديدة",
      description: "تم فتح نموذج إضافة المهمة الجديدة",
    });
  };

  const handleEditTask = (task: any) => {
    toast({
      title: "تعديل المهمة",
      description: `تعديل ${task.title}`,
    });
  };

  const handleCompleteTask = (task: any) => {
    toast({
      title: "إكمال المهمة",
      description: `تم إكمال ${task.title}`,
    });
  };

  const handleFilter = () => {
    toast({
      title: "تصفية المهام",
      description: "تم فتح خيارات التصفية المتقدمة",
    });
  };

  const handleDismissAlert = (alert: any) => {
    toast({
      title: "تجاهل التنبيه",
      description: `تم تجاهل ${alert.title}`,
    });
  };

  const handleViewAlertDetails = (alert: any) => {
    toast({
      title: "تفاصيل التنبيه",
      description: `عرض تفاصيل ${alert.title}`,
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">المهام والتنبيهات</h1>
            <p className="text-gray-600">متابعة المهام والتنبيهات المرتبطة بمعايير التميز</p>
          </div>
          <Button onClick={handleAddTask}>
            <Plus className="w-4 h-4 mr-2" />
            إضافة مهمة جديدة
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="البحث في المهام..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={handleFilter}>
            <Filter className="w-4 h-4 mr-2" />
            فلترة
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tasks">المهام</TabsTrigger>
            <TabsTrigger value="alerts">التنبيهات</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-4">
            <div className="grid gap-4">
              {tasks.map((task) => (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>تاريخ الاستحقاق: {task.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>المكلف: {task.assignedTo}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-gray-500" />
                        <span>المعيار: {task.criterion}</span>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm" onClick={() => handleEditTask(task)}>
                        تعديل
                      </Button>
                      <Button size="sm" onClick={() => handleCompleteTask(task)}>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        إكمال
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <div className="grid gap-4">
              {alerts.map((alert) => (
                <Card key={alert.id} className={`hover:shadow-md transition-shadow ${alert.status === 'جديد' ? 'border-blue-200 bg-blue-50' : ''}`}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={getAlertTypeColor(alert.type)}>
                            {alert.type}
                          </Badge>
                          <span className="text-sm text-gray-500">{alert.time}</span>
                        </div>
                        <CardTitle className="text-lg">{alert.title}</CardTitle>
                        <p className="text-gray-600 text-sm mt-1">{alert.message}</p>
                      </div>
                      {alert.status === 'جديد' && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </CardHeader>
                   <CardContent>
                     <div className="flex justify-end gap-2">
                       <Button variant="outline" size="sm" onClick={() => handleDismissAlert(alert)}>
                         تجاهل
                       </Button>
                       <Button size="sm" onClick={() => handleViewAlertDetails(alert)}>
                         عرض التفاصيل
                       </Button>
                     </div>
                   </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Tasks;