'use client';
import { useEffect, useState } from 'react';
import { getCategorySales, getTopSpenders } from '@/utils/api';
import ReportChart from '@/components/ReportChart';

export default function ReportsPage() {
  const [categorySales, setCategorySales] = useState([]);
  const [topSpenders, setTopSpenders] = useState([]);

  useEffect(() => {
    getCategorySales().then(setCategorySales);
    getTopSpenders().then(setTopSpenders);
  }, []);

  return (
    <div>
      <h2 className='text-xl font-bold mb-4'>Category Reports</h2>
      {categorySales && Array.isArray(categorySales) && (
        <ReportChart categorySales={categorySales} />
      )}

      <h2 className='text-xl font-bold mt-4 mb-4'>Top Spenders Reports</h2>
      <ul>
        {topSpenders &&
          Array.isArray(topSpenders) &&
          topSpenders?.map((sp: any, i: number) => (
            <li key={i}>
              {sp.email}: ${sp.totalSpent}
            </li>
          ))}
      </ul>
    </div>
  );
}
