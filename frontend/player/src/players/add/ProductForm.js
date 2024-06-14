import React from "react";
import { useForm } from "react-hook-form";
import Config from "../../config";

const ProductForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        fetch(`http://localhost:9000/api/product`, {
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
                throw new Error('Failed to create product');
            }
        })
        .then((data) => {
            console.log("Product created successfully:", data);
            reset(); // Limpar o formulário após o envio bem-sucedido
            // Trate o sucesso aqui, como redirecionar para outra página ou atualizar a lista de produtos
        })
        .catch((error) => {
            console.error("Error creating product:", error); // Logar o erro completo
            // Trate o erro aqui, como mostrar uma mensagem de erro para o usuário
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h2>Product form</h2>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" {...register("name", { required: true })} />
                {errors.name && <span>This field is required</span>}
            </div>
            <div>
                <label htmlFor="number">Number:</label>
                <input type="number" id="number" {...register("number", { required: true })} />
                {errors.number && <span>This field is required</span>}
            </div>
            <div>
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" {...register("price", { required: true })} />
                {errors.price && <span>This field is required</span>}
            </div>
            <div>
                <label htmlFor="category">Category:</label>
                <input type="text" id="category" {...register("category", { required: true })} />
                {errors.category && <span>This field is required</span>}
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" {...register("description", { required: true })} />
                {errors.description && <span>This field is required</span>}
            </div>
            <div>
                <label htmlFor="image">Image:</label>
                <input type="text" id="image" {...register("image", { required: true })} />
                {errors.image && <span>This field is required</span>}
            </div>
            <div>
                <label htmlFor="rating">Rating:</label>
                <input type="number" id="rating" {...register("rating", { required: true })} />
                {errors.rating && <span>This field is required</span>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ProductForm;
