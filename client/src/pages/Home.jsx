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
    <Container style={{background:'#f2f2f2'}}>
       <div className="text-center">
        <h1 style={{ fontFamily: 'DM Serif Display'}}>Welcome to Unity Fund</h1>
        <p style={{ marginBottom: '4rem', marginTop: '4rem', fontSize: '18px',  lineHeight: '35px'}}>
          Explore our impactful campaigns, discover ways to make a difference, and join our
          community of changemakers. Together, we can create a world where compassion and
          generosity know no bounds.
        </p>
      </div>

      <Carousel style={{ maxWidth: '50vw', margin: 'auto', marginBottom: '20px'}}>
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
