import { response } from 'express';
import Account from '../models/Account.js';

const getAccountSettings = async(req, res = response) => {
    const { userId } = req.params;

    try {
        let accountSettings = await Account.findOne({ userId });


    if (!accountSettings) {
        accountSettings = new Account({ userId, items: [] });
    }

    await accountSettings.save()


    return res.status(200).json({
        message: "Account settings charge",
        accountSettings
    });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }

}

const updateAccountSettings = async (req, res = response) => {
    const { userId } = req.params;
    const { birthdate, country, city, zip } = req.body;

    try {
        let accountSettings = await Account.findOne({ userId });

        if (!accountSettings) {
            return res.status(404).json({
                message: "Account settings not found."
            });
        }

        const itemToUpdate = accountSettings.items[0]; 

        if (itemToUpdate) {
            itemToUpdate.birthdate = birthdate || itemToUpdate.birthdate;
            itemToUpdate.country = country || itemToUpdate.country;
            itemToUpdate.city = city || itemToUpdate.city;
            itemToUpdate.zip = zip || itemToUpdate.zip;
        } else {
            accountSettings.items.push({
                birthdate,
                country,
                city,
                zip,
            });
        }

        // Guardar los cambios
        await accountSettings.save();

        return res.status(200).json({
            message: "Account settings updated successfully.",
            accountSettings
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


export {
    getAccountSettings,
    updateAccountSettings,
}

