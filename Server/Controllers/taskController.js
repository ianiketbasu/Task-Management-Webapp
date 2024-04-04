import { catchAsyncError } from "../Middlewares/catchAsyncError.js";

export const createTask = catchAsyncError(async (req, res, next) => {});
export const deleteTask = catchAsyncError(async (req, res, next) => {});
export const updateTask = catchAsyncError(async (req, res, next) => {});
export const getMyTask = catchAsyncError(async (req, res, next) => {});
export const getSingleTask = catchAsyncError(async (req, res, next) => {});
