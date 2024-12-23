import Order from "../models/Order.js";


const getOrders = async(req, res = response) => {
    const { userId } = req.params;

    try {
       let Orders = await Order.findOne({ userId });

       res.status(200).json({
        ok: true,
        msg: "Orders found",
        Orders
       });

    } catch (error) {
        res.status(500).json({ 
            ok: false, 
            msg: 'Error obtaining orders' 
        });
    }
};

// const addOrder = async(req, res = response) => {
//     const { userId, total, date, status } = req.params;


// }

export {
    getOrders,
}