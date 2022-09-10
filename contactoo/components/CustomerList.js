import React from "react";
import CustomerTicket from "../components/CustomerTicket";

export default function CustomerList({ user }) {
  // TODO: add functions to read customers from DB and render them as a CustomerTicket into the list

  return (
    <ul className="w-full h-full divide-y divide-gray-500 ">
      <CustomerTicket name={user.username} email={user.email} />
      <CustomerTicket name="Jone" email="Jone@gmail" />
      <CustomerTicket name="Reallylongname" email="Reallylongname@gmail" />
    </ul>
  );
}
