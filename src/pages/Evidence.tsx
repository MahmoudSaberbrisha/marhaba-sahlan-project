import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  Link as LinkIcon,
  Image,
  Video,
  File,
  Plus
} from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { apiService } from '../services/api';

interface Evidence {
  id: number;
  name: string;
  description: string;
  type: string;
  filePath?: string;
  fileUrl?: string;
  status: string;
  uploadDate: string;
  uploadedBy: number;
  indicatorId: number;
  reviewNotes?: string;
  User?: {
    name: string;
  };
  Indicator?: {
    name: string;
  };
}

const Evidence = () => {
  const [evidences, setEvidences] = useState<Evidence[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'document',
    fileUrl: '',
    indicatorId: ''
  });

  useEffect(() => {
    fetchEvidences();
  }, [selectedTab]);

  const fetchEvidences = async () => {
    try {
      setLoading(true);
      const params = selectedTab !== 'all' ? { status: selectedTab } : {};
      const data = await apiService.getEvidence(params);
      setEvidences(data);
    } catch (error: any) {
      toast({
        title: "خطأ في تحميل الأدلة",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile && !formData.fileUrl) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار ملف أو إدخال رابط",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploading(true);
      const uploadData = new FormData();
      uploadData.append('name', formData.name);
      uploadData.append('description', formData.description);
      uploadData.append('type', formData.type);
      uploadData.append('indicatorId', formData.indicatorId);
      
      if (selectedFile) {
        uploadData.append('file', selectedFile);
      }
      
      if (formData.fileUrl) {
        uploadData.append('fileUrl', formData.fileUrl);
      }

      await apiService.uploadEvidence(uploadData);
      
      toast({
        title: "تم رفع الدليل بنجاح",
        description: "تم رفع الدليل وإرساله للمراجعة",
      });

      setIsDialogOpen(false);
      setFormData({
        name: '',
        description: '',
        type: 'document',
        fileUrl: '',
        indicatorId: ''
      });
      setSelectedFile(null);
      fetchEvidences();
    } catch (error: any) {
      toast({
        title: "خطأ في رفع الدليل",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleReview = async (id: number, status: string) => {
    try {
      await apiService.reviewEvidence(id, status, '');
      toast({
        title: "تم تحديث حالة الدليل",
        description: `تم ${status === 'approved' ? 'اعتماد' : 'رفض'} الدليل`,
      });
      fetchEvidences();
    } catch (error: any) {
      toast({
        title: "خطأ في المراجعة",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handlePreview = (evidence: Evidence) => {
    setSelectedEvidence(evidence);
    setShowViewDialog(true);
  };

  const handleDownload = (evidence: Evidence) => {
    toast({
      title: "تحميل الدليل",
      description: `تم بدء تحميل ${evidence.name}`,
    });
  };

  const handleFilter = () => {
    toast({
      title: "تصفية الأدلة",
      description: "تم فتح خيارات التصفية المتقدمة",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <Check className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'rejected': return <X className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="h-5 w-5 text-blue-600" />;
      case 'link': return <LinkIcon className="h-5 w-5 text-green-600" />;
      case 'image': return <Image className="h-5 w-5 text-purple-600" />;
      case 'video': return <Video className="h-5 w-5 text-red-600" />;
      default: return <File className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'معتمد';
      case 'pending': return 'قيد المراجعة';
      case 'rejected': return 'مرفوض';
      default: return 'غير محدد';
    }
  };

  const tabs = [
    { id: 'all', label: 'الكل', count: evidences.length },
    { id: 'approved', label: 'معتمد', count: evidences.filter(e => e.status === 'approved').length },
    { id: 'pending', label: 'قيد المراجعة', count: evidences.filter(e => e.status === 'pending').length },
    { id: 'rejected', label: 'مرفوض', count: evidences.filter(e => e.status === 'rejected').length },
  ];

  const filteredEvidence = evidences.filter(evidence => {
    const matchesSearch = evidence.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evidence.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedTab === 'all' || evidence.status === selectedTab;
    return matchesSearch && matchesTab;
  });

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }

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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>رفع دليل جديد</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>رفع دليل جديد</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleFileUpload} className="space-y-4">
                <div>
                  <Label htmlFor="name">اسم الدليل</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">الوصف</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="type">نوع الدليل</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="document">مستند</SelectItem>
                      <SelectItem value="link">رابط</SelectItem>
                      <SelectItem value="image">صورة</SelectItem>
                      <SelectItem value="video">فيديو</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.type === 'document' && (
                  <div>
                    <Label htmlFor="file">اختر الملف</Label>
                    <Input
                      id="file"
                      type="file"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    />
                  </div>
                )}

                {formData.type === 'link' && (
                  <div>
                    <Label htmlFor="fileUrl">الرابط</Label>
                    <Input
                      id="fileUrl"
                      type="url"
                      value={formData.fileUrl}
                      onChange={(e) => setFormData({...formData, fileUrl: e.target.value})}
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="indicatorId">رقم المؤشر</Label>
                  <Input
                    id="indicatorId"
                    type="number"
                    value={formData.indicatorId}
                    onChange={(e) => setFormData({...formData, indicatorId: e.target.value})}
                    required
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    إلغاء
                  </Button>
                  <Button type="submit" disabled={uploading}>
                    {uploading ? 'جاري الرفع...' : 'رفع الدليل'}
                  </Button>
                </div>
              </form>
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
                  placeholder="البحث في الأدلة..."
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
                          <span className="font-medium">المؤشر:</span> {evidence.Indicator?.name || `مؤشر ${evidence.indicatorId}`}
                        </div>
                        <div>
                          <span className="font-medium">تاريخ الرفع:</span> {new Date(evidence.uploadDate).toLocaleDateString('ar-SA')}
                        </div>
                        <div>
                          <span className="font-medium">رفع بواسطة:</span> {evidence.User?.name || 'غير محدد'}
                        </div>
                        {evidence.reviewNotes && (
                          <div className="col-span-2">
                            <span className="font-medium">ملاحظات المراجعة:</span> {evidence.reviewNotes}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2" onClick={() => handlePreview(evidence)}>
                      <Eye className="h-4 w-4" />
                      <span>معاينة</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2" onClick={() => handleDownload(evidence)}>
                      <Download className="h-4 w-4" />
                      <span>تحميل</span>
                    </Button>
                    {evidence.status === 'pending' && (
                      <>
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleReview(evidence.id, 'approved')}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleReview(evidence.id, 'rejected')}
                        >
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

        {/* View Dialog */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>تفاصيل الدليل</DialogTitle>
            </DialogHeader>
            {selectedEvidence && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">اسم الدليل</Label>
                    <p className="text-lg font-semibold">{selectedEvidence.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">نوع الدليل</Label>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(selectedEvidence.type)}
                      <span className="text-base">{selectedEvidence.type}</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">الحالة</Label>
                    <Badge className={getStatusColor(selectedEvidence.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(selectedEvidence.status)}
                        <span>{getStatusText(selectedEvidence.status)}</span>
                      </div>
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">تاريخ الرفع</Label>
                    <p className="text-base">{new Date(selectedEvidence.uploadDate).toLocaleDateString('ar-SA')}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-500">الوصف</Label>
                  <p className="text-base mt-1">{selectedEvidence.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">المؤشر</Label>
                    <p className="text-base">{selectedEvidence.Indicator?.name || `مؤشر ${selectedEvidence.indicatorId}`}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">رفع بواسطة</Label>
                    <p className="text-base">{selectedEvidence.User?.name || 'غير محدد'}</p>
                  </div>
                </div>

                {selectedEvidence.reviewNotes && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">ملاحظات المراجعة</Label>
                    <p className="text-base mt-1 p-3 bg-gray-50 rounded-lg">{selectedEvidence.reviewNotes}</p>
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowViewDialog(false)}>
                    إغلاق
                  </Button>
                  <Button onClick={() => handleDownload(selectedEvidence)}>
                    <Download className="h-4 w-4 mr-2" />
                    تحميل
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

export default Evidence;