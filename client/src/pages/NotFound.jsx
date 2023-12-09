import { useNavigate } from 'react-router-dom';
import { Button} from 'react-bootstrap';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-4 p-5 bg-info text-white rounded">
    <h1>404 Page Not Found</h1>
    <p>
      <Button onClick={() => navigate('/')} className="btn btn-secondary">&larr; To UnityFund's Homepage </Button>
    </p>
  </div>
    
  );
};

export default NotFound;
