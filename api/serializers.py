from rest_framework import serializers
from main.models import Product


class ProductSerializer(serializers.ModelSerializer):
    product_owner = serializers.ReadOnlyField(source='product_owner.username')

    class Meta:
        model = Product
        fields = ['product_name', 'product_type', 'price', 'description', 'thumbnail', 'product_owner']
