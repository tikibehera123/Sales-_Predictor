
// Simple Linear Regression utilities

export interface DataPoint {
  x: number; // Advertising
  y: number; // Sales
}

export interface RegressionResults {
  slope: number;
  intercept: number;
  rSquared: number;
  mae: number;
  mse: number;
  rmse: number;
  predictions: DataPoint[];
}

// Generate synthetic data with a linear relationship plus some random noise
export function generateData(
  numPoints: number = 40,
  slope: number = 0.8,
  intercept: number = 10,
  noiseFactor: number = 5,
  minX: number = 10,
  maxX: number = 100
): DataPoint[] {
  const data: DataPoint[] = [];
  
  for (let i = 0; i < numPoints; i++) {
    // Generate random x value within the specified range
    const x = minX + Math.random() * (maxX - minX);
    
    // Generate y with linear relationship plus noise
    const noise = (Math.random() - 0.5) * noiseFactor;
    const y = intercept + slope * x + noise;
    
    data.push({ x, y });
  }
  
  return data;
}

// Split data into training and testing sets
export function trainTestSplit(
  data: DataPoint[],
  testSize: number = 0.2
): { train: DataPoint[]; test: DataPoint[] } {
  // Shuffle the data
  const shuffled = [...data].sort(() => Math.random() - 0.5);
  
  const testCount = Math.round(data.length * testSize);
  const trainCount = data.length - testCount;
  
  return {
    train: shuffled.slice(0, trainCount),
    test: shuffled.slice(trainCount)
  };
}

// Calculate the mean of an array of numbers
export function mean(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

// Fit simple linear regression model
export function fitLinearRegression(data: DataPoint[]): { slope: number; intercept: number } {
  const n = data.length;
  
  // Extract x and y values
  const xValues = data.map(point => point.x);
  const yValues = data.map(point => point.y);
  
  // Calculate means
  const xMean = mean(xValues);
  const yMean = mean(yValues);
  
  // Calculate slope (b1)
  let numerator = 0;
  let denominator = 0;
  
  for (let i = 0; i < n; i++) {
    numerator += (xValues[i] - xMean) * (yValues[i] - yMean);
    denominator += Math.pow(xValues[i] - xMean, 2);
  }
  
  const slope = numerator / denominator;
  
  // Calculate intercept (b0)
  const intercept = yMean - slope * xMean;
  
  return { slope, intercept };
}

// Make predictions using the fitted model
export function predict(x: number[], slope: number, intercept: number): number[] {
  return x.map(value => intercept + slope * value);
}

// Calculate R-squared (coefficient of determination)
export function calculateRSquared(actual: number[], predicted: number[]): number {
  const actualMean = mean(actual);
  
  let totalSumOfSquares = 0;
  let residualSumOfSquares = 0;
  
  for (let i = 0; i < actual.length; i++) {
    totalSumOfSquares += Math.pow(actual[i] - actualMean, 2);
    residualSumOfSquares += Math.pow(actual[i] - predicted[i], 2);
  }
  
  return 1 - (residualSumOfSquares / totalSumOfSquares);
}

// Calculate Mean Absolute Error
export function calculateMAE(actual: number[], predicted: number[]): number {
  let sum = 0;
  for (let i = 0; i < actual.length; i++) {
    sum += Math.abs(actual[i] - predicted[i]);
  }
  return sum / actual.length;
}

// Calculate Mean Squared Error
export function calculateMSE(actual: number[], predicted: number[]): number {
  let sum = 0;
  for (let i = 0; i < actual.length; i++) {
    sum += Math.pow(actual[i] - predicted[i], 2);
  }
  return sum / actual.length;
}

// Calculate Root Mean Squared Error
export function calculateRMSE(actual: number[], predicted: number[]): number {
  return Math.sqrt(calculateMSE(actual, predicted));
}

// Train the model and evaluate it
export function trainAndEvaluate(trainData: DataPoint[], testData: DataPoint[]): RegressionResults {
  // Fit the model on training data
  const { slope, intercept } = fitLinearRegression(trainData);
  
  // Make predictions on test data
  const xTest = testData.map(point => point.x);
  const yTest = testData.map(point => point.y);
  const yPred = predict(xTest, slope, intercept);
  
  // Calculate evaluation metrics
  const rSquared = calculateRSquared(yTest, yPred);
  const mae = calculateMAE(yTest, yPred);
  const mse = calculateMSE(yTest, yPred);
  const rmse = calculateRMSE(yTest, yPred);
  
  // Create predictions array for visualization
  const predictions: DataPoint[] = xTest.map((x, i) => ({
    x,
    y: yPred[i]
  }));
  
  return { 
    slope, 
    intercept, 
    rSquared, 
    mae, 
    mse, 
    rmse,
    predictions 
  };
}
