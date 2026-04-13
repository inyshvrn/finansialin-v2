export default function ProfileForm() {
  return (
    <div className="flex gap-16">
      {/* LEFT SIDE */}
      <div className="flex flex-col items-center">
        <div className="relative">
          {/* OUTER */}
          <div className="w-[300px] h-[300px] bg-gray-200 rounded-full flex items-center justify-center">
            {/* INNER IMAGE */}
            <div className="w-[260px] h-[260px] rounded-full overflow-hidden">
 
            </div>
          </div>

          {/* CAMERA */}
          <button className="absolute bottom-5 right-5 bg-yellow-400 w-14 h-14 rounded-full flex items-center justify-center shadow-md">
            📷
          </button>
        </div>

        {/* TAB */}
        <div className="mt-8 flex gap-6">
          <button className="bg-yellow-400 px-6 py-2 rounded-full text-black">
            Edit Profile
          </button>
          <button className="text-black">Preferences</button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1">
        <div className="space-y-6 max-w-[560px]">
          {/* NAME */}
          <div className="grid grid-cols-2 gap-6">
            <Input label="First Name" placeholder="Zafira" />
            <Input label="Last Name" placeholder="Noerr" />
          </div>

          {/* EMAIL */}
          <Input label="Email" placeholder="ZafiraNackKeche@gmail.com" />

          {/* OCCUPATION */}
          <Input label="Occupation" placeholder="Student" />

          {/* BIO */}
          <div>
            <label className="block text-[15px] mb-2 text-[#3A3231]">
              Bio
            </label>
            <textarea
              className="w-full border border-gray-400 rounded-xl px-4 py-3 h-[140px] text-sm"
              placeholder="Target: Hemat buat beli MacBook Air M3"
            />
          </div>

          {/* BUTTON */}
          <div className="flex justify-end pt-4">
            <button className="bg-[#232522] text-[#ECC939] px-10 py-3 rounded-full font-semibold">
              Save Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, placeholder }) {
  return (
    <div>
      <label className="block text-[15px] mb-2 text-[#3A3231]">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full border border-gray-400 rounded-xl px-4 py-2 text-sm"
      />
    </div>
  );
}