from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView


class HomePageView(TemplateView):
    template_name = 'main/homepage.html'

    # def get(self, request, *args, **kwargs):
        # for user in User.objects.all():
        #     Token.objects.get_or_create(user=user)
        # return super().get(request, *args, **kwargs)


