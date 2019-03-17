from rest_framework import serializers
from main.models import Product, Image


class ImageRelationField(serializers.RelatedField):
    def to_representation(self, value):
        return str(value.picture.url)


class ProductSerializer(serializers.ModelSerializer):
    product_owner = serializers.ReadOnlyField(source='product_owner.username')
    images = ImageRelationField(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'product_name', 'product_type', 'price', 'description', 'thumbnail', 'product_owner', 'images']


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['picture']
