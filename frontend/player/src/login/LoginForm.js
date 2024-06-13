import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
    let navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [loginSuccess, setLoginSuccess] = useState(false);

    const onSubmit = (data) => login(data);

    const login = (data) => {
        fetch("/auth/login", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(data),
        })
        .then((r) => r.json())
        .then((response) => {
            console.log(response);
            if (response.auth) {
                localStorage.setItem('token', response.token); // Store the token
                setLoginSuccess(true);
            } else {
                alert("Login failed");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };

    useEffect(() => {
        if (loginSuccess) {
            navigate("/players");
            console.log("Login successful, navigating to /players");
        }
    }, [loginSuccess, navigate]);

    return (
        <div className="loginform">
            <h2>Login Form</h2>
            <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label>Name:</label>
                    <input type="text" {...register("name")} />
                </div>
                <div className="field">
                    <label>Password:</label>
                    <input type="password" {...register("password")} />
                </div>
                <input className="button" type="submit" />
            </form>
        </div>
    );
};

export default LoginForm;
