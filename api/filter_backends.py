from django_filters import rest_framework as filters

from main.models import Product, Image, ProductCategories


class ProductFilter(filters.FilterSet):
    product_type = filters.ModelMultipleChoiceFilter(queryset=ProductCategories.objects.all())
    product_name = filters.CharFilter(lookup_expr='icontains')

    # product_owner = filters.ModelChoiceFilter(queryset=User.objects.all())

    class Meta:
        model = Product
        fields = ['price', 'product_owner', 'product_type']


class ImageFilter(filters.FilterSet):
    class Meta:
        model = Image
        fields = ['product']


class ProductCategoriesFilter(filters.FilterSet):
    class Meta:
        model = ProductCategories
        fields = ['name']
