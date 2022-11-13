"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from django.conf.urls.static import static
from django.conf import settings

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
     path('', views.getRoutes),
     path('register/', views.register),
     path('registerclient/', views.registerClient),
     path('updateusercheckout/<id>', views.updateUserCheckout),
     path('updateuserpaymentdetails/<id>', views.updateUserPaymentDetails),
     path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
     path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    #  path('addproduct/', views.addProduct, name='products'),
     path('getproducts/<id>', views.getProducts),
     path('getproducts/', views.getProducts),
     path('deleteproduct/<id>', views.deleteProduct),
     path('updateproduct/<id>', views.updateProduct),
     path('addcategory/', views.addCategory),
     path('addorder/', views.addOrder),
     path('getorders/', views.getOrders),
     path('getorderdetails/', views.getOrderDetails),
     path('deletecategory/<id>', views.deleteCategory),
     path('categories/', views.getCategories),
     # ********************* PRODUCT ADD WITH IMAGE UPLOAD  ************************
     path('addproduct/', views.Create_new_product.as_view()),
     # ********************* PRODUCT ADD WITH IMAGE UPLOAD  ************************
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


