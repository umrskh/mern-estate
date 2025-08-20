import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      console.log('Signup success:', data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='pad-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up Page</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
        <input type="text" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg mt-4 uppercase hover:opacity-95'>
          {loading ? 'loading...' : 'Sign Up'}
        </button>
      </form>
      {error && <p className='text-red-500 text-center mt-4'>{error}</p>}
      <div className='text-center mt-4'>
        <p className='text-center mt-4'>Already have an account? </p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>signIn</span>
        </Link>
      </div>
    </div>
  )
}
