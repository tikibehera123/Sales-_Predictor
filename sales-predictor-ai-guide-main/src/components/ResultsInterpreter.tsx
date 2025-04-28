
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RegressionResults } from '@/utils/regressionUtils';
import { BarChart3, CheckCircle2 } from 'lucide-react';

interface ResultsInterpreterProps {
  results?: RegressionResults;
}

const ResultsInterpreter: React.FC<ResultsInterpreterProps> = ({ results }) => {
  if (!results) {
    return (
      <Card className="h-full card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Results Interpretation
          </CardTitle>
          <CardDescription>
            Train a model to see results interpretation
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-gray-500">No model results to display</p>
        </CardContent>
      </Card>
    );
  }

  const { slope, intercept, rSquared, mae, mse, rmse } = results;
  
  // Format numbers for display
  const formatNumber = (num: number) => {
    return num.toFixed(2);
  };
  
  // Calculate R-squared as a percentage
  const rSquaredPercent = (rSquared * 100).toFixed(1);
  
  return (
    <Card className="h-full card-hover">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-500" />
          Results Interpretation
        </CardTitle>
        <CardDescription>
          Understanding your regression model results
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-1">Model Equation</h3>
          <div className="math-formula">
            Sales = {formatNumber(intercept)} + {formatNumber(slope)} × Advertising
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">Intercept (β₀)</div>
            <div className="text-lg font-semibold">{formatNumber(intercept)}</div>
            <div className="text-xs text-gray-500 mt-1">
              Expected sales when advertising is $0
            </div>
          </div>
          
          <div className="border rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">Slope (β₁)</div>
            <div className="text-lg font-semibold">{formatNumber(slope)}</div>
            <div className="text-xs text-gray-500 mt-1">
              Sales increase per $1 in advertising
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium mb-2">Performance Metrics</h3>
          
          <div className="flex items-center mb-3">
            <div className="w-1/3 text-xs">R² (Goodness of Fit)</div>
            <div className="w-1/3">
              <div 
                className="h-2 bg-gray-200 rounded-full overflow-hidden"
                style={{width: '100%'}}
              >
                <div 
                  className="h-full bg-blue-500" 
                  style={{width: `${rSquaredPercent}%`}}
                ></div>
              </div>
            </div>
            <div className="w-1/3 text-right text-sm font-medium">
              {rSquaredPercent}%
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <div>Mean Absolute Error (MAE)</div>
              <div>{formatNumber(mae)}</div>
            </div>
            <div className="flex justify-between">
              <div>Mean Squared Error (MSE)</div>
              <div>{formatNumber(mse)}</div>
            </div>
            <div className="flex justify-between">
              <div>Root Mean Squared Error (RMSE)</div>
              <div>{formatNumber(rmse)}</div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium mb-2">Business Interpretation</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
              <p className="text-sm">
                For every additional $1 spent on advertising, we expect to see an additional <b>${formatNumber(slope)}</b> in sales.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
              <p className="text-sm">
                About <b>{rSquaredPercent}%</b> of the variation in sales can be explained by changes in advertising spend.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
              <p className="text-sm">
                On average, our sales predictions are off by about <b>${formatNumber(rmse)}</b>.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsInterpreter;
