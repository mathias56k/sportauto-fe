import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex justify-center mt-8'>
        <Link to="/">
            <img className='w-48' src="../public/test.png" alt="" />
        </Link>
    </div>
  );
};

export default Navbar;
