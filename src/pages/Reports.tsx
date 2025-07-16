import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Download, FileText, BarChart3, PieChart, TrendingUp, Calendar, Filter, Search } from 'lucide-react';

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const { toast } = useToast();

  const reports = [
    {
      id: 1,
      title: 'تقرير التقييم الشامل',
      description: 'تقرير شامل لجميع المعايير ونتائج التقييم',
      type: 'تقرير شامل',
      date: '2024-01-22',
      status: 'جاهز',
      size: '2.5 MB',
      format: 'PDF'
    },
    {
      id: 2,
      title: 'تقرير الحوكمة الربعي',
      description: 'تقرير مفصل لمعايير الحوكمة للربع الأخير',
      type: 'تقرير معيار',
      date: '2024-01-20',
      status: 'جاهز',
      size: '1.8 MB',
      format: 'PDF'
    },
    {
      id: 3,
      title: 'تقرير الموارد البشرية',
      description: 'تحليل شامل لمؤشرات الموارد البشرية',
      type: 'تقرير معيار',
      date: '2024-01-18',
      status: 'قيد الإعداد',
      size: '1.2 MB',
      format: 'Excel'
    },
    {
      id: 4,
      title: 'تقرير المقارنة مع الجمعيات',
      description: 'مقارنة الأداء مع الجمعيات الأخرى',
      type: 'تقرير مقارنة',
      date: '2024-01-15',
      status: 'جاهز',
      size: '3.1 MB',
      format: 'PDF'
    }
  ];

  const exportOptions = [
    {
      id: 1,
      title: 'تصدير بيانات المعايير',
      description: 'تصدير جميع بيانات المعايير والمؤشرات',
      icon: BarChart3,
      formats: ['Excel', 'CSV', 'PDF']
    },
    {
      id: 2,
      title: 'تصدير نتائج التقييم',
      description: 'تصدير نتائج التقييم والدرجات',
      icon: PieChart,
      formats: ['Excel', 'PDF']
    },
    {
      id: 3,
      title: 'تصدير الأدلة والمرفقات',
      description: 'تصدير قائمة الأدلة وحالات الاعتماد',
      icon: FileText,
      formats: ['Excel', 'PDF']
    },
    {
      id: 4,
      title: 'تصدير تقرير التقدم',
      description: 'تصدير تقرير التقدم والإنجازات',
      icon: TrendingUp,
      formats: ['PDF', 'PowerPoint']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'جاهز': return 'bg-green-100 text-green-800';
      case 'قيد الإعداد': return 'bg-yellow-100 text-yellow-800';
      case 'مؤجل': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'تقرير شامل': return 'bg-blue-100 text-blue-800';
      case 'تقرير معيار': return 'bg-purple-100 text-purple-800';
      case 'تقرير مقارنة': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateReport = () => {
    toast({
      title: "إنشاء تقرير جديد",
      description: "تم فتح معالج إنشاء التقرير الجديد",
    });
  };

  const handlePreviewReport = (report: any) => {
    toast({
      title: "معاينة التقرير",
      description: `معاينة ${report.title}`,
    });
  };

  const handleDownloadReport = (report: any) => {
    if (report.status !== 'جاهز') {
      toast({
        title: "التقرير غير جاهز",
        description: "لا يمكن تحميل التقرير في الوقت الحالي",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "تحميل التقرير",
      description: `تم بدء تحميل ${report.title}`,
    });
  };

  const handleExportData = (option: any, format: string) => {
    toast({
      title: "تصدير البيانات",
      description: `تصدير ${option.title} بصيغة ${format}`,
    });
  };

  const handleFilter = () => {
    toast({
      title: "تصفية التقارير",
      description: "تم فتح خيارات التصفية المتقدمة",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">التقارير والتصدير</h1>
            <p className="text-gray-600">إنشاء وتصدير التقارير التحليلية للمعايير والتقييمات</p>
          </div>
          <Button onClick={handleCreateReport}>
            <FileText className="w-4 h-4 mr-2" />
            إنشاء تقرير جديد
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="البحث في التقارير..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="اختر الفترة الزمنية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">هذا الأسبوع</SelectItem>
              <SelectItem value="month">هذا الشهر</SelectItem>
              <SelectItem value="quarter">هذا الربع</SelectItem>
              <SelectItem value="year">هذا العام</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleFilter}>
            <Filter className="w-4 h-4 mr-2" />
            فلترة
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="reports" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reports">التقارير</TabsTrigger>
            <TabsTrigger value="export">التصدير</TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="space-y-4">
            <div className="grid gap-4">
              {reports.map((report) => (
                <Card key={report.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          {report.title}
                        </CardTitle>
                        <p className="text-gray-600 text-sm mt-1">{report.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getTypeColor(report.type)}>
                          {report.type}
                        </Badge>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {report.date}
                        </div>
                        <div>الحجم: {report.size}</div>
                        <div>النوع: {report.format}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handlePreviewReport(report)}>
                          معاينة
                        </Button>
                        <Button size="sm" disabled={report.status !== 'جاهز'} onClick={() => handleDownloadReport(report)}>
                          <Download className="w-4 h-4 mr-1" />
                          تحميل
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {exportOptions.map((option) => (
                <Card key={option.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <option.icon className="w-5 h-5" />
                      {option.title}
                    </CardTitle>
                    <p className="text-gray-600 text-sm">{option.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <span className="text-sm text-gray-500 mb-2 block">الصيغ المتاحة:</span>
                        <div className="flex flex-wrap gap-2">
                          {option.formats.map((format) => (
                            <Badge key={format} variant="outline">
                              {format}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الصيغة" />
                          </SelectTrigger>
                          <SelectContent>
                            {option.formats.map((format) => (
                              <SelectItem key={format} value={format.toLowerCase()}>
                                {format}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button onClick={() => handleExportData(option, 'excel')}>
                          <Download className="w-4 h-4 mr-1" />
                          تصدير
                        </Button>
                      </div>
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

export default Reports;