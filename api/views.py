from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from api.permissions import IsOwnerOrReadOnly
from main.filter_backends import ProductFilter
from .serializers import *
from rest_framework import permissions
from django_filters import rest_framework as filters
from rest_framework.filters import SearchFilter, OrderingFilter
from main.models import PRODUCT_TYPES


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
        serializer.save(product_owner=self.request.user)

    @action(detail=False)
    def product_type_count(self, request):
        type_count = {}
        for product_type in PRODUCT_TYPES:
            type_count[product_type[0]] = Product.objects.filter(product_type=product_type[0]).count()
        return Response(type_count)
