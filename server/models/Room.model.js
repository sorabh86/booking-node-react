import mongoose from "mongoose";

const RoomSchema= new mongoose.Schema({
    hotel_id:{type:String, required:true},
    title:{ type:String, required:true },
    description: { type:String, required: true },
    price: { type:Number, required:true },
    max_peoples: { type:Number, required:true },
    room_numbers: [
        {
            room_number:Number, 
            reserved_dates: {type:[Date]}
        }
    ]
});

export default mongoose.model("Room", RoomSchema);