
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RegressionResults } from '@/utils/regressionUtils';
import { Calculator } from 'lucide-react';

interface PredictorProps {
  modelResults?: RegressionResults;
}

const Predictor: React.FC<PredictorProps> = ({ modelResults }) => {
  const [advertisingSpend, setAdvertisingSpend] = useState<string>('50');
  const [prediction, setPrediction] = useState<number | null>(null);
  
  useEffect(() => {
    if (modelResults && advertisingSpend) {
      const spend = parseFloat(advertisingSpend);
      if (!isNaN(spend)) {
        makePrediction(spend);
      }
    } else {
      setPrediction(null);
    }
  }, [modelResults, advertisingSpend]);
  
  const makePrediction = (spend: number) => {
    if (!modelResults) return;
    
    const predictedSales = modelResults.intercept + modelResults.slope * spend;
    setPrediction(predictedSales);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+\.?\d*$/.test(value)) {
      setAdvertisingSpend(value);
    }
  };

  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-500" />
          Sales Predictor
        </CardTitle>
        <CardDescription>
          Predict sales based on advertising spend
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Advertising Budget ($)</label>
          <div className="flex space-x-2">
            <Input
              type="text"
              value={advertisingSpend}
              onChange={handleInputChange}
              placeholder="Enter advertising spend"
              disabled={!modelResults}
            />
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium mb-2">Predicted Sales</h3>
          {modelResults ? (
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                ${prediction !== null ? prediction.toFixed(2) : '--'}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Based on ${advertisingSpend} advertising spend
              </p>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-6">
              Train a model to enable predictions
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-gray-500 italic">
        <p>
          Note: Predictions are based on the trained linear regression model and may vary from actual results.
        </p>
      </CardFooter>
    </Card>
  );
};

export default Predictor;
