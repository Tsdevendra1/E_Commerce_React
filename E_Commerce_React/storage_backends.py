from storages.backends.s3boto3 import S3Boto3Storage

from E_Commerce_React import settings


class MediaStorage(S3Boto3Storage):
    location = 'media'
    access_key = settings.AWS_ACCESS_KEY_ID
    secret_key = settings.AWS_SECRET_ACCESS_KEY
    bucket_name = settings.AWS_STORAGE_BUCKET_NAME
    file_overwrite = False
