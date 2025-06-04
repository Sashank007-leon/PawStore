const Sidebar = ({ sections, active, setActive }) => (
  <aside className="w-64 bg-[#FFD4A3] rounded-r-[40px] p-8 flex flex-col gap-6 shadow-lg">
    <h2 className="text-2xl font-bold mb-8 font-poppins">Admin Panel</h2>
    {sections.map((s, i) => (
      <button
        key={s.label}
        onClick={() => setActive(i)}
        className={`text-lg font-medium px-4 py-2 rounded-2xl transition ${
          active === i
            ? "bg-[#E58608] text-white shadow"
            : "hover:bg-[#FFE4B5] text-black"
        }`}
      >
        {s.label}
      </button>
    ))}
  </aside>
);

export default Sidebar;