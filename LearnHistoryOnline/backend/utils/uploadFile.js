const fs = require('fs');
const path = require('path');

exports.uploadFile = async (file) => {
    if (!file) return false;
    
    const uploadDir = path.join(__dirname, '../uploads');
    const filePath = path.join(uploadDir, file.name);

    if (!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    await file.mv(filePath);

    return true;
};