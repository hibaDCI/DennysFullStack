import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

function MainNav() {
	return (
		<nav className="navbar navbar-expand-sm bg-primary">
			<div className="container-fluid">
				<Link className="navbar-brand text-light" to="/">
					Navbar
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item ">
							<Link
								className="nav-link active text-light"
								aria-current="page"
								to="/"
							>
								Home
							</Link>
						</li>

						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle text-light"
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								Products
							</a>
							<ul className="dropdown-menu">
								<li>
									<Link className="dropdown-item" to="/products/list">
										List
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" to="/products/add">
										Add
									</Link>
								</li>
							</ul>
						</li>
					</ul>
                        <span className="nav-item">
                            <Link to="/login" className="nav-link text-light me-3">Login</Link>
                        </span>
				</div>
			</div>
		</nav>
	);
}

export default MainNav;
