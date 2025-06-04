import { useState } from "react";
import AccessoriesList from "../../components/admin/accessories/AccessoriesList";
import BlogsList from "../../components/admin/blogs/BlogsList";
import DogsList from "../../components/admin/dogs/DogsList";
import AdminAccessoryOrders from "../../components/admin/orders/AdminAccessoryOrders";
import Sidebar from "../../components/admin/Sidebar";


const sections = [
  { label: "Dogs", component: <DogsList /> },
  { label: "Blogs", component: <BlogsList /> },
  { label: "Accessories", component: <AccessoriesList /> },
  { label: "Accessory Orders", component: <AdminAccessoryOrders /> },
];

const Dashboard = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="flex min-h-screen bg-[#FFF0D9]">
      <Sidebar sections={sections} active={active} setActive={setActive} />
      <main className="flex-1 p-8 bg-white rounded-l-[40px] shadow-lg m-4">
        {sections[active].component}
      </main>
    </div>
  );
};

export default Dashboard;