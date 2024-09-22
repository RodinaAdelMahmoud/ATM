import accountModel from "../../../db/models/account.model.js"
import userModel from "../../../db/models/user.model.js";
import { AppError } from "../../../utils/classError.js";
import { asyncHandler } from '../../../utils/globalErrorHandler.js';
import transactionModel from './../../../db/models/transaction.model.js';


// =========================createAccount=========================================

export const createAccount = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const existingAccount = await accountModel.findOne({ userId: id });
    
    existingAccount && next(new AppError("Account already exists", 409))

    const user = await userModel.findOne({ _id: id });
    if (!user) {
        return next(new AppError("User not found", 404));
    }

    const newAccount = new accountModel({ userId: id });

    try {
        const savedAccount = await newAccount.save();
        res.status(201).json({ msg: "Account created successfully", user: savedAccount });
    } catch (error) {
        next(new AppError("Account not created", 400));
    }
});

// =========================deposit=========================================
export const deposit = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { amount } = req.body;

    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
        return next(new AppError("Invalid deposit amount", 400));
    }

    const account = await accountModel.findOne({ userId: id });
    if (!account) {
        return next(new AppError("Account not found", 404));
    }

    account.balance = parseFloat(account.balance) + depositAmount;
    await account.save();

    const transaction = new transactionModel({
        balance: depositAmount,
        operationType: 'deposit',
        userId: id,
        date: new Date()
    });

    await transaction.save();
    res.status(200).json({ msg: "done", balance: account.balance });
});


// =========================withdraw=========================================
export const withdraw = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { amount } = req.body;
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
        return next(new AppError("Invalid withdrawal amount", 400));
    }

    const account = await accountModel.findOne({ userId: id });
    if (!account) {
        return next(new AppError("Account not found", 404));
    }

    if (account.balance < withdrawAmount) {
        return next(new AppError("Insufficient funds", 400));
    }

    account.balance = parseFloat(account.balance) - withdrawAmount;
    await account.save();

    const transaction = new transactionModel({
        balance: -withdrawAmount,
        operationType: 'withdraw',
        userId: id,
        date: new Date()
    });

    await transaction.save();
    res.status(200).json({ msg: "done", balance: account.balance });
});


// =========================balance=========================================
export const balance = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const account = await accountModel.findOne({ userId: id });
    if (!account) {
        return next(new AppError("Account not found", 404));
    }

    const balance = parseFloat(account.balance);

    res.status(200).json({ msg: "done", balance: balance });
});

// =========================History=========================================
export const History = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const transactions = await transactionModel.find({ userId: id }).sort({ date: -1 });
    if (!transactions) {
        return next(new AppError("No transactions found", 404));
    }

    res.status(200).json({ msg: "done", transactions });
});
