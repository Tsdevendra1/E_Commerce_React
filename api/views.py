from django.shortcuts import render
from django_common.auth_backends import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, viewsets

from api.permissions import IsOwnerOrReadOnly
from .serializers import *
from rest_framework import permissions
from url_filter.integrations.drf import DjangoFilterBackend
from django_filters import rest_framework as filters
from rest_framework.filters import SearchFilter, OrderingFilter


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
    filter_fields = ['price', 'product_owner', 'product_type']

    def perform_create(self, serializer):
        serializer.save(product_owner=self.request.user)
