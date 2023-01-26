import React from 'react'
import freePeople from '../../../images/FreePeople.jpg';
import jamesBrown from '../../../images/jamesBrown.jpeg';
import neverMind from '../../../images/neverMind.jpeg';
import pinkFloyd from '../../../images/pinkFloyd.jpeg';


function Carousel() {
  return (
		<div className="shadow">
			{/* Carousel */}
			<div
				id="carouselExampleIndicators"
				className="carousel slide"
				data-bs-ride="true"
				style={{ maxHeight: "40vh" }}
			>
				<div className="carousel-indicators">
					<button
						type="button"
						data-bs-target="#carouselExampleIndicators"
						data-bs-slide-to="0"
						className="active"
						aria-current="true"
						aria-label="Slide 1"
					></button>
					<button
						type="button"
						data-bs-target="#carouselExampleIndicators"
						data-bs-slide-to="1"
						aria-label="Slide 2"
					></button>
					<button
						type="button"
						data-bs-target="#carouselExampleIndicators"
						data-bs-slide-to="2"
						aria-label="Slide 3"
					></button>
				</div>
				<div className="carousel-inner" style={{ maxHeight: "40vh" }}>
					<div className="carousel-item active">
						<img
							src={jamesBrown}
							className="d-block w-100"
							alt="..."
						/>
					</div>
					<div className="carousel-item">
						<img
							src={neverMind}
							className="d-block w-100"
							alt="..."
						/>
					</div>
					<div className="carousel-item">
						<img
							src={pinkFloyd}
							className="d-block w-100"
							alt="..."
						/>
					</div>
				</div>
				<button
					className="carousel-control-prev"
					type="button"
					data-bs-target="#carouselExampleIndicators"
					data-bs-slide="prev"
				>
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button
					className="carousel-control-next"
					type="button"
					data-bs-target="#carouselExampleIndicators"
					data-bs-slide="next"
				>
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Next</span>
				</button>
			</div>
		</div>
	);
}

export default Carousel