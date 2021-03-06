from django.contrib.auth.models import User
from django.db import models

# Create your models here.
from django.template.defaultfilters import slugify
# from django_common.auth_backends import User


class ProductCategories(models.Model):
    name = models.CharField(max_length=256)

    def __str__(self):
        return self.name


class Product(models.Model):
    product_owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    product_name = models.CharField(blank=False, null=False, max_length=75)
    product_type = models.ForeignKey(ProductCategories, on_delete=models.CASCADE)
    price = models.PositiveIntegerField(verbose_name='Price (£) ')
    description = models.CharField(blank=False, null=False, max_length=256)
    thumbnail = models.ImageField(upload_to='main/images/', help_text='This will be the thumbnail shown to customers')


def get_image_filename(instance, filename):
    title = instance.product.product_name
    slug = slugify(title)
    return "main/images/{}-{}".format(slug, filename)


class Image(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    picture = models.ImageField(upload_to=get_image_filename,
                                verbose_name='Picture', help_text='This will be displayed on the product page')
