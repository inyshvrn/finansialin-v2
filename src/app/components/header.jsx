export default function header() {
  return (
    <div className="flex items-center justify-between">
      {/* TITLE */}
      <h1 className="text-[32px] font-semibold">Settings</h1>

      {/* RIGHT */}
      <div className="flex items-center gap-5">
        {/* SEARCH */}
        <div className="bg-white px-5 py-2 rounded-full w-[460px] flex items-center gap-3 shadow-sm">
          <span className="text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Type to search"
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>

        {/* ICONS */}
        <div className="w-9 h-9 bg-black rounded-full"></div>
        <div className="w-9 h-9 bg-black rounded-full"></div>
      </div>
    </div>
  );
}