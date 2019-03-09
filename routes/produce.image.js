var index = 0;
module.exports = {
        destination: `public/uploads/`,
        filename: function ( req, file, cb ) {
        	let typeFile = file.originalname.split(".")[file.originalname.split(".").length-1];
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, `${index++}_${req.body['Ngày']}.jpg`);
        }
    }