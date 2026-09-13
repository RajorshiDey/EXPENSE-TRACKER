const expenseService = require('../services/expenseService');

const createExpense = async(req, res) => {
    try{
        console.log("REQ.USER:", req.user);
        console.log("USER ID:", req.user?.userId);
        console.log("REQUEST BODY:", req.body);
        const {amount, date, category, description} = req.body;

        if(!amount || !date || !category || !description){
            return res.status(400).json({message:'All fields are required'});
        }

        const expenseData = {
            amount, 
            date, 
            category, 
            description
        };

        const expense = await expenseService.createExpense(
            req.user.userId, 
            expenseData
        );

        return res.status(201).json({
            success: true,
            message: "Expense created successfully",
            expense
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:'Server error'});
    }
}

const getExpenses = async(req, res) => {
    try{
        const expenses = await expenseService.getExpensesByUser(req.user.userId);
        return res.status(200).json({
            success: true,
            expenses
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:'Server error'});
    }
}

const getExpense = async(req, res) => {
    try{

        const expense = await expenseService.getExpenseById(
            req.params.id,
            req.user.userId
        );

        return res.status(200).json({
            success: true,
            expense
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({message:'Server error'});
    }
}

const updateExpense = async(req, res) => {
    try{
        const {amount, date, category, description} = req.body;

        const updateData = {
            amount, 
            date, 
            category, 
            description
        };

        const expense = await expenseService.updateExpense(
            req.params.id,
            req.user.userId,
            updateData
        );

        return res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            expense
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:'Server error'});
    }
}

const deleteExpense = async(req, res) => {
    try{
        await expenseService.deleteExpense(
            req.params.id,
            req.user.userId
        );
        return res.status(200).json({
            success: true,
            message: "Expense deleted successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:'Server error'});
    }
}

module.exports = {
    createExpense,
    getExpenses,
    getExpense,
    updateExpense,
    deleteExpense
}