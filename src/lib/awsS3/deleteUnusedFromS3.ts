import {
  DeleteObjectsCommand,
  ListObjectsV2Command,
  S3Client,
} from "@aws-sdk/client-s3";

const region = process.env.NEXT_AWS_S3_REGION;
const accessKeyId = process.env.NEXT_AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY;
const bucketName = process.env.NEXT_AWS_S3_BUCKET_NAME;

if (!region || !accessKeyId || !secretAccessKey || !bucketName) {
  throw new Error("Credential not found");
}

const s3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});

export const deleteUnusedFromS3 = async (
  directory: string,
  imagesArrString: string
) => {
  // list files in S3
  const listedObjects = await s3Client.send(
    new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: directory,
    })
  );

  if (
    !listedObjects.Contents ||
    listedObjects.Contents.length === 0 ||
    !imagesArrString
  )
    return;

  let imagesArr: { name: string; id: string }[];
  try {
    imagesArr = JSON.parse(imagesArrString);
  } catch {
    console.error("Invalid imagesArrString JSON");
    return;
  }

  const keysToKeep = imagesArr.map(
    (imageObj) => `${directory}/${imageObj.name}`
  );

  // console.log("keysToKeep", keysToKeep);

  const listedObjectsToDelete = listedObjects.Contents.filter(
    (item) => item.Key && !keysToKeep.includes(item.Key)
  );

  const deleteList = listedObjectsToDelete.map((item) => ({ Key: item.Key }));

  try {
    if (deleteList.length > 0) {
      const result = await s3Client.send(
        new DeleteObjectsCommand({
          Bucket: bucketName,
          Delete: {
            Objects: deleteList,
          },
        })
      );

      if (result.Deleted) {
        console.log(
          "Successfully deleted:",
          result.Deleted.map((obj) => obj.Key)
        );
      }
      if (result.Errors) {
        console.error("Failed to delete:", result.Errors);
      }
    }
  } catch (err) {
    console.error("Error deleting from S3:", err);
  }
};
