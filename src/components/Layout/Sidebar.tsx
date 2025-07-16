import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Target,
  FileText,
  BarChart3,
  Award,
  Calendar,
  Users,
  FileSpreadsheet,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    icon: Home,
    label: 'الرئيسية',
    href: '/',
  },
  {
    icon: Target,
    label: 'إدارة المعايير',
    href: '/criteria',
  },
  {
    icon: FileText,
    label: 'الأدلة والمرفقات',
    href: '/evidence',
  },
  {
    icon: BarChart3,
    label: 'التقييمات',
    href: '/evaluations',
  },
  {
    icon: Award,
    label: 'الجوائز',
    href: '/awards',
  },
  {
    icon: Calendar,
    label: 'المهام والتنبيهات',
    href: '/tasks',
  },
  {
    icon: Users,
    label: 'فرق العمل',
    href: '/teams',
  },
  {
    icon: FileSpreadsheet,
    label: 'التقارير والتصدير',
    href: '/reports',
  },
  {
    icon: Settings,
    label: 'الإعدادات',
    href: '/settings',
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Award className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold">منصة التميز</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;