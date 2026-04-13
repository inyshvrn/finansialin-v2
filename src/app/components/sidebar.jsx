export default function sidebar() {
  return (
    <aside className="w-[250px] bg-white flex flex-col justify-between py-6 px-5">
      {/* LOGO */}
      <h1 className="text-2xl font-bold mb-12">FINANSIALIN</h1>

      {/* MENU */}
      <div className="space-y-8 text-[18px]">
        <MenuItem text="Dashboard" />
        <MenuItem text="Transactions" />
        <MenuItem text="Budgeting" />
        <MenuItem text="Statistics" />

        {/* ACTIVE */}
        <div className="flex items-center gap-3 font-semibold">
          <div className="w-2 h-10 bg-yellow-400 rounded-full"></div>
          <p>Settings</p>
        </div>
      </div>

      {/* LOGOUT */}
      <p className="text-lg">Logout</p>
    </aside>
  );
}

function MenuItem({ text }) {
  return <p className="text-gray-800">{text}</p>;
}