import React, { useState } from "react";

const initialUsers = [
  { id: 1, name: "Sashank", email: "sashank@email.com", role: "Admin" },
  { id: 2, name: "John Doe", email: "john@email.com", role: "User" },
];

const UsersList = () => {
  const [users] = useState(initialUsers);

  return (
    <div>
      <h3 className="text-2xl font-bold font-poppins mb-6">Users</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#FFF1DB] rounded-3xl shadow">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left font-semibold">Name</th>
              <th className="py-3 px-6 text-left font-semibold">Email</th>
              <th className="py-3 px-6 text-left font-semibold">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t">
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;