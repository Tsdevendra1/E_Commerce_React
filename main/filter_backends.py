from django_filters import rest_framework as filters

from main.models import Product
from main.models import PRODUCT_TYPES


class ProductFilter(filters.FilterSet):
    product_type = filters.MultipleChoiceFilter(choices=PRODUCT_TYPES)

    class Meta:
        model = Product
        fields = ['price', 'product_owner', 'product_type']
