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
            <p>"Small Acts, Big Impact".</p>
          </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item className=' max-vh-10'>
        <div className="d-flex justify-content-center">
          <Image src="/images/Planning-a-Charity-Event.jpg" className='mx-auto' style={{ height: '50vh', width: 'auto' }} />
          <Carousel.Caption style={{ textAlign: 'center' }} className='text-info'>
            <p>"Inspire Giving, Ignite Progress".</p>
          </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item className=' max-vh-10'>
        <div className="d-flex justify-content-center">
          <Image src="/images/plantatree.jpg" className='mx-auto' style={{ height: '50vh', width: 'auto' }} />
          <Carousel.Caption style={{ textAlign: 'center' }} className='text-info'>
            
            <p>
            "Donate Today, Shape Tomorrow".
            </p>
          </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item >
        <div className="d-flex justify-content-center">
          <Image src="/images/womenmarch.jpg" className='mx-auto' style={{ height: '50vh', width: 'auto' }} />
          <Carousel.Caption style={{ textAlign: 'center' }} className='text-info'>
            
            <p>
            "Transforming Lives Together".
            </p>
          </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item className=' max-vh-10'>
        <div className="d-flex justify-content-center">
          <Image src="/images/artcampaign.jpg" className='text-center' style={{ height: '50vh', width: 'auto'}} />
          <Carousel.Caption style={{ textAlign: 'center' }} className='text-info'>
            
            <p>
            "Building Hope, Sparking Change".
            </p>
          </Carousel.Caption>
          </div>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default Home;
