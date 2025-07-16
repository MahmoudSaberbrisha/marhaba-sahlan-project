import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface CriterionProgress {
  name: string;
  progress: number;
  color: string;
}

interface ProgressChartProps {
  data: CriterionProgress[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>التقدم حسب المعايير</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{item.name}</span>
                <span className="text-muted-foreground">{item.progress}%</span>
              </div>
              <Progress value={item.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressChart;