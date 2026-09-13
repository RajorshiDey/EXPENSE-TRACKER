const Expense = require('../models/expense.model');

const createExpense = async(expenseData) =>{
    return await new Expense(expenseData).save();
}

const findExpensesByUser = async(userId) =>{
    return await Expense.find({user:userId}).sort({date:-1});
}

const findExpenseById = async(expenseId, userId) =>{
    return await Expense.findOne({_id:expenseId, user:userId});
}

const updateExpense = async(expenseId, userId, updateData) =>{
    return await Expense.findOneAndUpdate({_id:expenseId, user:userId}, updateData, {new:true});
}

const deleteExpense = async(expenseId, userId) =>{
    return await Expense.findOneAndDelete({_id:expenseId, user:userId});
}

module.exports = {
    createExpense,
    findExpensesByUser,
    findExpenseById,
    updateExpense,
    deleteExpense
}
