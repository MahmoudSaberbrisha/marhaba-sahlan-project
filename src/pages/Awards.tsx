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
  Award, 
  Search, 
  Filter, 
  Calendar, 
  Trophy,
  Target,
  FileText,
  Users,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Awards = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedAward, setSelectedAward] = useState(null);
  const { toast } = useToast();

  // Sample data - in real app, this would come from API
  const awards = [
    {
      id: 1,
      name: 'جائزة التميز في العمل الخيري',
      category: 'التميز المؤسسي',
      organizer: 'وزارة الموارد البشرية والتنمية الاجتماعية',
      applicationDeadline: '2024-12-31',
      resultDate: '2025-02-15',
      status: 'in-progress',
      progress: 75,
      requiredCriteria: 8,
      completedCriteria: 6,
      totalScore: 85,
      maxScore: 100,
      currentPhase: 'المرحلة الثانية - التقييم الخارجي',
      notes: 'تم قبول الطلب في المرحلة الأولى',
    },
    {
      id: 2,
      name: 'جائزة الملك خالد للجمعيات الخيرية',
      category: 'العمل الخيري',
      organizer: 'مؤسسة الملك خالد الخيرية',
      applicationDeadline: '2025-01-15',
      resultDate: '2025-03-20',
      status: 'not-started',
      progress: 0,
      requiredCriteria: 10,
      completedCriteria: 0,
      totalScore: 0,
      maxScore: 100,
      currentPhase: 'لم يتم البدء',
      notes: 'متاح للتطبيق',
    },
    {
      id: 3,
      name: 'جائزة الشيخ حمدان للأعمال الإنسانية',
      category: 'الأعمال الإنسانية',
      organizer: 'مؤسسة الشيخ حمدان',
      applicationDeadline: '2024-11-30',
      resultDate: '2024-12-20',
      status: 'completed',
      progress: 100,
      requiredCriteria: 6,
      completedCriteria: 6,
      totalScore: 92,
      maxScore: 100,
      currentPhase: 'مكتمل - في انتظار النتائج',
      notes: 'تم تقديم الطلب بنجاح',
    },
    {
      id: 4,
      name: 'جائزة الجودة للجمعيات الخيرية',
      category: 'الجودة والتميز',
      organizer: 'مركز الجودة والتميز',
      applicationDeadline: '2025-02-28',
      resultDate: '2025-04-15',
      status: 'planning',
      progress: 25,
      requiredCriteria: 12,
      completedCriteria: 3,
      totalScore: 30,
      maxScore: 100,
      currentPhase: 'مرحلة التخطيط',
      notes: 'جاري دراسة المتطلبات',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'not-started':
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
        return 'قيد التنفيذ';
      case 'planning':
        return 'في التخطيط';
      case 'not-started':
        return 'لم يبدأ';
      default:
        return 'غير محدد';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'in-progress':
        return <Clock className="h-4 w-4" />;
      case 'planning':
        return <Target className="h-4 w-4" />;
      case 'not-started':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const tabs = [
    { id: 'all', label: 'جميع الجوائز', count: awards.length },
    { id: 'in-progress', label: 'قيد التنفيذ', count: awards.filter(a => a.status === 'in-progress').length },
    { id: 'planning', label: 'في التخطيط', count: awards.filter(a => a.status === 'planning').length },
    { id: 'completed', label: 'مكتملة', count: awards.filter(a => a.status === 'completed').length },
  ];

  const filteredAwards = awards.filter(award => {
    const matchesSearch = award.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         award.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedTab === 'all' || award.status === selectedTab;
    return matchesSearch && matchesTab;
  });

  const totalAwards = awards.length;
  const activeAwards = awards.filter(a => a.status === 'in-progress' || a.status === 'planning').length;
  const completedAwards = awards.filter(a => a.status === 'completed').length;

  const handleApplyNewAward = () => {
    toast({
      title: "التقدم لجائزة جديدة",
      description: "تم فتح نموذج التقدم لجائزة جديدة",
    });
  };

  const handleManageProgress = (award: any) => {
    setSelectedAward(award);
    setShowEditDialog(true);
  };

  const handleViewDocuments = (award: any) => {
    setSelectedAward(award);
    setShowViewDialog(true);
  };

  const handleSchedule = (award: any) => {
    toast({
      title: "الجدولة",
      description: `جدولة مهام ${award.name}`,
    });
  };

  const handleTeam = (award: any) => {
    toast({
      title: "إدارة الفريق",
      description: `إدارة فريق ${award.name}`,
    });
  };

  const handleFilter = () => {
    toast({
      title: "تصفية الجوائز",
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
            <h1 className="text-3xl font-bold">الجوائز</h1>
            <p className="text-muted-foreground mt-2">
              إدارة التقديم على الجوائز ومتابعة حالة المشاركة
            </p>
          </div>
          <Button className="flex items-center space-x-2" onClick={handleApplyNewAward}>
            <Award className="h-4 w-4" />
            <span>التقدم لجائزة جديدة</span>
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleStatClick('إجمالي الجوائز', totalAwards)}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>إجمالي الجوائز</span>
                <Trophy className="h-5 w-5 text-blue-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {totalAwards}
              </div>
              <p className="text-sm text-muted-foreground">
                جوائز مختلفة
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>الجوائز النشطة</span>
                <Clock className="h-5 w-5 text-yellow-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {activeAwards}
              </div>
              <p className="text-sm text-muted-foreground">
                قيد التنفيذ والتخطيط
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>الجوائز المكتملة</span>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {completedAwards}
              </div>
              <p className="text-sm text-muted-foreground">
                تم تقديم الطلبات
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
                  placeholder="البحث في الجوائز..."
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

        {/* Awards List */}
        <div className="grid gap-6">
          {filteredAwards.map((award) => (
            <Card key={award.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-amber-50 rounded-lg">
                      <Trophy className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{award.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {award.organizer}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className={getStatusColor(award.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(award.status)}
                            <span>{getStatusText(award.status)}</span>
                          </div>
                        </Badge>
                        <Badge variant="outline">{award.category}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {award.totalScore}/{award.maxScore}
                    </div>
                    <div className="text-sm text-muted-foreground">النقاط</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">التقدم الكلي</span>
                      <span className="text-sm text-muted-foreground">{award.progress}%</span>
                    </div>
                    <Progress value={award.progress} className="h-2" />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {award.completedCriteria}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        من {award.requiredCriteria} معايير
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">
                        {award.applicationDeadline}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        موعد التقديم
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">
                        {award.resultDate}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        إعلان النتائج
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-700">
                        {award.currentPhase}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        المرحلة الحالية
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {award.notes && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>ملاحظات:</strong> {award.notes}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-end space-x-2 pt-4 border-t">
                    <Button variant="outline" size="sm" className="flex items-center space-x-2" onClick={() => handleSchedule(award)}>
                      <Calendar className="h-4 w-4" />
                      <span>الجدولة</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center space-x-2" onClick={() => handleViewDocuments(award)}>
                      <FileText className="h-4 w-4" />
                      <span>الوثائق</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center space-x-2" onClick={() => handleTeam(award)}>
                      <Users className="h-4 w-4" />
                      <span>الفريق</span>
                    </Button>
                    <Button size="sm" className="flex items-center space-x-2" onClick={() => handleManageProgress(award)}>
                      <Target className="h-4 w-4" />
                      <span>إدارة التقدم</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View Dialog */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>تفاصيل الجائزة</DialogTitle>
            </DialogHeader>
            {selectedAward && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">اسم الجائزة</Label>
                    <p className="text-lg font-semibold">{selectedAward.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">الفئة</Label>
                    <Badge variant="outline">{selectedAward.category}</Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">الحالة</Label>
                    <Badge className={getStatusColor(selectedAward.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(selectedAward.status)}
                        <span>{getStatusText(selectedAward.status)}</span>
                      </div>
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">الجهة المنظمة</Label>
                    <p className="text-base">{selectedAward.organizer}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedAward.progress}%</div>
                    <div className="text-sm text-gray-600">التقدم</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedAward.completedCriteria}</div>
                    <div className="text-sm text-gray-600">معايير مكتملة</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{selectedAward.requiredCriteria}</div>
                    <div className="text-sm text-gray-600">معايير مطلوبة</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{selectedAward.totalScore}</div>
                    <div className="text-sm text-gray-600">النقاط</div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-500">المرحلة الحالية</Label>
                  <p className="text-base mt-1">{selectedAward.currentPhase}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">موعد التقديم</Label>
                    <p className="text-base">{selectedAward.applicationDeadline}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">إعلان النتائج</Label>
                    <p className="text-base">{selectedAward.resultDate}</p>
                  </div>
                </div>

                {selectedAward.notes && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">ملاحظات</Label>
                    <p className="text-base mt-1 p-3 bg-gray-50 rounded-lg">{selectedAward.notes}</p>
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowViewDialog(false)}>
                    إغلاق
                  </Button>
                  <Button onClick={() => {
                    setShowViewDialog(false);
                    handleManageProgress(selectedAward);
                  }}>
                    إدارة التقدم
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
              <DialogTitle>إدارة تقدم الجائزة</DialogTitle>
            </DialogHeader>
            {selectedAward && (
              <div className="space-y-4">
                <div>
                  <Label>اسم الجائزة</Label>
                  <Input value={selectedAward.name} disabled />
                </div>
                <div>
                  <Label>المعايير المكتملة</Label>
                  <Input type="number" defaultValue={selectedAward.completedCriteria} />
                </div>
                <div>
                  <Label>النقاط الحالية</Label>
                  <Input type="number" defaultValue={selectedAward.totalScore} />
                </div>
                <div>
                  <Label>ملاحظات</Label>
                  <Textarea defaultValue={selectedAward.notes} />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={() => {
                    toast({
                      title: "تم الحفظ",
                      description: "تم تحديث تقدم الجائزة بنجاح"
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

export default Awards;