import React from 'react'
import contact from '../img/contact.jpg'


export const Contact = () => {
  return (
    <div>
        <div className="container-fluid mt-4 mb-4">
            <h2 className="text-center pb-2 ">Contact Us</h2>
            <div className="row">
                <div className="col-12 col-md-6 text-center">
                    <img src={contact} style={{"width":"70%", "height":"98%"}}/>
                </div>
                <div className="col-12 col-md-6  d-flex justify-content-center">
                    <form className="form-control border-0" style={{"width":"80%"}}>
                        <label htmlFor="name" className="form-label mb-0 fw-bold">Name:</label>
                        <input type="text" className="form-control mb-3 " id="name" placeholder="Enter your name" style={{"width":"80%"}}/>
                        <label htmlFor="e-mail" className="form-label mb-0 fw-bold">Email:</label>
                        <input type="text" className="form-control mb-3" id="e-mail" placeholder="Enter your name" style={{"width":"80%"}}/>
                        <label htmlFor="msg" className="form-label mb-0 fw-bold">Message:</label>
                        <textarea className="form-control mb-3" rows={3} id="msg" style={{"width":"80%"}}></textarea>
                        <button className="btn btn-warning" style={{"width":"80%"}}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
