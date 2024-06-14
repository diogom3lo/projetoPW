import { useForm } from "react-hook-form";
import Config from "../../config";

const UsersForm = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        fetch(`http://localhost:9000/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": Config.token,
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('User registration failed');
            }
        })
        .then((data) => {
            console.log("Registration successful:", data);
            // Trate o sucesso aqui, como redirecionar para outra página
        })
        .catch((error) => {
            console.error("Error during registration:", error); // Loga o erro completo
            // Trate o erro aqui, como mostrar uma mensagem de erro para o usuário
        });
    };
    
    

    return (
        <>
        <h2>Users Form</h2>
        <form className="userForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
                <label>Email:</label>
                <input name="email" {...register("email")} />
            </div>
            <div className="field">
                <label>Name:</label>
                <input name="name" {...register("name")} />
            </div>
            <div className="field">
                <label>Password:</label>
                <input name="password" type="password" {...register("password")} />
            </div>
            <div className="field">
                <label>Role:</label>
                <select name="role.name" {...register("role.name")}>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    {/* Add other role options as needed */}
                </select>
            </div>
            <input className="submit" type="submit" value="Register User" />
        </form>
        </>
    );
};

export default UsersForm;
