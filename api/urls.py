from django.urls import path, reverse_lazy, include

from api import views as m_views
from rest_framework.routers import DefaultRouter
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt import views as jwt_views

from rest_framework.authtoken import views

schema_view = get_schema_view(title='Pastebin API')
# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'product', m_views.ProductViewSet)
router.register(r'image', m_views.ImageViewSet)

urlpatterns = [
    path('schema/', schema_view),
    path('api-token-auth/', views.obtain_auth_token),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('docs/', include_docs_urls(title='My API service')),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
