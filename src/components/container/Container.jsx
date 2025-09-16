import React from 'react'
//this is the file that indicated the 
// container which whill be used to control the styling properties of the different components it contains 
function Container({children}) {
  return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>
}

export default Container