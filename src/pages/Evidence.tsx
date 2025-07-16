import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Search, 
  Filter, 
  FileText, 
  Download, 
  Eye,
  Check,
  X,
  Clock,
  Link,
  Image,
  Video,
  File
} from 'lucide-react';

const Evidence = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');

  // Sample data - in real app, this would come from API
  const evidenceList = [
    {
      id: 1,
      name: 'سياسة الموارد البشرية 2024',
      description: 'الوثيقة الرسمية لسياسة الموارد البشرية',
      type: 'document',
      criterion: 'الموارد البشرية',
      indicator: 'وجود سياسات مكتوبة',
      status: 'approved',
      uploadDate: '2024-12-01',
      uploader: 'أحمد محمد',
      size: '2.5 MB',
      reviewNotes: 'تم الاعتماد بنجاح',
    },
    {
      id: 2,
      name: 'تقرير الحوكمة السنوي',
      description: 'تقرير شامل عن ممارسات الحوكمة',
      type: 'document',
      criterion: 'الحوكمة والشفافية',
      indicator: 'التقارير الدورية',
      status: 'pending',
      uploadDate: '2024-12-10',
      uploader: 'فاطمة أحمد',
      size: '5.8 MB',
      reviewNotes: 'قيد المراجعة',
    },
    {
      id: 3,
      name: 'رابط نظام إدارة المستفيدين',
      description: 'رابط للنظام الإلكتروني لإدارة المستفيدين',
      type: 'link',
      criterion: 'العمليات والخدمات',
      indicator: 'الأنظمة الإلكترونية',
      status: 'approved',
      uploadDate: '2024-11-28',
      uploader: 'محمد علي',
      size: '-',
      reviewNotes: 'الرابط يعمل بشكل صحيح',
    },
    {
      id: 4,
      name: 'صور ورشة القيادة',
      description: 'مجموعة صور من ورشة تدريب القيادة',
      type: 'image',
      criterion: 'القيادة والإدارة',
      indicator: 'البرامج التدريبية',
      status: 'rejected',
      uploadDate: '2024-12-05',
      uploader: 'سارة محمد',
      size: '12.3 MB',
      reviewNotes: 'الصور غير واضحة، يرجى إعادة الرفع',
    },
    {
      id: 5,
      name: 'فيديو تعريفي بالجمعية',
      description: 'فيديو تعريفي رسمي بأنشطة الجمعية',
      type: 'video',
      criterion: 'التواصل والإعلام',
      indicator: 'المواد الإعلامية',
      status: 'approved',
      uploadDate: '2024-11-30',
      uploader: 'عبدالله أحمد',
      size: '45.2 MB',
      reviewNotes: 'فيديو ممتاز ومفيد',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <Check className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'rejected':
        return <X className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'link':
        return <Link className="h-5 w-5 text-green-600" />;
      case 'image':
        return <Image className="h-5 w-5 text-purple-600" />;
      case 'video':
        return <Video className="h-5 w-5 text-red-600" />;
      default:
        return <File className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'معتمد';
      case 'pending':
        return 'قيد المراجعة';
      case 'rejected':
        return 'مرفوض';
      default:
        return 'غير محدد';
    }
  };

  const tabs = [
    { id: 'all', label: 'الكل', count: evidenceList.length },
    { id: 'approved', label: 'معتمد', count: evidenceList.filter(e => e.status === 'approved').length },
    { id: 'pending', label: 'قيد المراجعة', count: evidenceList.filter(e => e.status === 'pending').length },
    { id: 'rejected', label: 'مرفوض', count: evidenceList.filter(e => e.status === 'rejected').length },
  ];

  const filteredEvidence = evidenceList.filter(evidence => {
    const matchesSearch = evidence.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evidence.criterion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedTab === 'all' || evidence.status === selectedTab;
    return matchesSearch && matchesTab;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">الأدلة والمرفقات</h1>
            <p className="text-muted-foreground mt-2">
              إدارة ومراجعة الأدلة الداعمة للمعايير والمؤشرات
            </p>
          </div>
          <Button className="flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>رفع دليل جديد</span>
          </Button>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="البحث في الأدلة..."
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

        {/* Evidence List */}
        <div className="grid gap-4">
          {filteredEvidence.map((evidence) => (
            <Card key={evidence.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      {getTypeIcon(evidence.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">{evidence.name}</h3>
                        <Badge className={getStatusColor(evidence.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(evidence.status)}
                            <span>{getStatusText(evidence.status)}</span>
                          </div>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{evidence.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500">
                        <div>
                          <span className="font-medium">المعيار:</span> {evidence.criterion}
                        </div>
                        <div>
                          <span className="font-medium">المؤشر:</span> {evidence.indicator}
                        </div>
                        <div>
                          <span className="font-medium">تاريخ الرفع:</span> {evidence.uploadDate}
                        </div>
                        <div>
                          <span className="font-medium">رفع بواسطة:</span> {evidence.uploader}
                        </div>
                        <div>
                          <span className="font-medium">الحجم:</span> {evidence.size}
                        </div>
                        <div>
                          <span className="font-medium">ملاحظات المراجعة:</span> {evidence.reviewNotes}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span>معاينة</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>تحميل</span>
                    </Button>
                    {evidence.status === 'pending' && (
                      <>
                        <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Evidence;