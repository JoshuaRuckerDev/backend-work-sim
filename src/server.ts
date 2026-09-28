import express from "express";
import { supabase } from "./config/supabaseClient.js";

const app = express();

app.use(express.json());

app.get("/products", async (req, res) => {
    const { data, error } = await supabase
        .from("products")
        .select();

    if (error) {
       return res.status(500).json({error: error.message});
    }

    res.json(data);
});

app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
   
    const { data, error } = await supabase
    .from("products")
    .select()
    .eq("id", id)
    .single();

    if (error) {
        return res.status(404).json({error: error.message});
    }

    res.json(data);
});

app.post("/products", async (req, res) => {
    const newProduct = req.body;

    const { data, error } = await supabase
    .from("products")
    .insert(newProduct)
    .select();

    if (error) {
        return res.status(500).json({error: error.message});
    }

    res.status(201).json(data);
});

app.put("/products/:id", async (req, res) => {
    const { id } = req.params;

    const updateProduct = req.body;

    const { data, error } = await supabase
    .from("products")
    .update(updateProduct)
    .eq("id", id)
    .select()
    .single();

    if (error) {
    return res.status(404).json({ error: error.message });
    }

    res.json(data);
});

app.delete("/products/:id", async (req, res) => {
    const { id } = req.params;


    const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)
    .select()
    .single();

    if (error) {
        return res.status(404).json({error: error.message});
    }

    res.json({ message: "Product deleted successfully" });

})

app.listen(3001, () => console.log("Server running on port: 3001"));
