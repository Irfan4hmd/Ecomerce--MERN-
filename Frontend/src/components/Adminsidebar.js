import React from 'react'
import { Link } from 'react-router-dom'
const Adminsidebar = () => {
  return (
   
           <div className="col-xs-10">
         
          <div className="col-16">
            <div className="sidebar-wrapper">
              <nav id="sidebar">
                <ul className="list-unstyled components">
                  <li>
                    <a href="#" className="btn dropdown-toggle">
                      <i className="fas fa-tachometer-alt"></i> Dashboard
                    </a>
                  </li>

                  <li>
                    <Link
                      to="#"
                      className="btn dropdown-toggle"
                      type="button"
                      id="dropDownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fab fa-product-hunt"></i> Products
                    </Link>
                    <div
                      className="dropdown-menu"
                      style={{backgroundColor:'#56629E'}}
                      aria-labelledby="dropDownMenuButton"
                    >
                      <Link className="dropdown-item" style={{color:'black'}} to="/createProduct">
                        Create Product
                      </Link>
                      <Link className="dropdown-item" style={{color:'black'}} to="/delProduct">
                        Delete Product
                      </Link>
                      <Link className="dropdown-item" style={{color:'black'}} to="/updateProduct">
                        Update Product
                      </Link>
                    </div>
                    <li>
                    <Link to="/category" className="btn dropdown-toggle">
                      <i className="fas fa-users"></i> Categories
                    </Link>
                  </li>
                    <ul className="collapse list-unstyled" id="productSubmenu">
                      <li>
                        <a href="#" >
                          <i className="fas fa-clipboard-list"></i> All
                        </a>
                      </li>

                      <li>
                        <a href="#" >
                          <i className="fas fa-plus"></i> Create
                        </a>
                      </li>
                     
                    </ul>
                  </li>

                  <li>
                    <Link to='/allorders' className="btn dropdown-toggle">
                      <i className="fas fa-shopping-basket"></i> Orders
                    </Link>
                  </li>

                  <li>
                    <a href="#" className="btn dropdown-toggle">
                      <i className="fas fa-users"></i> Users
                    </a>
                  </li>
                  <li>
                    <Link to="/slider" className="btn dropdown-toggle">
                      <i className="fas fa-map"></i> Sliders
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
    
  )
}

export default Adminsidebar