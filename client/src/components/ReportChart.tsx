'use client';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement);

export default function ReportChart({
  categorySales,
}: {
  categorySales: any[];
}) {
  const data = {
    labels: categorySales.map((c) => c.category),
    datasets: [
      {
        label: 'Sales',
        data: categorySales.map((c) => c.totalSold),
        backgroundColor: 'rgba(59,130,246,0.5)',
      },
    ],
  };

  return <Bar data={data} />;
}
