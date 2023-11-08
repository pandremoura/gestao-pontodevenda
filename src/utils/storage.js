const aws = require('aws-sdk');
const endpoint = new aws.Endpoint('s3.us-east-005.backblazeb2.com')

const s3 = new aws.S3({
  endpoint,
  credentials: {
    accessKeyId: '005abbd6c224b9f0000000001',
    secretAccessKey: 'K005DEkNNyWj5a01HpI6GaAG1QrgmMY'
  }
})

const uploadFile = async (path, buffer, mimetype) => {

  const arquivo = await s3.upload({
    Bucket: 'devfusion',
    Key: path,
    Body: buffer,
    ContentType: mimetype
  }).promise()

  return {
    url: arquivo.Location,
    path: arquivo.Key
  }

}

const deleteFile = async (path) => {
  await s3.deleteObject({
    Bucket: 'devfusion',
    Key: path
  }).promise();
}

module.exports = {
  uploadFile,
  deleteFile
}