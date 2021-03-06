// Libraries
import express from "express";
import passport from "passport";

// Database Model
import { QuespaperModel } from "../../Database/allModels";

const Router = express.Router();

/* 
    Route:          /new
    Description:    Post question paper
    Params:         none
    Access:         Private
    Method :        POST
*/
Router.post("/new", passport.authenticate("jwt"), async (req, res) => {
    try {
        const { paperData } = req.body;
        const newPaper = await QuespaperModel.create(paperData);
        return res.json({ papers: newPaper });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/* 
    Route:          /:_id
    Description:    Get question paper based on id 
    Params:         id
    Access:         Public
    Method :        GET
*/
Router.get("/:_id", async (req, res) => {
    try {
        const {_id} = req.params;
        const papers = await QuespaperModel.findById(_id)

        return res.json({papers});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;