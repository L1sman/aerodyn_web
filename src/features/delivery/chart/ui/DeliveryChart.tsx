import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { deliveryStore } from '@/entities/delivery/model/store';
import styles from './DeliveryChart.module.scss';

export const DeliveryChart = observer(() => {
  // Group deliveries by date and count them
  const chartData = React.useMemo(() => {
    const groupedData = deliveryStore.filteredDeliveries.reduce((acc, delivery) => {
      const date = delivery.created_at.split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(groupedData)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [deliveryStore.filteredDeliveries]);

  if (deliveryStore.loading) {
    return <div className={styles.loading}>Loading chart...</div>;
  }

  if (deliveryStore.error) {
    return <div className={styles.error}>{deliveryStore.error}</div>;
  }

  return (
    <div className={styles.chart}>
      <h2 className={styles.title}>Количество доставок</h2>
      <div className={styles.chartContent}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fill: 'var(--mantine-color-gray-4)' }}
            />
            <YAxis
              tick={{ fill: 'var(--mantine-color-gray-4)' }}
              allowDecimals={false}
              domain={[0, 'auto']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--mantine-color-dark-7)',
                border: '1px solid var(--mantine-color-dark-4)',
              }}
              labelStyle={{ color: 'var(--mantine-color-gray-4)' }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="var(--mantine-color-grape-7)"
              strokeWidth={2}
              dot={{ fill: 'var(--mantine-color-grape-7)', r: 4 }}
              name="Доставки"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}); 