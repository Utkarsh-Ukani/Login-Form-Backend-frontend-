import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login(){
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData((prevData) => {
            return {
              ...prevData,
              [name]: value,
            };
        });
      }

      const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/api/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(formData)
        })

        
    
        if(response.ok){
            navigate('/Welcome');
        }else{
            console.error('Error submitting the form to the server')
        }
    } catch (error) {
        console.error('Error sending data to the server:',error)
    }

  };

    return (

        <div id='main' className="h-screen flex items-center justify-center" >
          <form
            onSubmit={handleSubmit}
            className="bg-white bg-opacity-15 rounded-md p-5"
            style={{ border: '2px solid white' }}
          >
            <h1 className="p-3 text-center text-2xl text-white">SignIn</h1>
            <br />
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="m-2 p-0.5 rounded-md px-1"
              onChange={handleChange}
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="m-2 p-0.5 rounded-md px-1"
              onChange={handleChange}
            />
            <br />
            <div className="text-center">
              <button
                type="submit"
                className="m-3 bg-blue-500 py-0.5 text-center px-2.5 rounded-md border border-black hover:border-blue-800 hover:text-white"
              >
                Submit
              </button>
              <p className='text-white'>You want to Register?<br /><Link to="/">SignUp</Link></p>
            </div>
          </form>
        </div>
      );
}

export default Login;