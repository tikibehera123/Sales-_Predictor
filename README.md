# Sales-_Predictor

An interactive web application demonstrating Simple Linear Regression concepts through a practical business case of predicting sales based on advertising spend.

## Features

- **Interactive Data Generation**: Create sample datasets with configurable parameters
- **Visual Data Analysis**: Real-time visualization of data points and regression line
- **Model Training**: Train and evaluate a Simple Linear Regression model with customizable test/train split
- **Results Interpretation**: Clear explanation of model parameters and performance metrics
- **Sales Prediction**: Make real-time predictions using the trained model

## Technical Overview

This project is built with:

- **React**: Frontend framework
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: React components
- **Recharts**: Charting library
- **Lucide React**: Icons


### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

## Understanding Linear Regression

This application demonstrates Simple Linear Regression using the formula:

```
Sales = β₀ + β₁ × Advertising + ε
```

Where:
- **Sales (Y)**: Dependent variable
- **Advertising (X)**: Independent variable
- **β₀**: Intercept (baseline sales)
- **β₁**: Slope (effect of advertising)
- **ε**: Error term (random variation)

## How to Use

1. **Generate Data**: Use the Data Generator to create a sample dataset
2. **Visualize**: Examine the scatter plot of advertising vs sales
3. **Train Model**: Adjust the test size and train the model
4. **Interpret Results**: Review the model's performance metrics
5. **Make Predictions**: Use the trained model to predict sales for new advertising values

## Project Structure

- `src/components/`: React components
  - `DataGenerator.tsx`: Creates sample datasets
  - `DataVisualizer.tsx`: Displays scatter plots and regression line
  - `ModelTrainer.tsx`: Handles model training and evaluation
  - `ResultsInterpreter.tsx`: Shows model metrics and interpretation
  - `Predictor.tsx`: Makes predictions using the trained model
- `src/utils/`: Utility functions
  - `regressionUtils.ts`: Linear regression calculations


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

