import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    const tokens = req.headers.authorization.split(" ")[1];

    const {refresh , access} = JSON.parse(tokens);

    if(refresh){
        const decodedData = jwt.verify(refresh , 'test');
        req.id = decodedData?.id;
    }else{
        res.status(400).json({message: 'User is not authorized'});
    }

    next();
}