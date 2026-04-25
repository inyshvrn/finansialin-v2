import { Bell, Search, UserCircle2, Pencil } from "lucide-react";

const accountCards = [
  { title: "MBanking", bank: "BRI", value: "Rp100.000.000", detail: "3388 4556 8860 8***", subtitle: "Account Number" },
  { title: "Emoney", bank: "Jago", value: "Rp50.000.000", detail: "3388 4556 8860 8***", subtitle: "Account Number" },
  { title: "Cash", bank: "Wallet", value: "Rp50.000.000", detail: null, subtitle: "Total amount" },
];

const transactions = [
  { receiver: "Handai Coffee", type: "R&D", date: "9 Apr 2026", amount: "Rp200.000" },
  { receiver: "Loffu Mart", type: "Mart", date: "9 Apr 2026", amount: "Rp200.000" },
  { receiver: "Yogya Mart", type: "Mart", date: "9 Apr 2026", amount: "Rp200.000" },
];

const pieLegend = [
  { label: "House", color: "bg-[#F8CB28]" },
  { label: "Food", color: "bg-[#F8E28A]" },
  { label: "Investing", color: "bg-[#020202]" },
  { label: "Online Shop", color: "bg-[#A38B1D]" },
  { label: "Beauty", color: "bg-[#756416]" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-full bg-[linear-gradient(131.06deg,#F2EFE8_38.63%,#EBDFC6_92.98%)] p-6 lg:p-10">
      <div className="mx-auto max-w-285 space-y-8">
        <section className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-3xl font-semibold leading-tight text-fin-black lg:text-4xl">Hi ABP, Welcome back!</h1>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex w-full items-center gap-3 rounded-full bg-white px-5 py-3 shadow-sm sm:w-116">
              <Search size={20} className="text-fin-black/50" />
              <input
                type="text"
                placeholder="Type to search"
                className="w-full bg-transparent text-base text-fin-black placeholder:text-fin-black/45 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-fin-black shadow-sm">
                <Bell size={22} />
              </button>
              <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-fin-black shadow-sm">
                <UserCircle2 size={24} />
              </button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {accountCards.map((card) => (
            <article key={card.title} className="rounded-[20px] bg-white p-6 shadow-[0_20px_25px_rgba(76,103,100,0.1)]">
              <div className="mb-4 flex items-center justify-between border-b border-black/10 pb-3">
                <p className="text-sm font-bold text-black/65">{card.title}</p>
                <p className="text-xs font-medium text-black/60">{card.bank}</p>
              </div>
              <div className="space-y-3">
                {card.detail && (
                  <div>
                    <p className="text-lg font-semibold text-black/90">{card.detail}</p>
                    <p className="text-xs text-black/45">{card.subtitle}</p>
                  </div>
                )}
                <div>
                  <p className={`font-semibold text-black/90 ${card.detail ? "text-base" : "text-3xl"}`}>{card.value}</p>
                  <p className="text-xs text-black/45">Total amount</p>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between text-sm">
                <button className="text-[#299D91]">Remove</button>
                <Pencil size={14} className="text-black/60" />
              </div>
            </article>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <article className="rounded-[20px] bg-white p-5 shadow-sm xl:col-span-8">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-base font-medium text-black">Total Income</h3>
              <button className="rounded-md border border-black/25 px-4 py-1 text-sm text-black/60">Last 6 months</button>
            </div>
            <div className="relative h-70 overflow-hidden rounded-2xl border border-black/10 bg-[#FEFDF9] p-4">
              <div className="absolute inset-0 grid grid-cols-6 px-4 py-3">
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} className="border-r border-dashed border-black/10 last:border-r-0" />
                ))}
              </div>
              <div className="absolute inset-0 grid grid-rows-6 px-4 py-3">
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} className="border-b border-dashed border-black/10 last:border-b-0" />
                ))}
              </div>
              <div className="absolute bottom-12 left-[10%] h-[62%] w-[80%] rounded-[22px] bg-linear-to-b from-[#ECC939] to-[#F5CA1C2E]" />
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                <polyline
                  fill="none"
                  stroke="#4F4004"
                  strokeWidth="0.5"
                  points="10,32 26,40 42,19 58,50 74,58 90,67"
                />
              </svg>
              <div className="absolute bottom-3 left-0 right-0 flex justify-around px-6 text-xs text-black/55">
                {"Apr,Mei,Jun,Jul,Aug,Sep".split(",").map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </div>
          </article>

          <article className="rounded-[20px] bg-white p-5 shadow-sm xl:col-span-4">
            <h3 className="mb-3 text-base font-medium text-black">Activity</h3>
            <div className="flex items-center gap-5">
              <div className="relative h-52 w-52 shrink-0 rounded-full bg-[conic-gradient(#F8CB28_0deg_70deg,#F8E28A_70deg_150deg,#F5CA1C_150deg_230deg,#020202_230deg_300deg,#756416_300deg_360deg)] p-7">
                <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-white">
                  <p className="text-sm font-semibold">Spent</p>
                  <p className="text-lg font-semibold">Rp5.000.000</p>
                </div>
              </div>
              <div className="space-y-2">
                {pieLegend.map((legend) => (
                  <div key={legend.label} className="flex items-center gap-2 text-xs text-black/70">
                    <span className={`h-3 w-3 rounded-full ${legend.color}`} />
                    <span>{legend.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="rounded-[20px] bg-white p-5 shadow-sm xl:col-span-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-medium text-black">Transaction history</h3>
              <div className="flex items-center gap-5 text-sm">
                <button className="font-bold text-[#F5CA1C] underline">Recently</button>
                <button className="text-black/70">Oldest</button>
                <button className="text-black/70">More</button>
              </div>
            </div>
            <div className="grid grid-cols-4 border-b border-black/20 pb-2 text-sm text-black/80">
              <p>Reciever</p>
              <p>Type</p>
              <p>Date</p>
              <p className="text-right">Amount</p>
            </div>
            <div className="divide-y divide-black/15">
              {transactions.map((item) => (
                <div key={`${item.receiver}-${item.date}`} className="grid grid-cols-4 py-3 text-sm text-black/90">
                  <p>{item.receiver}</p>
                  <p>{item.type}</p>
                  <p>{item.date}</p>
                  <p className="text-right">{item.amount}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[20px] bg-white p-5 shadow-sm xl:col-span-4">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-base font-medium text-black">My Goals</h3>
              <button className="rounded-full bg-[#F5CA1C] px-4 py-1 text-xs">Add Goals</button>
            </div>
            <GoalProgress title="Travel" percent={50} value="Rp 2.000.000,00 / Rp 5.000.000,00" />
            <GoalProgress title="Car" percent={25} value="Rp 100.000.000,00 / Rp 400.000.000,00" />
          </article>
        </section>
      </div>
    </div>
  );
}

function GoalProgress({ title, percent, value }) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-black/90">{title}</span>
        <span className="text-black/80">{percent}%</span>
      </div>
      <p className="mb-3 text-xs text-black/70">{value}</p>
      <div className="grid grid-cols-10 gap-1">
        {[...Array(10)].map((_, index) => (
          <span
            key={`${title}-${index}`}
            className={`h-2 rounded-full ${index < Math.round(percent / 10) ? "bg-[#E7CA47]" : "bg-black/85"}`}
          />
        ))}
      </div>
    </div>
  );
}