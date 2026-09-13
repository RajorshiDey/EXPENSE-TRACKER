const expenseRepository = require('../repositories/expenseRepository');

const createExpense = async(userId, expenseData) => {
    return await expenseRepository.createExpense(
        {
            ...expenseData, 
            user:userId
        }
    );
}

const getExpensesByUser = async(userId) => {
    return await expenseRepository.findExpensesByUser(userId);
}

const getExpenseById = async(expenseId, userId) => {
    return await expenseRepository.findExpenseById(expenseId, userId);
}

const updateExpense = async(expenseId, userId, updateData) => {
    return await expenseRepository.updateExpense(expenseId, userId, updateData);
}

const deleteExpense = async(expenseId, userId) => {
    return await expenseRepository.deleteExpense(expenseId, userId);
}

module.exports = {
    createExpense,
    getExpensesByUser,
    getExpenseById,
    updateExpense,
    deleteExpense
}