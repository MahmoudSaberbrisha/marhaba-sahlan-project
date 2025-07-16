import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  BarChart3, 
  Search, 
  Filter, 
  Edit, 
  Eye,
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  User,
  FileText
} from 'lucide-react';

const Evaluations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const { toast } = useToast();

  // Sample data - in real app, this would come from API
  const evaluations = [
    {
      id: 1,
      criterion: 'القيادة والإدارة',
      targetValue: 90,
      actualValue: 95,
      percentage: 95,
      trend: 'up',
      trendValue: '+5%',
      evaluationType: 'self',
      evaluator: 'فريق الجودة الداخلي',
      lastUpdated: '2024-12-10',
      status: 'completed',
      notes: 'أداء ممتاز في جميع المؤشرات',
    },
    {
      id: 2,
      criterion: 'الحوكمة والشفافية',
      targetValue: 85,
      actualValue: 74,
      percentage: 87,
      trend: 'up',
      trendValue: '+3%',
      evaluationType: 'external',
      evaluator: 'المقيم الخارجي - د. محمد أحمد',
      lastUpdated: '2024-12-08',
      status: 'completed',
      notes: 'تحسن ملحوظ في الشفافية',
    },
    {
      id: 3,
      criterion: 'الموارد البشرية',
      targetValue: 80,
      actualValue: 58,
      percentage: 72,
      trend: 'down',
      trendValue: '-8%',
      evaluationType: 'self',
      evaluator: 'فريق الموارد البشرية',
      lastUpdated: '2024-12-05',
      status: 'in-progress',
      notes: 'بحاجة لتحسين في التدريب والتطوير',
    },
    {
      id: 4,
      criterion: 'إدارة المعرفة',
      targetValue: 75,
      actualValue: 51,
      percentage: 68,
      trend: 'up',
      trendValue: '+12%',
      evaluationType: 'external',
      evaluator: 'لجنة التقييم الخارجية',
      lastUpdated: '2024-12-03',
      status: 'completed',
      notes: 'تحسن كبير في إدارة المعرفة',
    },
    {
      id: 5,
      criterion: 'الشراكات والموارد',
      targetValue: 85,
      actualValue: 70,
      percentage: 82,
      trend: 'up',
      trendValue: '+7%',
      evaluationType: 'self',
      evaluator: 'فريق الشراكات',
      lastUpdated: '2024-12-01',
      status: 'completed',
      notes: 'نجاح في توسيع الشراكات',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'مكتمل';
      case 'in-progress':
        return 'قيد الإنجاز';
      case 'pending':
        return 'في الانتظار';
      default:
        return 'غير محدد';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  const getEvaluationTypeText = (type: string) => {
    return type === 'self' ? 'تقييم ذاتي' : 'تقييم خارجي';
  };

  const tabs = [
    { id: 'all', label: 'جميع التقييمات', count: evaluations.length },
    { id: 'self', label: 'تقييم ذاتي', count: evaluations.filter(e => e.evaluationType === 'self').length },
    { id: 'external', label: 'تقييم خارجي', count: evaluations.filter(e => e.evaluationType === 'external').length },
  ];

  const filteredEvaluations = evaluations.filter(evaluation => {
    const matchesSearch = evaluation.criterion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evaluation.evaluator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedTab === 'all' || evaluation.evaluationType === selectedTab;
    return matchesSearch && matchesTab;
  });

  const averagePerformance = Math.round(
    evaluations.reduce((sum, evaluation) => sum + evaluation.percentage, 0) / evaluations.length
  );

  const completedEvaluations = evaluations.filter(e => e.status === 'completed').length;

  const handleCreateEvaluation = () => {
    toast({
      title: "إنشاء تقييم جديد",
      description: "تم فتح نموذج إنشاء التقييم الجديد",
    });
  };

  const handleViewEvaluation = (evaluation: any) => {
    setSelectedEvaluation(evaluation);
    setShowViewDialog(true);
  };

  const handleEditEvaluation = (evaluation: any) => {
    setSelectedEvaluation(evaluation);
    setShowEditDialog(true);
  };

  const handleFilter = () => {
    toast({
      title: "تصفية التقييمات",
      description: "تم فتح خيارات التصفية المتقدمة",
    });
  };

  const handleStatClick = (statType: string, value: number) => {
    toast({
      title: `إحصائية ${statType}`,
      description: `القيمة: ${value} - انقر لعرض التفاصيل`,
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">التقييمات</h1>
            <p className="text-muted-foreground mt-2">
              نتائج التقييم الذاتي والخارجي والتقارير التحليلية
            </p>
          </div>
          <Button className="flex items-center space-x-2" onClick={handleCreateEvaluation}>
            <BarChart3 className="h-4 w-4" />
            <span>إنشاء تقييم جديد</span>
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleStatClick('متوسط الأداء', averagePerformance)}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>متوسط الأداء</span>
                <Target className="h-5 w-5 text-blue-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {averagePerformance}%
              </div>
              <Progress value={averagePerformance} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                من جميع المعايير
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleStatClick('التقييمات المكتملة', completedEvaluations)}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>التقييمات المكتملة</span>
                <FileText className="h-5 w-5 text-green-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {completedEvaluations}
              </div>
              <p className="text-sm text-muted-foreground">
                من أصل {evaluations.length} تقييم
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>آخر تحديث</span>
                <Calendar className="h-5 w-5 text-purple-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-purple-600 mb-2">
                10 ديسمبر 2024
              </div>
              <p className="text-sm text-muted-foreground">
                القيادة والإدارة
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="البحث في التقييمات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center space-x-2" onClick={handleFilter}>
                <Filter className="h-4 w-4" />
                <span>تصفية</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === tab.id
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Evaluations List */}
        <div className="grid gap-4">
          {filteredEvaluations.map((evaluation) => (
            <Card key={evaluation.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{evaluation.criterion}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getStatusColor(evaluation.status)}>
                          {getStatusText(evaluation.status)}
                        </Badge>
                        <Badge variant="outline">
                          {getEvaluationTypeText(evaluation.evaluationType)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleViewEvaluation(evaluation)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEditEvaluation(evaluation)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {evaluation.percentage}%
                    </div>
                    <div className="text-sm text-muted-foreground">النسبة المحققة</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {evaluation.actualValue}
                    </div>
                    <div className="text-sm text-muted-foreground">القيمة الفعلية</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">
                      {evaluation.targetValue}
                    </div>
                    <div className="text-sm text-muted-foreground">القيمة المستهدفة</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2">
                      {getTrendIcon(evaluation.trend)}
                      <span className={`text-lg font-bold ${
                        evaluation.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {evaluation.trendValue}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">الاتجاه</div>
                  </div>
                </div>

                <div className="mb-4">
                  <Progress value={evaluation.percentage} className="h-3" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span><strong>المقيم:</strong> {evaluation.evaluator}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span><strong>آخر تحديث:</strong> {evaluation.lastUpdated}</span>
                  </div>
                </div>

                {evaluation.notes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>ملاحظات:</strong> {evaluation.notes}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View Dialog */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>تفاصيل التقييم</DialogTitle>
            </DialogHeader>
            {selectedEvaluation && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">المعيار</Label>
                    <p className="text-lg font-semibold">{selectedEvaluation.criterion}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">نوع التقييم</Label>
                    <Badge variant="outline">
                      {getEvaluationTypeText(selectedEvaluation.evaluationType)}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">الحالة</Label>
                    <Badge className={getStatusColor(selectedEvaluation.status)}>
                      {getStatusText(selectedEvaluation.status)}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">المقيم</Label>
                    <p className="text-base">{selectedEvaluation.evaluator}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedEvaluation.percentage}%</div>
                    <div className="text-sm text-gray-600">النسبة المحققة</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedEvaluation.actualValue}</div>
                    <div className="text-sm text-gray-600">القيمة الفعلية</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-600">{selectedEvaluation.targetValue}</div>
                    <div className="text-sm text-gray-600">القيمة المستهدفة</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center justify-center space-x-2">
                      {getTrendIcon(selectedEvaluation.trend)}
                      <span className={`text-lg font-bold ${
                        selectedEvaluation.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {selectedEvaluation.trendValue}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">الاتجاه</div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-500">شريط التقدم</Label>
                  <Progress value={selectedEvaluation.percentage} className="h-3 mt-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">آخر تحديث</Label>
                    <p className="text-base">{selectedEvaluation.lastUpdated}</p>
                  </div>
                </div>

                {selectedEvaluation.notes && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">ملاحظات</Label>
                    <p className="text-base mt-1 p-3 bg-gray-50 rounded-lg">{selectedEvaluation.notes}</p>
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowViewDialog(false)}>
                    إغلاق
                  </Button>
                  <Button onClick={() => {
                    setShowViewDialog(false);
                    handleEditEvaluation(selectedEvaluation);
                  }}>
                    <Edit className="h-4 w-4 mr-2" />
                    تعديل
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>تعديل التقييم</DialogTitle>
            </DialogHeader>
            {selectedEvaluation && (
              <div className="space-y-4">
                <div>
                  <Label>المعيار</Label>
                  <Input value={selectedEvaluation.criterion} disabled />
                </div>
                <div>
                  <Label>القيمة الفعلية</Label>
                  <Input type="number" defaultValue={selectedEvaluation.actualValue} />
                </div>
                <div>
                  <Label>القيمة المستهدفة</Label>
                  <Input type="number" defaultValue={selectedEvaluation.targetValue} />
                </div>
                <div>
                  <Label>ملاحظات</Label>
                  <Textarea defaultValue={selectedEvaluation.notes} />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={() => {
                    toast({
                      title: "تم الحفظ",
                      description: "تم تحديث التقييم بنجاح"
                    });
                    setShowEditDialog(false);
                  }}>
                    حفظ التغييرات
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default Evaluations;