import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Users, Plus, Search, Filter, Mail, Phone, Settings, UserPlus } from 'lucide-react';

const Teams = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const { toast } = useToast();

  const teams = [
    {
      id: 1,
      name: 'فريق القيادة والإدارة',
      description: 'فريق مسؤول عن معيار القيادة والرؤية الاستراتيجية',
      criterion: 'القيادة والإدارة',
      leader: 'أحمد محمد',
      members: 5,
      progress: 85,
      status: 'نشط'
    },
    {
      id: 2,
      name: 'فريق الحوكمة',
      description: 'فريق مختص بمعايير الحوكمة والشفافية',
      criterion: 'الحوكمة',
      leader: 'فاطمة أحمد',
      members: 3,
      progress: 70,
      status: 'نشط'
    },
    {
      id: 3,
      name: 'فريق الموارد البشرية',
      description: 'فريق إدارة الموارد البشرية والتطوير',
      criterion: 'الموارد البشرية',
      leader: 'محمد علي',
      members: 4,
      progress: 90,
      status: 'نشط'
    },
    {
      id: 4,
      name: 'فريق التقييم والمراجعة',
      description: 'فريق مسؤول عن تقييم ومراجعة جميع المعايير',
      criterion: 'التقييم',
      leader: 'سارة أحمد',
      members: 6,
      progress: 75,
      status: 'معلق'
    }
  ];

  const members = [
    {
      id: 1,
      name: 'أحمد محمد',
      role: 'قائد فريق القيادة',
      email: 'ahmed@charity.org',
      phone: '+966501234567',
      team: 'فريق القيادة والإدارة',
      status: 'نشط',
      joinDate: '2024-01-01'
    },
    {
      id: 2,
      name: 'فاطمة أحمد',
      role: 'قائد فريق الحوكمة',
      email: 'fatima@charity.org',
      phone: '+966501234568',
      team: 'فريق الحوكمة',
      status: 'نشط',
      joinDate: '2024-01-05'
    },
    {
      id: 3,
      name: 'محمد علي',
      role: 'قائد فريق الموارد البشرية',
      email: 'mohammed@charity.org',
      phone: '+966501234569',
      team: 'فريق الموارد البشرية',
      status: 'نشط',
      joinDate: '2024-01-10'
    },
    {
      id: 4,
      name: 'سارة أحمد',
      role: 'قائد فريق التقييم',
      email: 'sara@charity.org',
      phone: '+966501234570',
      team: 'فريق التقييم والمراجعة',
      status: 'معلق',
      joinDate: '2024-01-15'
    },
    {
      id: 5,
      name: 'عبدالله محمد',
      role: 'عضو فريق القيادة',
      email: 'abdullah@charity.org',
      phone: '+966501234571',
      team: 'فريق القيادة والإدارة',
      status: 'نشط',
      joinDate: '2024-01-08'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط': return 'bg-green-100 text-green-800';
      case 'معلق': return 'bg-yellow-100 text-yellow-800';
      case 'غير نشط': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInitials = (name: string) => {
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
  };

  const handleCreateTeam = () => {
    toast({
      title: "إنشاء فريق جديد",
      description: "تم فتح نموذج إنشاء الفريق الجديد",
    });
  };

  const handleAddMember = () => {
    toast({
      title: "إضافة عضو جديد",
      description: "تم فتح نموذج إضافة عضو للفرق",
    });
  };

  const handleViewTeamDetails = (team: any) => {
    setSelectedTeam(team);
    setShowViewDialog(true);
  };

  const handleTeamSettings = (team: any) => {
    setSelectedTeam(team);
    setShowEditDialog(true);
  };

  const handleMemberSettings = (member: any) => {
    setSelectedMember(member);
    setShowEditDialog(true);
  };

  const handleFilter = () => {
    toast({
      title: "تصفية الفرق",
      description: "تم فتح خيارات التصفية المتقدمة",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">فرق العمل</h1>
            <p className="text-gray-600">إدارة فرق العمل والمسؤوليات حسب المعايير</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleAddMember}>
              <UserPlus className="w-4 h-4 mr-2" />
              إضافة عضو
            </Button>
            <Button onClick={handleCreateTeam}>
              <Plus className="w-4 h-4 mr-2" />
              إنشاء فريق جديد
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="البحث في الفرق والأعضاء..."
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
        <Tabs defaultValue="teams" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="teams">الفرق</TabsTrigger>
            <TabsTrigger value="members">الأعضاء</TabsTrigger>
          </TabsList>

          <TabsContent value="teams" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teams.map((team) => (
                <Card key={team.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          {team.name}
                        </CardTitle>
                        <p className="text-gray-600 text-sm mt-1">{team.description}</p>
                      </div>
                      <Badge className={getStatusColor(team.status)}>
                        {team.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">قائد الفريق:</span>
                          <p className="font-medium">{team.leader}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">عدد الأعضاء:</span>
                          <p className="font-medium">{team.members}</p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-500">التقدم</span>
                          <span className="text-sm font-medium">{team.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${team.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{team.criterion}</Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleTeamSettings(team)}>
                            <Settings className="w-4 h-4" />
                          </Button>
                          <Button size="sm" onClick={() => handleViewTeamDetails(team)}>
                            عرض التفاصيل
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="members" className="space-y-4">
            <div className="grid gap-4">
              {members.map((member) => (
                <Card key={member.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-gray-600">{member.role}</p>
                          <Badge variant="outline" className="mt-1">
                            {member.team}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-500 text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Mail className="w-4 h-4" />
                            {member.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {member.phone}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(member.status)}>
                            {member.status}
                          </Badge>
                          <Button variant="outline" size="sm" onClick={() => handleMemberSettings(member)}>
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* View Dialog */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>تفاصيل الفريق</DialogTitle>
            </DialogHeader>
            {selectedTeam && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">اسم الفريق</Label>
                    <p className="text-lg font-semibold">{selectedTeam.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">الحالة</Label>
                    <Badge className={getStatusColor(selectedTeam.status)}>
                      {selectedTeam.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">قائد الفريق</Label>
                    <p className="text-base">{selectedTeam.leader}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">عدد الأعضاء</Label>
                    <p className="text-base">{selectedTeam.members}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-500">الوصف</Label>
                  <p className="text-base mt-1">{selectedTeam.description}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-500">المعيار المسؤول عنه</Label>
                  <Badge variant="outline">{selectedTeam.criterion}</Badge>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-500">التقدم</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${selectedTeam.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{selectedTeam.progress}%</span>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowViewDialog(false)}>
                    إغلاق
                  </Button>
                  <Button onClick={() => {
                    setShowViewDialog(false);
                    handleTeamSettings(selectedTeam);
                  }}>
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
              <DialogTitle>
                {selectedTeam ? 'تعديل الفريق' : 'تعديل العضو'}
              </DialogTitle>
            </DialogHeader>
            {selectedTeam && (
              <div className="space-y-4">
                <div>
                  <Label>اسم الفريق</Label>
                  <Input defaultValue={selectedTeam.name} />
                </div>
                <div>
                  <Label>الوصف</Label>
                  <Textarea defaultValue={selectedTeam.description} />
                </div>
                <div>
                  <Label>قائد الفريق</Label>
                  <Input defaultValue={selectedTeam.leader} />
                </div>
                <div>
                  <Label>الحالة</Label>
                  <Select defaultValue={selectedTeam.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="نشط">نشط</SelectItem>
                      <SelectItem value="معلق">معلق</SelectItem>
                      <SelectItem value="غير نشط">غير نشط</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={() => {
                    toast({
                      title: "تم الحفظ",
                      description: "تم تحديث الفريق بنجاح"
                    });
                    setShowEditDialog(false);
                    setSelectedTeam(null);
                  }}>
                    حفظ التغييرات
                  </Button>
                </div>
              </div>
            )}
            {selectedMember && (
              <div className="space-y-4">
                <div>
                  <Label>اسم العضو</Label>
                  <Input defaultValue={selectedMember.name} />
                </div>
                <div>
                  <Label>الدور</Label>
                  <Input defaultValue={selectedMember.role} />
                </div>
                <div>
                  <Label>البريد الإلكتروني</Label>
                  <Input type="email" defaultValue={selectedMember.email} />
                </div>
                <div>
                  <Label>الهاتف</Label>
                  <Input defaultValue={selectedMember.phone} />
                </div>
                <div>
                  <Label>الحالة</Label>
                  <Select defaultValue={selectedMember.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="نشط">نشط</SelectItem>
                      <SelectItem value="معلق">معلق</SelectItem>
                      <SelectItem value="غير نشط">غير نشط</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={() => {
                    toast({
                      title: "تم الحفظ",
                      description: "تم تحديث العضو بنجاح"
                    });
                    setShowEditDialog(false);
                    setSelectedMember(null);
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

export default Teams;