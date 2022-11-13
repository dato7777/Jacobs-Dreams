from rest_framework.serializers import ModelSerializer
from base.models import Order, Order_det
from base.models import Category
from base.models import Product


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CategoriesSerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
class OrderSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
class OrderDetailSerializer(ModelSerializer):
    class Meta:
        model = Order_det
        fields = '__all__'
        
