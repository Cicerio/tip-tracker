import React from "react"
import { Link } from "react-router-dom"

function HomePage(){
  return(
    <div>
      <h1>Tip Tracker</h1>
      <Link to="/secret">Authenticate</Link>
    </div>
  )
}
export default HomePage