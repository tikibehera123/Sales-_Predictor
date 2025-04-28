
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataPoint } from '@/utils/regressionUtils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ScatterChart, Scatter, ResponsiveContainer, TooltipProps } from 'recharts';
import { LineChartIcon } from 'lucide-react';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface DataVisualizerProps {
  data: DataPoint[];
  modelResults?: {
    predictions: DataPoint[];
    slope: number;
    intercept: number;
  };
  testData?: DataPoint[];
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 border rounded shadow-md">
        <p className="text-sm">Advertising: ${data.x.toFixed(2)}</p>
        <p className="text-sm">Sales: ${data.y.toFixed(2)}</p>
      </div>
    );
  }

  return null;
};

const DataVisualizer: React.FC<DataVisualizerProps> = ({ data, modelResults, testData }) => {
  if (!data.length) {
    return (
      <Card className="h-full card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChartIcon className="h-5 w-5 text-blue-500" />
            Data Visualization
          </CardTitle>
          <CardDescription>
            Advertising vs Sales data visualization
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-gray-500">Generate data to see visualization</p>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map(point => ({ 
    x: point.x, 
    y: point.y,
    type: "Training Data"
  }));

  if (testData) {
    testData.forEach(point => {
      chartData.push({
        x: point.x,
        y: point.y,
        type: "Test Data"
      });
    });
  }

  // Create line data if model results are available
  const lineData = modelResults?.predictions?.map(pred => ({
    x: pred.x,
    yPred: pred.y
  })).sort((a, b) => a.x - b.x);

  return (
    <Card className="h-full card-hover">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineChartIcon className="h-5 w-5 text-blue-500" />
          Data Visualization
        </CardTitle>
        <CardDescription>
          Advertising vs Sales data visualization
          {modelResults && (
            <span className="block mt-1 text-xs font-mono">
              y = {modelResults.slope.toFixed(2)}x + {modelResults.intercept.toFixed(2)}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="Advertising" 
                label={{ value: 'Advertising ($)', position: 'bottom' }}
                domain={['auto', 'auto']}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="Sales" 
                label={{ value: 'Sales ($)', angle: -90, position: 'left' }}
                domain={['auto', 'auto']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Scatter 
                name="Training Data" 
                data={data.map(d => ({ x: d.x, y: d.y, type: "Training Data" }))} 
                fill="#8884d8" 
              />
              {testData && (
                <Scatter 
                  name="Test Data" 
                  data={testData.map(d => ({ x: d.x, y: d.y, type: "Test Data" }))} 
                  fill="#82ca9d" 
                />
              )}
              {modelResults && (
                <Line
                  name="Regression Line"
                  data={lineData}
                  type="monotone"
                  dataKey="yPred"
                  stroke="#ff7300"
                  strokeWidth={2}
                  dot={false}
                  activeDot={false}
                />
              )}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataVisualizer;
