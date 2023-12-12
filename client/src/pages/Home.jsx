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
          <Carousel.Caption style={{ textAlign: 'center', padding: '20px', borderRadius: '10px' }} className='text-light'>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>"Small Acts, Big Impact"</p>
          </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item className=' max-vh-10'>
        <div className="d-flex justify-content-center">
          <Image src="/images/Planning-a-Charity-Event.jpg" className='mx-auto' style={{ height: '50vh', width: 'auto' }} />
          <Carousel.Caption style={{ textAlign: 'center', padding: '20px', borderRadius: '10px' }} className='text-light'>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>"Inspire giving, ignite process"</p>
          </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item className=' max-vh-10'>
        <div className="d-flex justify-content-center">
          <Image src="/images/plantatree.jpg" className='mx-auto' style={{ height: '50vh', width: 'auto' }} />
          <Carousel.Caption style={{ textAlign: 'center', padding: '20px', borderRadius: '10px' }} className='text-light'>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>"Donate Today, Shape Tomorrow"</p>
          </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item >
        <div className="d-flex justify-content-center">
          <Image src="/images/womenmarch.jpg" className='mx-auto' style={{ height: '50vh', width: 'auto' }} />
          <Carousel.Caption style={{ textAlign: 'center', padding: '20px', borderRadius: '10px' }} className='text-light'>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>"Transforming lives Together"</p>
          </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item className=' max-vh-10'>
        <div className="d-flex justify-content-center">
          <Image src="/images/artcampaign.jpg" className='text-center' style={{ height: '50vh', width: 'auto'}} />
          <Carousel.Caption style={{ textAlign: 'center', padding: '20px', borderRadius: '10px' }} className='text-light'>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>"Building Hope, Sparking Change"</p>
          </Carousel.Caption>
          </div>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default Home;
