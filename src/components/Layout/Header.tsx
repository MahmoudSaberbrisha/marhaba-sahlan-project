import React from 'react';
import { Bell, Search, Settings, User, Users, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "تم تسجيل الخروج",
      description: "شكراً لاستخدام منصة التميز",
    });
  };

  return (
    <header className="bg-primary border-b border-primary px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="bg-secondary rounded-lg p-2 flex items-center justify-center">
            <Users className="h-6 w-6 text-secondary-foreground" />
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-primary-foreground">
              منصة التميز للعمل الخيري
            </div>
            <div className="text-sm text-primary-foreground/80">
              {user?.organization || 'جمعية أبناء'}
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="البحث في المعايير والأدلة..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-primary-foreground hover:bg-primary/80">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-secondary text-secondary-foreground">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-3 border-b">
                <h3 className="font-semibold">الإشعارات</h3>
              </div>
              <DropdownMenuItem className="p-3">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium">مهمة عاجلة</span>
                  <span className="text-xs text-gray-500">رفع دليل قبل 15 ديسمبر</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium">تحديث الجائزة</span>
                  <span className="text-xs text-gray-500">انتقال للمرحلة الثانية</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
            <Settings className="h-5 w-5" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 text-primary-foreground hover:bg-primary/80">
                <User className="h-5 w-5" />
                <span>{user?.name || 'المستخدم'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span className="font-medium">{user?.name}</span>
                  <span className="text-xs text-gray-500">{user?.email}</span>
                  <span className="text-xs text-gray-500">{user?.role}</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>الملف الشخصي</DropdownMenuItem>
              <DropdownMenuItem>الإعدادات</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                تسجيل الخروج
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;