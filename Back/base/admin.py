from django.contrib import admin
from base.models import Order, Order_det
from base.models import Profile
from base.models import Product
from base.models import Category

# Register your models here.
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Profile)
admin.site.register(Order)
admin.site.register(Order_det)





