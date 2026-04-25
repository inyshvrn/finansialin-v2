import Header from "../components/header";

export default function DashboardPage() {
  return (
    <div className="px-10 py-10 lg:px-16 space-y-10">
      <Header title="Dashboard" />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card title="Total Balance" amount="Rp 45.250.000" color="bg-fin-black text-white" />
        <Card title="Total Income" amount="Rp 12.000.000" color="bg-white text-fin-black" isTrendUp={true} />
        <Card title="Total Expense" amount="Rp 4.500.000" color="bg-white text-fin-black" isTrendUp={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Statistics Placeholder */}
        <div className="bg-white p-8 rounded-[40px] border border-fin-border shadow-sm h-100 flex items-center justify-center">
          <p className="text-fin-taupe italic font-serif">Financial Health Chart Placeholder</p>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-8 rounded-[40px] border border-fin-border shadow-sm">
          <h3 className="font-serif text-2xl mb-6">Recent Transactions</h3>
          <div className="space-y-4">
            <TransactionItem name="Starbucks Coffee" date="24 Apr 2026" amount="- Rp 55.000" category="Lifestyle" />
            <TransactionItem name="Freelance Project" date="22 Apr 2026" amount="+ Rp 5.000.000" category="Income" isPositive />
            <TransactionItem name="Monthly Rent" date="20 Apr 2026" amount="- Rp 2.500.000" category="Rent" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, amount, color, isTrendUp }) {
  return (
    <div className={`${color} p-8 rounded-4xl border border-fin-border shadow-md`}>
      <p className="opacity-70 font-medium mb-2">{title}</p>
      <h2 className="text-3xl font-serif font-bold">{amount}</h2>
    </div>
  );
}

function TransactionItem({ name, date, amount, category, isPositive }) {
  return (
    <div className="flex justify-between items-center p-4 hover:bg-fin-bg rounded-2xl transition">
      <div>
        <p className="font-bold">{name}</p>
        <p className="text-xs text-fin-taupe">{date} • {category}</p>
      </div>
      <p className={`font-bold ${isPositive ? 'text-green-600' : 'text-fin-black'}`}>{amount}</p>
    </div>
  );
};