const uploadImage = async(req,res) => {
  const file = req.file

  //console.log('999999999999999999999999',file)
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  // res.send()
  return res.status(200).json({
    status: 200,
    message: 'Tập tin đã tải lên thành công',
    path: process.env.APP_PATH + "/images/" + req.body.fileName,
    url: process.env.APP_URL + "/images/" + req.body.fileName,
    file_name: req.body.fileName,
    type: file.mimetype
});
}

module.exports = {
  uploadImage
};