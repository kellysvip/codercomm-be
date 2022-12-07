import mongoose from "mongoose";


export const checkObjectId = (paramId:string) => {
   if (!mongoose.Types.ObjectId.isValid(paramId)) {
    throw new Error("Invalid ObjectId")
   }

    return true
}
