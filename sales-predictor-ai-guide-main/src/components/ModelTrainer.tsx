
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DataPoint, trainTestSplit, trainAndEvaluate, RegressionResults } from '@/utils/regressionUtils';
import { Brain, SplitSquareHorizontal } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface ModelTrainerProps {
  data: DataPoint[];
  onModelTrained: (results: RegressionResults, trainData: DataPoint[], testData: DataPoint[]) => void;
}

const ModelTrainer: React.FC<ModelTrainerProps> = ({ data, onModelTrained }) => {
  const [testSize, setTestSize] = useState(0.2);
  const [isTraining, setIsTraining] = useState(false);

  const handleTrainModel = () => {
    if (data.length < 10) {
      console.error("Not enough data points to train a model");
      return;
    }

    setIsTraining(true);
    
    // Small delay to show training animation (purely for UX)
    setTimeout(() => {
      try {
        // Split the data into training and testing sets
        const { train, test } = trainTestSplit(data, testSize);
        
        // Train the model and evaluate it
        const results = trainAndEvaluate(train, test);
        
        // Call the callback with the results
        onModelTrained(results, train, test);
      } catch (error) {
        console.error("Error training model:", error);
      } finally {
        setIsTraining(false);
      }
    }, 700);
  };

  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-500" />
          Model Training
        </CardTitle>
        <CardDescription>
          Train and evaluate a Simple Linear Regression model
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Test Data Size</label>
            <span className="text-sm text-gray-500">{Math.round(testSize * 100)}%</span>
          </div>
          <Slider 
            value={[testSize * 100]} 
            min={10} 
            max={40} 
            step={5} 
            onValueChange={(value) => setTestSize(value[0] / 100)} 
          />
          <p className="text-xs text-gray-500 mt-1">
            {Math.round(data.length * (1 - testSize))} training samples, {Math.round(data.length * testSize)} testing samples
          </p>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium mb-2">About Simple Linear Regression</h3>
          <p className="text-xs text-gray-500">
            Simple linear regression fits a straight line to your data using the formula:
          </p>
          <div className="math-formula">
            Y = β₀ + β₁X + ε
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Where:
          </p>
          <ul className="text-xs text-gray-500 list-disc pl-5 space-y-1 mt-1">
            <li>Y: Sales (dependent variable)</li>
            <li>X: Advertising (independent variable)</li>
            <li>β₀: Intercept (baseline sales)</li>
            <li>β₁: Slope (effect of advertising)</li>
            <li>ε: Error term (random variation)</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleTrainModel} 
          className="w-full" 
          disabled={data.length < 10 || isTraining}
          variant="default"
        >
          {isTraining ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
              Training...
            </>
          ) : (
            <>
              <SplitSquareHorizontal className="h-4 w-4 mr-2" />
              Train & Evaluate Model
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModelTrainer;
