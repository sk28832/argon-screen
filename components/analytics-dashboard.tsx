// components/analytics-dashboard.tsx
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  XAxis, 
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import { formatStatus, formatStudyType } from '@/lib/format';
import { ClinicalTrial } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

interface AnalyticsProps {
  trials: ClinicalTrial[];
  isLoading?: boolean;
}

const COLORS = {
  status: [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
  ],
  type: {
    'INTERVENTIONAL': 'hsl(var(--chart-1))',
    'OBSERVATIONAL': 'hsl(var(--chart-2))',
    'EXPANDED_ACCESS': 'hsl(var(--chart-3))',
  }
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid gap-1">
          <div className="font-medium">{label || payload[0].name}</div>
          <div className="text-sm text-muted-foreground">
            Count: {payload[0].value}
            {payload[0].payload.percentage && (
              <span className="ml-1">
                ({payload[0].payload.percentage}%)
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
  return null;
};

function prepareData(data: Record<string, number>, total: number, formatFn?: (key: string) => string) {
  return Object.entries(data)
    .map(([key, value], index) => ({
      name: formatFn ? formatFn(key) : key,
      value,
      percentage: ((value / total) * 100).toFixed(1),
      originalKey: key,
      index
    }))
    .sort((a, b) => b.value - a.value);
}

export function Analytics({ trials, isLoading = false }: AnalyticsProps) {
  const statusData = React.useMemo(() => {
    if (!trials.length) return [];
    
    const counts: Record<string, number> = {};
    trials.forEach(trial => {
      counts[trial.study_status] = (counts[trial.study_status] || 0) + 1;
    });

    return prepareData(counts, trials.length, formatStatus);
  }, [trials]);

  const typeData = React.useMemo(() => {
    if (!trials.length) return [];
    
    const counts: Record<string, number> = {};
    trials.forEach(trial => {
      counts[trial.study_type] = (counts[trial.study_type] || 0) + 1;
    });

    return prepareData(counts, trials.length, formatStudyType);
  }, [trials]);

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-[160px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Trial Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={statusData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                className="[&_.recharts-cartesian-grid-horizontal_line]:stroke-muted [&_.recharts-cartesian-grid-vertical_line]:stroke-muted"
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  vertical={false}
                  className="stroke-muted/20"
                />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  className="text-muted-foreground"
                />
                <YAxis 
                  tickLine={false}
                  axisLine={false}
                  className="text-muted-foreground"
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ fill: 'var(--muted)', opacity: 0.2 }}
                />
                <Bar dataKey="value" activeBar={false}>
                  {statusData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS.status[index % COLORS.status.length]} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Study Type Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={typeData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                className="[&_.recharts-cartesian-grid-horizontal_line]:stroke-muted [&_.recharts-cartesian-grid-vertical_line]:stroke-muted"
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  vertical={false}
                  className="stroke-muted/20"
                />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  className="text-muted-foreground"
                />
                <YAxis 
                  tickLine={false}
                  axisLine={false}
                  className="text-muted-foreground"
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ fill: 'var(--muted)', opacity: 0.2 }}
                />
                <Bar dataKey="value" activeBar={false}>
                  {typeData.map((entry) => (
                    <Cell 
                      key={`cell-${entry.originalKey}`}
                      fill={COLORS.type[entry.originalKey as keyof typeof COLORS.type] || COLORS.status[0]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}