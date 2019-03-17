from rest_framework import serializers
from main.models import Product


class ProductSerializer(serializers.ModelSerializer):
    product_owner = serializers.ReadOnlyField(source='product_owner.username')

    class Meta:
        model = Product
        fields = ['id', 'product_name', 'product_type', 'price', 'description', 'thumbnail', 'product_owner']

    # def to_representation(self, instance):
    #     """Remove the product_owner as they may not want to be shown with a product"""
    #     ret = super().to_representation(instance)
    #     del ret['product_owner']
    #     return ret
