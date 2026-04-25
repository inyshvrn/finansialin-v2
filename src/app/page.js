export default function Home() {
  return (
    <div className="flex min-h-full items-center justify-center px-6 py-10 lg:px-12">
      <main className="w-full max-w-5xl rounded-[40px] border border-fin-border bg-fin-bg p-8 shadow-sm lg:p-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="inline-block rounded-4xl border border-fin-border bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-fin-gold shadow-sm">
              Luxury Minimalist Finance
            </p>
            <h1 className="font-serif text-4xl font-bold leading-tight text-fin-black lg:text-5xl">
              Kelola Finansial Harian dengan Tampilan Elegan dan Tenang.
            </h1>
            <p className="max-w-xl text-base leading-7 text-fin-black/65">
              Finansialin membantu Anda fokus pada keputusan keuangan penting melalui pengalaman visual yang bersih, premium, dan terstruktur.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/dashboard"
                className="rounded-4xl bg-fin-black px-7 py-3 text-sm font-semibold text-fin-bg shadow-sm transition hover:brightness-95"
              >
                Masuk Dashboard
              </a>
              <a
                href="/transactions"
                className="rounded-4xl border border-fin-border bg-white px-7 py-3 text-sm font-semibold text-fin-black shadow-sm transition hover:bg-fin-bg"
              >
                Lihat Transaksi
              </a>
            </div>
          </div>

          <div className="rounded-[40px] border border-fin-border bg-white p-8 shadow-sm">
            <p className="mb-2 text-sm font-medium text-fin-black/60">Total Balance</p>
            <h2 className="font-serif text-4xl font-bold text-fin-black">Rp 45.250.000</h2>
            <div className="mt-8 space-y-4">
              <div className="rounded-4xl border border-fin-border bg-fin-bg px-5 py-4 shadow-sm">
                <p className="text-xs uppercase tracking-widest text-fin-black/50">Monthly Income</p>
                <p className="mt-1 text-lg font-semibold text-fin-gold">Rp 12.000.000</p>
              </div>
              <div className="rounded-4xl border border-fin-border bg-fin-bg px-5 py-4 shadow-sm">
                <p className="text-xs uppercase tracking-widest text-fin-black/50">Monthly Expense</p>
                <p className="mt-1 text-lg font-semibold text-fin-black">Rp 4.500.000</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}