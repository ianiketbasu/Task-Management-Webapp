import { catchAsyncError } from "../Server/Middlewares/catchAsyncError";

export const register = catchAsyncError((req, res, next) => {});
export const login = catchAsyncError((req, res, next) => {});
export const logout = catchAsyncError((req, res, next) => {});
export const myProfile = catchAsyncError((req, res, next) => {});
