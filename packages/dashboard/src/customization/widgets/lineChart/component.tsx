import React from 'react';
import { useSelector } from 'react-redux';

import { LineChart } from '@iot-app-kit/react-components';

import type { DashboardState } from '~/store/state';
import type { LineChartWidget } from '../types';
import { useQueries } from '~/components/dashboard/queryContext';
import { getAggregation } from '../utils/widgetAggregationUtils';
import { aggregateToString } from '~/customization/propertiesSections/aggregationSettings/helpers';

const LineChartWidgetComponent: React.FC<LineChartWidget> = (widget) => {
  const viewport = useSelector((state: DashboardState) => state.dashboardConfiguration.viewport);
  const readOnly = useSelector((state: DashboardState) => state.readOnly);

  const { queryConfig, styleSettings, axis, thresholds, thresholdSettings } = widget.properties;

  const { iotSiteWiseQuery } = useQueries();
  const queries = iotSiteWiseQuery && queryConfig.query ? [iotSiteWiseQuery?.timeSeriesData(queryConfig.query)] : [];

  const aggregation = getAggregation(queryConfig);

  return (
    <LineChart
      queries={queries}
      viewport={viewport}
      gestures={readOnly}
      axis={axis}
      aggregationType={aggregateToString(aggregation)}
      styles={styleSettings}
      thresholds={thresholds}
      thresholdSettings={thresholdSettings}
    />
  );
};

export default LineChartWidgetComponent;
