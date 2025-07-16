import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  ChevronRight,
  Target,
  BarChart3,
  FileText,
  X,
  Save,
  Eye,
  TrendingUp
} from 'lucide-react';

const Criteria = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingCriterion, setEditingCriterion] = useState(null);
  const [newCriterion, setNewCriterion] = useState({
    name: '',
    code: '',
    weight: '',
    description: '',
    status: 'active'
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Sample data - in real app, this would come from API
  const mainCriteria = [
    {
      id: 1,
      name: 'القيادة والإدارة',
      code: 'L1',
      weight: 20,
      description: 'معيار يقيس فعالية القيادة في توجيه الجمعية',
      status: 'active',
      progress: 95,
      subCriteria: 4,
      indicators: 12,
      evidence: 25,
    },
    {
      id: 2,
      name: 'الحوكمة والشفافية',
      code: 'G1',
      weight: 18,
      description: 'معيار يقيس مستوى الشفافية والحوكمة',
      status: 'active',
      progress: 87,
      subCriteria: 3,
      indicators: 8,
      evidence: 18,
    },
    {
      id: 3,
      name: 'الموارد البشرية',
      code: 'HR1',
      weight: 15,
      description: 'معيار يقيس إدارة الموارد البشرية والتطوير',
      status: 'active',
      progress: 72,
      subCriteria: 5,
      indicators: 15,
      evidence: 22,
    },
    {
      id: 4,
      name: 'إدارة المعرفة والتعلم',
      code: 'KM1',
      weight: 12,
      description: 'معيار يقيس قدرة الجمعية على إدارة المعرفة',
      status: 'active',
      progress: 68,
      subCriteria: 3,
      indicators: 10,
      evidence: 15,
    },
    {
      id: 5,
      name: 'الشراكات والموارد المالية',
      code: 'P1',
      weight: 15,
      description: 'معيار يقيس إدارة الشراكات والموارد المالية',
      status: 'active',
      progress: 82,
      subCriteria: 4,
      indicators: 11,
      evidence: 20,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const filteredCriteria = mainCriteria.filter(criterion => {
    const matchesSearch = criterion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      criterion.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || criterion.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddCriterion = () => {
    if (!newCriterion.name || !newCriterion.code || !newCriterion.weight) {
      toast({
        title: "خطأ",
        description: "جميع الحقول المطلوبة يجب ملؤها",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "تم بنجاح",
      description: `تم إضافة المعيار "${newCriterion.name}" بنجاح`
    });
    
    setNewCriterion({ name: '', code: '', weight: '', description: '', status: 'active' });
    setShowAddDialog(false);
  };

  const handleEditCriterion = (criterion) => {
    setEditingCriterion(criterion);
  };

  const handleDeleteCriterion = (criterion) => {
    toast({
      title: "تم حذف المعيار",
      description: `تم حذف المعيار "${criterion.name}" بنجاح`,
      variant: "destructive"
    });
  };

  const handleViewAssessment = (criterion) => {
    toast({
      title: "عرض التقييم",
      description: `عرض تقييم المعيار "${criterion.name}"`
    });
    navigate('/evaluations');
  };

  const handleViewEvidence = (criterion) => {
    toast({
      title: "عرض الأدلة",
      description: `عرض أدلة المعيار "${criterion.name}"`
    });
    navigate('/evidence');
  };

  const handleManageSubCriteria = (criterion) => {
    toast({
      title: "إدارة المعايير الفرعية",
      description: `إدارة المعايير الفرعية للمعيار "${criterion.name}"`
    });
  };

  const handleStatClick = (criterion, statType) => {
    const messages = {
      weight: `الوزن النسبي للمعيار "${criterion.name}" هو ${criterion.weight}%`,
      progress: `نسبة إنجاز المعيار "${criterion.name}" هي ${criterion.progress}%`,
      subCriteria: `المعيار "${criterion.name}" يحتوي على ${criterion.subCriteria} معايير فرعية`,
      indicators: `المعيار "${criterion.name}" يحتوي على ${criterion.indicators} مؤشر`,
      evidence: `المعيار "${criterion.name}" يحتوي على ${criterion.evidence} دليل`
    };
    
    toast({
      title: "تفاصيل الإحصائية",
      description: messages[statType]
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">إدارة المعايير</h1>
            <p className="text-muted-foreground mt-2">
              إدارة المعايير الرئيسية والفرعية ومؤشرات الأداء
            </p>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>إضافة معيار جديد</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>إضافة معيار جديد</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">اسم المعيار *</Label>
                  <Input
                    id="name"
                    value={newCriterion.name}
                    onChange={(e) => setNewCriterion({...newCriterion, name: e.target.value})}
                    placeholder="أدخل اسم المعيار"
                  />
                </div>
                <div>
                  <Label htmlFor="code">رمز المعيار *</Label>
                  <Input
                    id="code"
                    value={newCriterion.code}
                    onChange={(e) => setNewCriterion({...newCriterion, code: e.target.value})}
                    placeholder="مثال: L1"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">الوزن النسبي (%) *</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={newCriterion.weight}
                    onChange={(e) => setNewCriterion({...newCriterion, weight: e.target.value})}
                    placeholder="20"
                  />
                </div>
                <div>
                  <Label htmlFor="description">الوصف</Label>
                  <Textarea
                    id="description"
                    value={newCriterion.description}
                    onChange={(e) => setNewCriterion({...newCriterion, description: e.target.value})}
                    placeholder="وصف المعيار"
                  />
                </div>
                <div>
                  <Label htmlFor="status">الحالة</Label>
                  <Select value={newCriterion.status} onValueChange={(val) => setNewCriterion({...newCriterion, status: val})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">نشط</SelectItem>
                      <SelectItem value="inactive">غير نشط</SelectItem>
                      <SelectItem value="draft">مسودة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleAddCriterion}>
                    <Save className="h-4 w-4 mr-2" />
                    حفظ
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="البحث في المعايير..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="تصفية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المعايير</SelectItem>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                  <SelectItem value="draft">مسودة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Criteria List */}
        <div className="grid gap-6">
          {filteredCriteria.map((criterion) => (
            <Card key={criterion.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">{criterion.name}</CardTitle>
                        <Badge variant="outline">{criterion.code}</Badge>
                        <Badge className={getStatusColor(criterion.status)}>
                          {criterion.status === 'active' ? 'نشط' : 'غير نشط'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {criterion.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditCriterion(criterion)}
                      title="تعديل المعيار"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" title="حذف المعيار">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                          <AlertDialogDescription>
                            هل أنت متأكد من حذف المعيار "{criterion.name}"؟ 
                            لا يمكن التراجع عن هذا الإجراء.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>إلغاء</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDeleteCriterion(criterion)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            حذف
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toast({
                        title: "تفاصيل المعيار",
                        description: `عرض تفاصيل المعيار "${criterion.name}"`
                      })}
                      title="عرض التفاصيل"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* Weight */}
                  <div 
                    className="text-center cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                    onClick={() => handleStatClick(criterion, 'weight')}
                    title="انقر لعرض تفاصيل الوزن النسبي"
                  >
                    <div className="text-2xl font-bold text-primary">
                      {criterion.weight}%
                    </div>
                    <div className="text-sm text-muted-foreground">الوزن النسبي</div>
                  </div>
                  
                  {/* Progress */}
                  <div 
                    className="text-center cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                    onClick={() => handleStatClick(criterion, 'progress')}
                    title="انقر لعرض تفاصيل نسبة الإنجاز"
                  >
                    <div className="text-2xl font-bold" style={{ color: getProgressColor(criterion.progress).replace('bg-', '') }}>
                      {criterion.progress}%
                    </div>
                    <div className="text-sm text-muted-foreground">نسبة الإنجاز</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2 cursor-pointer">
                      <div 
                        className={`h-2 rounded-full ${getProgressColor(criterion.progress)} transition-all hover:scale-105`}
                        style={{ width: `${criterion.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Sub Criteria */}
                  <div 
                    className="text-center cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                    onClick={() => handleStatClick(criterion, 'subCriteria')}
                    title="انقر لعرض المعايير الفرعية"
                  >
                    <div className="text-2xl font-bold text-blue-600">
                      {criterion.subCriteria}
                    </div>
                    <div className="text-sm text-muted-foreground">معايير فرعية</div>
                  </div>

                  {/* Indicators */}
                  <div 
                    className="text-center cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                    onClick={() => handleStatClick(criterion, 'indicators')}
                    title="انقر لعرض المؤشرات"
                  >
                    <div className="text-2xl font-bold text-green-600">
                      {criterion.indicators}
                    </div>
                    <div className="text-sm text-muted-foreground">مؤشرات</div>
                  </div>

                  {/* Evidence */}
                  <div 
                    className="text-center cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                    onClick={() => handleStatClick(criterion, 'evidence')}
                    title="انقر لعرض الأدلة"
                  >
                    <div className="text-2xl font-bold text-orange-600">
                      {criterion.evidence}
                    </div>
                    <div className="text-sm text-muted-foreground">أدلة</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center space-x-2"
                    onClick={() => handleViewAssessment(criterion)}
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>عرض التقييم</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center space-x-2"
                    onClick={() => handleViewEvidence(criterion)}
                  >
                    <FileText className="h-4 w-4" />
                    <span>الأدلة</span>
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex items-center space-x-2"
                    onClick={() => handleManageSubCriteria(criterion)}
                  >
                    <Target className="h-4 w-4" />
                    <span>إدارة المعايير الفرعية</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Criteria;