from audioop import ulaw2lin
from email.mime import image
from urllib import response
from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from base.models import Category
from .serializers import ProductSerializer, CategoriesSerializer, OrderSerializer,OrderDetailSerializer
from rest_framework.views import APIView

from base.models import Profile
from django.contrib.auth.models import User
# Create your views here.
from django.http import JsonResponse
from base.models import Product
from base.models import Order
from base.models import Order_det
from base.models import Profile

def index(req):
    return JsonResponse('hello', safe=False)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['staff'] = user.is_staff
        token['firstName'] = user.first_name
        token['lastName'] = user.last_name
        # ...
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/token',
        '/token/refresh',
    ]
    return Response(routes)


@permission_classes([IsAdminUser])
@api_view(['POST'])
def register(request):
        print("admin")
        user=User.objects.create_user(
            username=request.data["username"],
            password=request.data["password"],
            is_staff=request.data["staff"])
        print(request.data["password"])
        print(request.data["username"])
        return Response("routes")
    
@api_view(['POST'])
def registerClient(request):
        # print("not admin")
        user=User.objects.create_user(
            username=request.data["username"],
            password=request.data["password"],
            email=request.data["email"])
        return Response("not ")

# updating user details for payment before checkout
@api_view(['PUT', 'GET','POST'])
# @permission_classes([IsAuthenticated])
def updateUserCheckout(request,id=0):
    
                                    # User address details  
    userBirth=request.data["userBirth"]
    uCity=request.data["uCity"]
    uStreetNumber=request.data["uStreetNumber"]
    uMobilePhone=request.data["uMobilePhone"]
    uZipCode=request.data["uZipCode"]
    uFirstName=request.data["uFirstName"]
    uLastName=request.data["uLastName"]
    
    temp=User.objects.get(pk=id)
    temp.first_name=uFirstName
    temp.last_name=uLastName
    temp.save()
    # myprods=Product.objects.all()
    profTemp=Profile.objects.all()
    print("length of profiles:",len(profTemp))
    for x in profTemp:
        print(x)
        if x.user_id==temp.id:
            foundProfile=Profile.objects.get(user_id=id)
            # foundProfile.user_id=int(temp.id),
            foundProfile.birth_date=userBirth
            foundProfile.userCity=uCity
            foundProfile.userStreetNumber=uStreetNumber
            foundProfile.userMobile=uMobilePhone
            foundProfile.userZipCode=uZipCode
            foundProfile.save()
            print("there is a match!")
    for x in profTemp:
        print(x)
        if x.user_id!=temp.id:
            print("there is NOOO  match!")
            Profile.objects.create (
            user_id=temp.id,
            birth_date=userBirth,
            userCity=uCity,
            userStreetNumber=uStreetNumber,
            userMobile=uMobilePhone,
            userZipCode=uZipCode)
            x.save()

@api_view(['PUT', 'GET','POST'])
# @permission_classes([IsAuthenticated])
def updateUserPaymentDetails(request,id=0):
    uCreditCard=request.data["uCreditCard"]
    uNameOnCard=request.data["uNameOnCard"]
    uCcv3digit=request.data["uCcv3digit"]
    uCardExp=request.data["uCardExp"]

    temp=User.objects.get(pk=id)
    profTemp=Profile.objects.all()

    for x in profTemp:
        print(x)
        if x.user_id==temp.id:
            foundProfile=Profile.objects.get(user_id=id)
            foundProfile.userCreditCardNumber=uCreditCard
            foundProfile.userNameOnCreditCard=uNameOnCard
            foundProfile.userCreditCard3Digit=uCcv3digit
            foundProfile.userCreditCardExpiryDate=uCardExp
            foundProfile.save()
            print("there is a match!")
    return Response("product added")
        
                # *****AALTERNATIVE CREATE PRODUCT FOR IMAGE UPLOAD EXPERIMENT  ******
class Create_new_product(APIView):
    permission_classes = [IsAuthenticated]
    parser_class = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        print(request.user)
        print(request.data)
        if request.user.is_staff == True:
            new_product_serializer = ProductSerializer(data=request.data)
            if new_product_serializer.is_valid():  
                new_product_serializer.save()
                products = Product.objects.all()
                serializer = ProductSerializer(products, many=True)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                print('error', new_product_serializer.errors)
                return Response(new_product_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
            #**************************      *******************************************

# @api_view(['POST'])
# # @permission_classes([IsAdminUser])
# def addProduct(request):
#     user = request.user
#     product1=Product()
#     descrp = request.data["descrp"]
#     priceee=request.data["priceee"]
#     categorr=request.data["categorr"]
#     # myBackImage=request.data["myBackImage"]
#     # print(myBackImage)
#     if request.user.is_staff:
#         Product.objects.create(
#             user=user,
#             prod_desc=descrp,
#             prod_price=priceee,
#             image= request.FILES.get('myBackImage'),
#             catg_id=Category.objects.get(catg_id=categorr))
#         return Response("product added")

@api_view(['GET'])
def getProducts(request,id=0):
    if int(id) > 0:
        products= Product.objects.filter(catg_id=int(id))
    else:
        products= Product.objects.all()
    serializer = ProductSerializer(products,many=True)
    return Response(serializer.data)

@api_view(['DELETE', 'GET'])
# @permission_classes([IsAdminUser])
def deleteProduct(request,id=0):
    if request.user.is_staff:
        temp= Product.objects.get(_id=id)
        print(temp)
        temp.delete()
        return Response("product deleted")

@api_view(['PUT', 'GET'])
# @permission_classes([IsAdminUser])
def updateProduct(request,id=0):
    if request.user.is_staff:
        temp= Product.objects.get(_id=id)
        print(temp)
        temp.prod_price =request.data['price']
        temp.save()
        products=Product.objects.all()
        serializer = ProductSerializer(products,many=True)
        return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addCategory(request):
    if request.user.is_staff:
        cDescrp = request.data["cDescrp"]
        Category.objects.create(
            cat_desc=cDescrp
        )
        print(request.data["cDescrp"])
        return Response("category added")

@api_view(['DELETE', 'GET'])
# @permission_classes([IsAdminUser])
def deleteCategory(request,id=0):
    if request.user.is_staff:
        temp= Category.objects.get(catg_id=id)
        print(temp)
        temp.delete()
        return Response("category deleted")

@api_view(['GET'])
def getCategories(request):
    categories = Category.objects.all()
    serializer = CategoriesSerializer(categories, many=True)
    return Response(serializer.data)
    
# @api_view(['POST'])
# def update_profile(request, user_id):
#     user = User.objects.get(pk=user_id)
#     user.birth_date=request.data["birthdate"],
#     user.userCity=request.data["usercity"],
#     user.userStreetNumber=request.data["userstreetnumber"],
#     user.userMobile=request.data["usermobile"],
#     user.userCreditCardNumber=request.data["usercreditcardnumber"],
#     user.userCreditCard3Digit=request.data["usercreditcard3digit"],
#     user.userCreditCardExpiryDate=request.data["usercreditcardexpirydate"],
#     user.save()
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrder(request):
    print("mycart items request data",request.data)
    user=request.user
    cartProds = request.data["cartProds"]
    subtotal=request.data["subtotal"]
    discount=request.data["discount"]
    orderTotal=request.data["orderTotal"]
    # create a single order
    newOrder= Order.objects.create(user_id_id=request.user.id,total=float(orderTotal))
    # create new order details
    for x in cartProds:
        newProd=Product.objects.get(_id= x["Product_ID"])
        Order_det.objects.create(
            order_id=newOrder, 
            prod_id=newProd,
            prod_quantity=x["Product_quantity"],
            order_subtotal=float(subtotal),
            order_discount=float(discount),
            order_total=float(orderTotal))

    return Response("order was made successfully")

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrders(request):
    user=request.user
    myOrders = Order.objects.all()
    tempMyOrders=[]
    for x in myOrders:
        if x.user_id_id== user.id:
            tempMyOrders.append(x)
    orderSerializer = OrderSerializer(tempMyOrders,many=True)
    return Response(orderSerializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderDetails(request):
    user=request.user
    myOrders = Order.objects.all()
    myOrderDetails=Order_det.objects.all()
    tempMyOrderDetails=[]
    for x in myOrders:
        if x.user_id_id== user.id:
            for y in myOrderDetails:
                if y.order_id_id== x._id:
                    tempMyOrderDetails.append(y)
    orderDetailSerializer = OrderDetailSerializer(tempMyOrderDetails,many=True)
    return Response(orderDetailSerializer.data)

