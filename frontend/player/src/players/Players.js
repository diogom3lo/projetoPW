import Player from './PlayerTable';
import './Players.css';
import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import PlayerForm from './add/PlayersForm';
import ProductForm from './add/ProductForm';
import config from '../config'; 
import PlayerTable from './PlayerTable';

const Players = () => {
    let navigate = useNavigate();
    let location = useLocation();
    const [showForm, setShowForm] = useState(false);
    const [showFormProduct, setShowFormProduct] = useState(false);
    const [userLogged, setUserLogged] = useState(true);

    const OnClickLogout = () => {
        fetch('/auth/logout', {
            headers: { 'Accept': 'application/json'}
        })
        .then((response) => response.json())
        .then((response) => {
            if(response.logout){
                setUserLogged(false);
            }
        })
        .catch(() => {
            setUserLogged(false);
        })
    }

    useEffect(() => {
        fetch('/auth/me', {
            headers: { 'Accept': 'application/json'}
        })
        .then((response) => response.json())
        .then((response) => {
            setUserLogged(response.auth);
        })
        .catch(() => {
            setUserLogged(false);
        })
    }, [])

    const OnClickShowFormProduct = () => {
        setShowFormProduct(!showFormProduct);
    }

    const OnClickShowForm = () => {
        setShowForm(!showForm);
    }

    const showFormMessage = showForm ? "Hide Form" : "Show Form";
    const showFormProductMessage = showFormProduct ? "Hide" : "Show Form Product";


if(!userLogged){
    navigate('/');
}

    

    return (
        <div className='players'>
            <div className='links'>
                <Link to="/">HomePage</Link>
                <button className='buttons' onClick={OnClickShowForm}>
                    {showFormMessage}
                </button>
                <button className='buttons' onClick={OnClickShowFormProduct}>
                    {showFormProductMessage}
                </button>
                <button className="buttons" onClick={OnClickLogout}> Logout </button>
            </div>
            <label>Produtos:</label>
            <div className='player-container'>
                <PlayerTable url={location} />
            </div>
            {showForm && <PlayerForm />}
            {showFormProduct && <ProductForm />}
        </div>
    );
}


export default Players;
