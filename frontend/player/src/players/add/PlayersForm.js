import { useForm } from "react-hook-form";
import "./PlayersForm.css";
import Config from "../../config";

const PlayersForm = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        fetch("/team/players", {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": Config.token,
            },
            method: "POST",
            body: JSON.stringify(data),
        })
        .then((response) => {
            if (response.ok){
                return response.json();
            } else {
                alert ("Player duplicate");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };

    const buildPlayers = data => {
        return {...data}
    };

    return (
        <>
        <h2>PlayersForm</h2>
        <form className="playerForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
                <label>Name:</label>
                <input name="name" {...register("name")} />
            </div>
            <div className="field">
                <label>Last Name:</label>
                <input name="lastName" {...register("lastName")} />
            </div>
            <input className="submit" type="submit" />
        </form>
        </>
    );
};

export default PlayersForm;
