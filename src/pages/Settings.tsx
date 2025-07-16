import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Database, 
  Palette, 
  Globe, 
  Save,
  Building,
  Mail,
  Phone,
  Lock,
  Key
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const organizationData = {
    name: 'جمعية أبناء الخيرية',
    description: 'جمعية خيرية تهدف إلى خدمة المجتمع وتحقيق التميز المؤسسي',
    address: 'الرياض، المملكة العربية السعودية',
    phone: '+966112345678',
    email: 'info@abnaacharity.org',
    website: 'www.abnaacharity.org',
    registrationNumber: '1234567890'
  };

  const userRoles = [
    { id: 1, name: 'مدير النظام', permissions: ['إدارة كاملة'], color: 'bg-red-100 text-red-800' },
    { id: 2, name: 'مدير الجودة', permissions: ['إدارة المعايير', 'اعتماد الأدلة'], color: 'bg-blue-100 text-blue-800' },
    { id: 3, name: 'قائد فريق', permissions: ['إدارة الفريق', 'رفع الأدلة'], color: 'bg-green-100 text-green-800' },
    { id: 4, name: 'عضو فريق', permissions: ['رفع الأدلة', 'عرض التقارير'], color: 'bg-yellow-100 text-yellow-800' },
    { id: 5, name: 'مقيم خارجي', permissions: ['تقييم المعايير', 'كتابة التقارير'], color: 'bg-purple-100 text-purple-800' }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">الإعدادات</h1>
            <p className="text-gray-600">إدارة إعدادات النظام والصلاحيات</p>
          </div>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            حفظ التغييرات
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
            <TabsTrigger value="organization">بيانات الجمعية</TabsTrigger>
            <TabsTrigger value="permissions">الصلاحيات</TabsTrigger>
            <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
            <TabsTrigger value="system">النظام</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  معلومات الملف الشخصي
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                      أم
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      تغيير الصورة
                    </Button>
                    <p className="text-sm text-gray-500 mt-1">PNG, JPG حتى 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>الاسم الأول</Label>
                    <Input defaultValue="أحمد" />
                  </div>
                  <div>
                    <Label>الاسم الأخير</Label>
                    <Input defaultValue="محمد" />
                  </div>
                  <div>
                    <Label>البريد الإلكتروني</Label>
                    <Input defaultValue="ahmed@abnaacharity.org" />
                  </div>
                  <div>
                    <Label>رقم الجوال</Label>
                    <Input defaultValue="+966501234567" />
                  </div>
                  <div>
                    <Label>المسمى الوظيفي</Label>
                    <Input defaultValue="مدير الجودة" />
                  </div>
                  <div>
                    <Label>القسم</Label>
                    <Select defaultValue="quality">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quality">الجودة والتميز</SelectItem>
                        <SelectItem value="management">الإدارة</SelectItem>
                        <SelectItem value="hr">الموارد البشرية</SelectItem>
                        <SelectItem value="finance">المالية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>نبذة شخصية</Label>
                  <Textarea 
                    placeholder="اكتب نبذة مختصرة عن نفسك..."
                    defaultValue="مدير الجودة والتميز في الجمعية مع خبرة 5 سنوات في إدارة معايير التميز"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  الأمان
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>كلمة المرور الحالية</Label>
                  <Input type="password" />
                </div>
                <div>
                  <Label>كلمة المرور الجديدة</Label>
                  <Input type="password" />
                </div>
                <div>
                  <Label>تأكيد كلمة المرور</Label>
                  <Input type="password" />
                </div>
                <Button variant="outline">
                  <Key className="w-4 h-4 mr-2" />
                  تغيير كلمة المرور
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="organization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  بيانات الجمعية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>اسم الجمعية</Label>
                    <Input defaultValue={organizationData.name} />
                  </div>
                  <div>
                    <Label>رقم التسجيل</Label>
                    <Input defaultValue={organizationData.registrationNumber} />
                  </div>
                  <div>
                    <Label>البريد الإلكتروني</Label>
                    <Input defaultValue={organizationData.email} />
                  </div>
                  <div>
                    <Label>رقم الهاتف</Label>
                    <Input defaultValue={organizationData.phone} />
                  </div>
                  <div>
                    <Label>الموقع الإلكتروني</Label>
                    <Input defaultValue={organizationData.website} />
                  </div>
                </div>
                
                <div>
                  <Label>الوصف</Label>
                  <Textarea defaultValue={organizationData.description} />
                </div>
                
                <div>
                  <Label>العنوان</Label>
                  <Textarea defaultValue={organizationData.address} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  الأدوار والصلاحيات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userRoles.map((role) => (
                    <div key={role.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge className={role.color}>
                          {role.name}
                        </Badge>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.map((permission, index) => (
                            <Badge key={index} variant="outline">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        تعديل
                      </Button>
                    </div>
                  ))}
                </div>
                <Button className="mt-4">
                  <Shield className="w-4 h-4 mr-2" />
                  إضافة دور جديد
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  إعدادات الإشعارات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>إشعارات البريد الإلكتروني</Label>
                    <p className="text-sm text-gray-500">تلقي إشعارات على البريد الإلكتروني</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>إشعارات المهام</Label>
                    <p className="text-sm text-gray-500">تنبيهات عند اقتراب مواعيد المهام</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>إشعارات التقييم</Label>
                    <p className="text-sm text-gray-500">تنبيهات عند وجود تقييمات جديدة</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>إشعارات الجوائز</Label>
                    <p className="text-sm text-gray-500">تنبيهات تحديثات الجوائز</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="w-5 h-5" />
                  إعدادات النظام
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>اللغة</Label>
                  <Select defaultValue="ar">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>المنطقة الزمنية</Label>
                  <Select defaultValue="riyadh">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="riyadh">الرياض (GMT+3)</SelectItem>
                      <SelectItem value="mecca">مكة المكرمة (GMT+3)</SelectItem>
                      <SelectItem value="jeddah">جدة (GMT+3)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>النسخ الاحتياطي التلقائي</Label>
                    <p className="text-sm text-gray-500">إنشاء نسخة احتياطية يومياً</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>الوضع الليلي</Label>
                    <p className="text-sm text-gray-500">تفعيل الوضع الليلي للواجهة</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  إدارة البيانات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Database className="w-4 h-4 mr-2" />
                    تصدير البيانات
                  </Button>
                  <Button variant="outline">
                    <Database className="w-4 h-4 mr-2" />
                    استيراد البيانات
                  </Button>
                </div>
                
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>تحذير:</strong> عمليات استيراد وتصدير البيانات قد تؤثر على أداء النظام
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;