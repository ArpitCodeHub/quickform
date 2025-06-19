
"use client";

import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig
} from "@/components/ui/chart";
import { useAppSettings } from '@/hooks/use-app-settings';

const chartData = [
  { role: "Software Engineer", before: 70000, after: 85000, increase: 15000 },
  { role: "Marketing Manager", before: 60000, after: 75000, increase: 15000 },
  { role: "UX Designer", before: 65000, after: 78000, increase: 13000 },
  { role: "Project Manager", before: 75000, after: 92000, increase: 17000 },
  { role: "Data Analyst", before: 55000, after: 68000, increase: 13000 },
];

const chartConfig = {
  before: {
    label: "Avg. Salary Before",
    color: "hsl(var(--chart-2))", // Using chart-2 for 'before' for distinct visual
  },
  after: {
    label: "Avg. Salary After",
    color: "hsl(var(--chart-1))", // Using chart-1 for 'after' as primary
  },
} satisfies ChartConfig;

export default function SalaryHikeGraph() {
  const { applyGlassmorphism } = useAppSettings();

  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-4">
        <Card className={`shadow-xl transition-all duration-300 ease-in-out ${applyGlassmorphism ? 'glassmorphic-panel' : ''}`}>
          <CardHeader className="items-center pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-primary text-center font-headline">
              Unlock Your Earning Potential
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-muted-foreground text-center max-w-2xl mx-auto">
              See how professionals across various roles have significantly boosted their salaries after crafting their documents with QuickForm.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px] sm:min-h-[400px] w-full">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart 
                  data={chartData} 
                  margin={{ top: 5, right: 20, left: 20, bottom: 50 }}
                  barGap={4}
                  barCategoryGap="20%"
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border)/0.5)" />
                  <XAxis
                    dataKey="role"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    angle={-30}
                    textAnchor="end"
                    height={60} 
                    interval={0}
                    tick={{ fontSize: '10px', fill: 'hsl(var(--muted-foreground))' }}
                    className="text-xs sm:text-sm"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={5}
                    tickFormatter={(value) => `$${value / 1000}k`}
                    tick={{ fontSize: '10px', fill: 'hsl(var(--muted-foreground))' }}
                    className="text-xs sm:text-sm"
                  />
                  <Tooltip
                    cursor={{ fill: 'hsl(var(--accent)/0.1)' }}
                    content={<ChartTooltipContent 
                                formatter={(value, name) => (
                                  <div className="flex flex-col">
                                    <span className="capitalize text-xs">{name === 'before' ? 'Before:' : 'After:'} ${Number(value).toLocaleString()}</span>
                                  </div>
                                )}
                                labelClassName="font-bold text-sm"
                                nameKey="name" 
                            />}
                  />
                  <Legend 
                    content={({ payload }) => (
                        <ul className="flex justify-center gap-4 sm:gap-6 mt-4">
                        {payload?.map((entry, index) => (
                            <li key={`item-${index}`} className="flex items-center text-xs sm:text-sm text-muted-foreground">
                            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full mr-1.5 sm:mr-2" style={{ backgroundColor: entry.color }} />
                            {entry.value}
                            </li>
                        ))}
                        </ul>
                    )}
                  />
                  <Bar dataKey="before" fill="var(--color-before)" radius={[4, 4, 0, 0]} name="Avg. Salary Before" />
                  <Bar dataKey="after" fill="var(--color-after)" radius={[4, 4, 0, 0]} name="Avg. Salary After" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
