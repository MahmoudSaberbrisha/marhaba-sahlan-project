import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Plus, Search, Filter, Mail, Phone, Settings, UserPlus } from 'lucide-react';

const Teams = () => {
  const [searchTerm, setSearchTerm] = useState('');

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
            <Button variant="outline">
              <UserPlus className="w-4 h-4 mr-2" />
              إضافة عضو
            </Button>
            <Button>
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
          <Button variant="outline">
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
                          <Button variant="outline" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                          <Button size="sm">
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
                          <Button variant="outline" size="sm">
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
      </div>
    </MainLayout>
  );
};

export default Teams;