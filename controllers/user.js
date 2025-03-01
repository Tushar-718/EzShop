import jwt from "jsonwebtoken";
import User from "../models/user.js";

const generateTokens = (user) => {
    // Grants access to protected resources (e.g., APIs, databases).
    // Typically used in Authorization Headers
    const accessToken = jwt.sign(
        { userId: user?._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "2D" }
    );

    // When the access token expires, the refresh token is sent to get a new one.
    // A new access token is issued without requiring login.
    // Longer lifespan
    const refreshToken = jwt.sign(
        { userId: user?._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7D" }
    );

    return { accessToken, refreshToken }

}


const loginOrSignUp = async (req, res) => {
    const { phone, address } = req.body;
    try {
        let user = await User.findOne({ phone })
        if (!user) {
            // if user not found
            // create a new entry
            user = new User({ address, phone })
            await user.save()
        } else {
            // if user already exist 
            // update address from same API
            user.address = address;
            await user.save()
        }

        // this function is use to generate token so that user can communicate with backend for protected route calls
        const { accessToken, refreshToken } = generateTokens(user.toObject());

        res.status(200).json({
            user,
            accessToken,
            refreshToken
        })

    } catch (error) {
        console.log("error while login/signup : ", error)
        res.status(500).json({ error: error.message })
    }
}

export { loginOrSignUp };