from django_common.auth_backends import User
from rest_framework import serializers
from main.models import Product, Image, ProductCategories


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


class ProductCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategories
        fields = ['id', 'name']


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']
        user_obj = User(username=username,
                        email=email)
        user_obj.set_password(password)
        user_obj.save()
        return validated_data
