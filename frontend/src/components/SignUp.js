import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function SignUp(props) {
  const { setIsLoggedIn } = props

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errrorMessage, setErrorMessage] = useState('')
  const [response, setResponse] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const form = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    };
    const { data } = await axios.post("http://localhost:5000/api/v1/add-user", form);
    if (data.status !== parseInt('201')) {
      setErrorMessage(data.response)
    } else {
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true)
      setIsSubmitted(true)

      setResponse(data);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      setTimeout(() => {
        navigate(`/api/v1/get-user/${response.user.id}`);
      }, 1000);
    }
  }, [isSubmitted, navigate]);

  if (isSubmitted) {
    return <p>Реєстрація пройшла успішно! Дякуємо!</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Введіть своє ім'я:
        <input type="text" name="name" />
      </label>
      <label>
        Введіть свою пошту:
        <input type="email" name="email" />
      </label>
      <label>
        Введіть свой пароль:
        <input type="password" name="password" />
      </label>
      <input type="submit" value="Надіслати" />
    </form>
  )
}

export default SignUp;