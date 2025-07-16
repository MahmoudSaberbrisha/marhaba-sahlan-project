import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  ChevronRight,
  Target,
  BarChart3,
  FileText
} from 'lucide-react';

const Criteria = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
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

  const filteredCriteria = mainCriteria.filter(criterion =>
    criterion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    criterion.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>إضافة معيار جديد</span>
          </Button>
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
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>تصفية</span>
              </Button>
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
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* Weight */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {criterion.weight}%
                    </div>
                    <div className="text-sm text-muted-foreground">الوزن النسبي</div>
                  </div>
                  
                  {/* Progress */}
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: getProgressColor(criterion.progress).replace('bg-', '') }}>
                      {criterion.progress}%
                    </div>
                    <div className="text-sm text-muted-foreground">نسبة الإنجاز</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className={`h-2 rounded-full ${getProgressColor(criterion.progress)}`}
                        style={{ width: `${criterion.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Sub Criteria */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {criterion.subCriteria}
                    </div>
                    <div className="text-sm text-muted-foreground">معايير فرعية</div>
                  </div>

                  {/* Indicators */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {criterion.indicators}
                    </div>
                    <div className="text-sm text-muted-foreground">مؤشرات</div>
                  </div>

                  {/* Evidence */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {criterion.evidence}
                    </div>
                    <div className="text-sm text-muted-foreground">أدلة</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>عرض التقييم</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>الأدلة</span>
                  </Button>
                  <Button size="sm" className="flex items-center space-x-2">
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