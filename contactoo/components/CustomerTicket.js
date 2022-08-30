import React from 'react'

export default function CustomerTicket({name, email}) {
  return (

    // container for each list item
    <li className="w-full h-1/6 max-h-32">
      <div className="flex items-center h-full gap-5 pl-9">

        {/* checkbox? */}
        <div>
          Box
        </div>

        {/* customer pic + name/email */}
        <div className="flex items-center gap-3">
          <div>
            PFP
          </div>
          <div>
            {name} <br />
            {email}
          </div>
        </div>

        {/* subject description */}
        <div className="flex items-center w-1/2 p-3 border-2 border-dashed border-slate-200 h-4/5">
          place holder text place holder text place holderplace holder text place holder text place holderplace holder text place holder text place holderplace holder text place holder text place holder
        </div>

        {/* status? */}
        <div className="p-2 text-white bg-cyan-400 rounded-2xl">
          Open
        </div>

      </div>
    </li>


  )
}
