from django.urls import path

from main import views as m_views
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.auth import views as auth_views

urlpatterns = [
                  path('', m_views.HomePageView.as_view(), name='home'),
                  path('products/', m_views.ProductPageView.as_view(), name='products'),
                  path('accounts/login/', auth_views.LoginView.as_view(template_name='')),
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
