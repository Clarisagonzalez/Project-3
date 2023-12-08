import { Image, Carousel, Container } from 'react-bootstrap';
import { useEffect } from 'react';

const Home = () => {

  useEffect(() => {
    document.title = 'Welcome to Unity Fund!';
    return () => {
      if (location.pathname !== '/') document.title = 'Unity Fund'
    }
  }, [])


  return (
    <Container style={{background:'lightgray'}}>
      <Carousel style={{ maxWidth: '50vw', margin: 'auto'}}>
        <Carousel.Item>
        <div className="d-flex justify-content-center">
          <Image src="/images/Donation.jpg" className='mx-auto' style={{ height: '50vh', width: 'auto' }} />
          <Carousel.Caption style={{ textAlign: 'center' }} className='text-info'>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item className=' max-vh-10'>
        <div className="d-flex justify-content-center">
          <Image src="/images/Planning-a-Charity-Event.jpg" className='mx-auto' style={{ height: '50vh', width: 'auto' }} />
          <Carousel.Caption style={{ textAlign: 'center' }} className='text-info'>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item className=' max-vh-10'>
        <div className="d-flex justify-content-center">
          <Image src="/images/plantatree.jpg" className='mx-auto' style={{ height: '50vh', width: 'auto' }} />
          <Carousel.Caption style={{ textAlign: 'center' }} className='text-info'>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item >
        <div className="d-flex justify-content-center">
          <Image src="/logo512.png" className='mx-auto' style={{ height: '50vh', width: 'auto' }} />
          <Carousel.Caption style={{ textAlign: 'center' }} className='text-info'>
            <h3>Fourth slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item className=' max-vh-10'>
        <div className="d-flex justify-content-center">
          <Image src="/logo512.png" className='text-center' style={{ height: '50vh', width: 'auto'}} />
          <Carousel.Caption style={{ textAlign: 'center' }} className='text-info'>
            <h3>Fifth slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
          </div>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default Home;
