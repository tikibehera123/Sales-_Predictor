
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import DataGenerator from '@/components/DataGenerator';
import DataVisualizer from '@/components/DataVisualizer';
import ModelTrainer from '@/components/ModelTrainer';
import ResultsInterpreter from '@/components/ResultsInterpreter';
import Predictor from '@/components/Predictor';
import { DataPoint, RegressionResults, generateData } from '@/utils/regressionUtils';
import { Separator } from '@/components/ui/separator';
import { LineChartIcon, BookOpenIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [trainData, setTrainData] = useState<DataPoint[]>([]);
  const [testData, setTestData] = useState<DataPoint[]>([]);
  const [modelResults, setModelResults] = useState<RegressionResults | undefined>(undefined);
  const { toast } = useToast();

  // Initialize with some data
  useEffect(() => {
    const initialData = generateData();
    setData(initialData);
  }, []);

  const handleGenerateData = (newData: DataPoint[]) => {
    setData(newData);
    setModelResults(undefined);
    setTrainData([]);
    setTestData([]);
    toast({
      title: "Data Generated",
      description: `Created ${newData.length} data points for analysis`,
    });
  };

  const handleModelTrained = (
    results: RegressionResults,
    trainDataPoints: DataPoint[],
    testDataPoints: DataPoint[]
  ) => {
    setModelResults(results);
    setTrainData(trainDataPoints);
    setTestData(testDataPoints);
    toast({
      title: "Model Trained Successfully",
      description: `R² Value: ${(results.rSquared * 100).toFixed(1)}%`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <LineChartIcon className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold">Sales Predictor AI Guide</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
            This interactive tool demonstrates the concepts of Simple Linear Regression using a business context: 
            predicting sales based on advertising spend. Learn how to build, train, evaluate, and interpret a 
            regression model with hands-on examples.
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-lg p-4 mt-4 flex items-start gap-3 max-w-3xl">
            <BookOpenIcon className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-sm text-blue-800 dark:text-blue-300 mb-1">
                What is Simple Linear Regression?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Simple Linear Regression is a statistical method that allows us to model the relationship between 
                a dependent variable (Sales) and an independent variable (Advertising). The model finds the 
                "line of best fit" through the data points, which can then be used to make predictions.
              </p>
              <div className="math-formula mt-3 mb-2">
                Sales = β₀ + β₁ × Advertising + ε
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Where β₀ is the intercept, β₁ is the slope, and ε represents random error.
              </p>
            </div>
          </div>
        </section>
        
        <Separator className="my-8" />
        
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <DataGenerator onGenerateData={handleGenerateData} />
          <DataVisualizer 
            data={data} 
            modelResults={modelResults} 
            testData={testData}
          />
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ModelTrainer data={data} onModelTrained={handleModelTrained} />
          <ResultsInterpreter results={modelResults} />
          <Predictor modelResults={modelResults} />
        </section>
        
        <footer className="mt-12 text-center text-sm text-gray-500 pb-8">
          <p>© 2025 Sales Predictor AI Guide • Built with React and TailwindCSS</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
