import { AnomalyResult } from '../../src/components/l4eWidget/types';

export const BaseAnomalyResult = {
  quality: 'GOOD',
  value: {
    anomalyScore: 50,
    predictionReason: 'bad stuff idk',
    diagnostics: [
      { name: 'Average Power', value: 0.1 },
      { name: 'Average Wind Speed', value: 0.22 },
      { name: 'RPM', value: 0.18 },
      { name: 'Torque', value: 0.1 },
      { name: 'Wind Direction', value: 0.05 },
      { name: 'Wind Speed', value: 0.05 },
    ],
  },
};

function getRandomDate(from: Date, to: Date) {
  const fromTime = from.getTime();
  const toTime = to.getTime();
  return new Date(fromTime + Math.random() * (toTime - fromTime)).getTime();
}

// creates array of 10 random dates within last 7 days
const times = new Array(10)
  .fill(null)
  .map(() =>
    getRandomDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date())
  );

export const mockData: AnomalyResult[] = times.map((time) => ({
  ...BaseAnomalyResult,
  timestamp: new Date(time),
  value: {
    ...BaseAnomalyResult.value,
    diagnostics: BaseAnomalyResult.value.diagnostics.map((d) => ({
      name: d.name,
      value: Math.random(),
    })),
  },
}));
