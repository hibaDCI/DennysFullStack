import React, {useState} from "react";
import axios from "axios";
import "../login.css";
// import axios from "../utils/axiosConfig";
function Register() {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [userPic, setUserPic] = useState();
  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };
  const fileChange = (e) => {
    console.log(e.target.files);

    //! 2- target the files[0]
    setUserPic(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", user.fullname);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("confirm", user.confirm);
    formData.append("userPic", userPic);
    console.log(formData);
    try {
      //!3- used to specify the type of the formdata to be multipart
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post("/api/auth/signup", formData, config);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  //! we are using the other handleSubmit to upload the file
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);

  //   const data = {
  //     username: formData.get("username"),
  //     email: formData.get("email"),
  //     password: formData.get("password"),
  //   };

  //   try {
  //     const response = await axios.post("/api/auth/register", data);

  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="container-login ">
      <h3 className="heading">Funk Town Records. Get Down Tonight</h3>
        <p>Sign Up</p>

      <form className="login-form" action="" method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullname"
          id="fullname"
          placeholder="fullname"
          onChange={handleChange} 
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirm"
          id="confirm"
          placeholder="confirm password"
          onChange={handleChange}
        />
        {/* ! 1- to upload a file , add input with file type */}
        <input type="file" name="userPic" onChange={fileChange} />
        <button type="submit" className="button-login">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
