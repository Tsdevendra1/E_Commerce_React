from django.contrib import admin

# Register your models here.
from main.models import Product, ProductCategories, Image

admin.site.register(Product)
admin.site.register(Image)
admin.site.register(ProductCategories)
