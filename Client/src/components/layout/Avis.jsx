import React from "react";

const Comment = ({avi}) => {
  return (
    <div key={avi.id} className="border-b last:border-none pb-2 mb-2 last:pb-0 last:mb-0">
          <p><span className='
          font-bold
           text-blue-500
           '>{avi.User.username}</span>: {new Date(avi.createdAt).toLocaleDateString()}</p>
          <p>{avi.review}</p>
          <p>{avi.rating}</p>
      </div>
  )
}

export default Comment 