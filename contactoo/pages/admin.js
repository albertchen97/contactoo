import React from 'react'
import CustomerList from '../components/CustomerList'

export default function Admin() {
  return (
    <main className="flex flex-row w-screen text-xl md:text-2xl">

      {/* first pane */}
      <div className="flex w-1/12 h-screen">

      </div>

      {/* second pane */}
      <div className="flex w-2/12 h-screen">

      </div>

      {/* third pane with all the customer tickets */}
      <div className="flex flex-col w-9/12">

        {/* top section of the pane that labels the pane as 'All Tickets' + name of each column */}
        <div className="flex flex-col justify-center w-full h-1/5 max-h-52 ">
          {/* all tickets title */}
          <div className="w-full border-b border-gray-500 h-1/2 max-h-24 p-9">
            All tickets
          </div>

          {/* names of columns  */}
          <div className="flex justify-between w-full border-b border-gray-500 h-1/2 max-h-28 p-9">
            <span>Box</span> 
            <span>Customer</span> 
            <span>Subject</span> 
            <span>Status</span>
            <span>Chat</span>
          </div>
        </div>

        {/* customer tickets list */}
        <CustomerList/>

      </div>


    </main>
  )
}
