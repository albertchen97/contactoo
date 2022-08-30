import React from 'react'
import CustomerTicket from '../components/CustomerTicket'

export default function CustomerList() {

  // TODO: add functions to read customers from DB and render them as a CustomerTicket into the list

  return (
    <ul className="w-full h-full divide-y divide-gray-500 ">
      <CustomerTicket name="Smith" email="Smith@gmail" />
      <CustomerTicket name="Jone" email="Jone@gmail" />
      <CustomerTicket name="Reallylongname" email="Reallylongname@gmail" />
    </ul>
  )
}
