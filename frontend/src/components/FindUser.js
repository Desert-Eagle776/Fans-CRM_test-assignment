import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function FindUser() {
  const { id } = useParams();
  const token = localStorage.getItem('token');

  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/get-user/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div>
      {user ? (
        <div>
          <h1>Дані користувача:</h1>
          <p><strong>Ім'я:</strong> {user.name}</p>
          <p><strong>Пошта:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Завантаження...</p>
      )}
    </div>
  );
}

export default FindUser;