import React from "react";
import Carousel from 'react-bootstrap/Carousel'

function LandingPageHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
        <div className="page-header page-header-small">
	        <div className="page-header-image" ref={pageHeader}>
	        <div className="content-center">
				<Carousel>
				  <Carousel.Item>
				    <img
				      className="d-block w-100"
				      src="/assets/dog1.png"
				      alt="First slide"
				    />
				    <Carousel.Caption>
				      <h1 className="display-1 text-info Title">TruWalks</h1>
				    </Carousel.Caption>
				  </Carousel.Item>
				  <Carousel.Item>
				    <img
				      className="d-block w-100"
				      src="/assets/dog2.png"
				      alt="Third slide"
				    />

				    <Carousel.Caption>
				      <h1 className="display-1 text-info Title">TruWalks</h1>
				    </Carousel.Caption>
				  </Carousel.Item>
				  <Carousel.Item>
				    <img
				      className="d-block w-100"
				      src="/assets/dog3.png"
				      alt="Third slide"
				    />

				    <Carousel.Caption>
				      <h1 className="display-1 text-info Title">TruWalks</h1>
				    </Carousel.Caption>
				  </Carousel.Item>
				</Carousel>
	        </div>
		</div>
	</div>	
  );
}

export default LandingPageHeader;
