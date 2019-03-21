from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from api.permissions import IsOwnerOrReadOnly
from api.filter_backends import ProductFilter, ImageFilter, ProductCategoriesFilter
from .serializers import *
from rest_framework import permissions
from django_filters import rest_framework as filters
from rest_framework.filters import SearchFilter, OrderingFilter
from main.models import ProductCategories


# Create your views here.
class ProductViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)
    filter_backends = (filters.DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_class = ProductFilter

    def perform_create(self, serializer):
        list_of_images = []
        for image_name, image_file in self.request.FILES.items():

            # Data has to be in this format to save to the serializer
            image_data = {'picture': image_file}

            # The thumbnail is checked by the ProductSerializer
            if image_name != 'thumbnail':
                product_image_serialiser = ProductImageSerializer(data=image_data)
                if product_image_serialiser.is_valid():
                    list_of_images.append(product_image_serialiser)
                else:
                    return Response(product_image_serialiser.errors)

        product_instance = serializer.save(product_owner=self.request.user)
        for image in list_of_images:
            image.save(product=product_instance)

    @action(detail=False)
    def product_type_count(self, request):
        type_count = {}
        product_types = ProductCategories.objects.all()
        for product_type in product_types:
            type_count[product_type.name] = {'amount':product_type.product_set.all().count(), 'id':product_type.id}
        return Response(type_count)


# Create your views here.
class ImageViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = Image.objects.all()
    serializer_class = ProductImageSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)
    filter_backends = (filters.DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_class = ImageFilter

    def perform_create(self, serializer):
        product_object = Product.objects.get(pk=self.request.data['product'])
        serializer.save(product=product_object)


class ProductCategoriesViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = ProductCategories.objects.all()
    serializer_class = ProductCategoriesSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)
    filter_backends = (filters.DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_class = ProductCategoriesFilter
