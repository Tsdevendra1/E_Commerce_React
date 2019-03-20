from django_filters import rest_framework as filters

from main.models import Product, Image
from main.models import PRODUCT_TYPES


class ProductFilter(filters.FilterSet):
    product_type = filters.MultipleChoiceFilter(choices=PRODUCT_TYPES)
    product_name = filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Product
        fields = ['price', 'product_owner', 'product_type']


class ImageFilter(filters.FilterSet):
    class Meta:
        model = Image
        fields = ['product']
