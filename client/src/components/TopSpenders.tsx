interface Spender {
  email: string;
  totalSpent: number;
}

export default function TopSpenders({ spenders }: { spenders: Spender[] }) {
  return (
    <div className='bg-white shadow rounded p-4'>
      <h2 className='text-xl font-semibold mb-4'>Top Spenders</h2>
      <ul className='space-y-2'>
        {spenders.map((s, i) => (
          <li key={i} className='flex justify-between'>
            <span>{s.email}</span>
            <span>${s.totalSpent.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
