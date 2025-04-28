
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { generateData, DataPoint } from '@/utils/regressionUtils';
import { AreaChart, RefreshCw } from 'lucide-react';

interface DataGeneratorProps {
  onGenerateData: (data: DataPoint[]) => void;
}

const DataGenerator: React.FC<DataGeneratorProps> = ({ onGenerateData }) => {
  const [numPoints, setNumPoints] = useState(40);
  const [slope, setSlope] = useState(0.8);
  const [intercept, setIntercept] = useState(10);
  const [noiseFactor, setNoiseFactor] = useState(5);
  const [minX, setMinX] = useState(10);
  const [maxX, setMaxX] = useState(100);

  const handleGenerateData = () => {
    const newData = generateData(
      numPoints,
      slope,
      intercept,
      noiseFactor,
      minX,
      maxX
    );
    onGenerateData(newData);
  };

  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AreaChart className="h-5 w-5 text-blue-500" />
          Data Generator
        </CardTitle>
        <CardDescription>
          Configure and generate synthetic advertising vs. sales data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Number of Data Points</label>
            <span className="text-sm text-gray-500">{numPoints}</span>
          </div>
          <Slider 
            value={[numPoints]} 
            min={10} 
            max={100} 
            step={1} 
            onValueChange={(value) => setNumPoints(value[0])} 
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium">True Slope (β₁)</label>
            <span className="text-sm text-gray-500">{slope.toFixed(2)}</span>
          </div>
          <Slider 
            value={[slope]} 
            min={0.1} 
            max={3} 
            step={0.1} 
            onValueChange={(value) => setSlope(value[0])} 
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium">True Intercept (β₀)</label>
            <span className="text-sm text-gray-500">{intercept.toFixed(2)}</span>
          </div>
          <Slider 
            value={[intercept]} 
            min={0} 
            max={50} 
            step={1} 
            onValueChange={(value) => setIntercept(value[0])} 
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Noise Factor</label>
            <span className="text-sm text-gray-500">{noiseFactor.toFixed(2)}</span>
          </div>
          <Slider 
            value={[noiseFactor]} 
            min={0} 
            max={20} 
            step={0.5} 
            onValueChange={(value) => setNoiseFactor(value[0])} 
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium">X Range (Advertising $)</label>
            <span className="text-sm text-gray-500">{`${minX} - ${maxX}`}</span>
          </div>
          <Slider 
            value={[minX, maxX]} 
            min={0} 
            max={200} 
            step={5} 
            onValueChange={(value) => {
              setMinX(value[0]);
              setMaxX(value[1]);
            }} 
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleGenerateData} 
          className="w-full"
          variant="default"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Generate Data
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DataGenerator;
