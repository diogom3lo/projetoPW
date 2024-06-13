import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = (data) => login(data);

    const login = (data) => {
        fetch("/auth/login", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            }),
        })
        .then((r) => {
            if (!r.ok) {
                return r.json().then((error) => { throw new Error(error.message || 'Login failed'); });
            }
            return r.json();
        })
        .then((response) => {
            if (response.auth) {
                localStorage.setItem('token', response.token); // Store the token
                setLoginSuccess(true);
            } else {
                setErrorMessage("Login failed");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            setErrorMessage(error.message);
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
            {errorMessage && <p className="error">{errorMessage}</p>}
            <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label>Email:</label>
                    <input
                        type="email"
                        {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                </div>
                <div className="field">
                    <label>Password:</label>
                    <input
                        type="password"
                        {...register("password", { required: "Password is required" })}
                    />
                    {errors.password && <p className="error">{errors.password.message}</p>}
                </div>
                <input className="button" type="submit" value="Login" />
            </form>
        </div>
    );
};

export default LoginForm;
