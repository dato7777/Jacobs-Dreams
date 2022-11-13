from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

class Category(models.Model):
            catg_id=models.AutoField(primary_key=True,editable=False)
            cat_desc = models.CharField(max_length=50,null=True,blank=True)
            
            fields =['catg_id','cat_desc']
            def __str__(self):
                return self.cat_desc

class Product(models.Model):
            _id=models.AutoField(primary_key=True,editable=False)
            user =models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
            prod_desc = models.CharField(max_length=50,null=True,blank=True)
            prod_price = models.DecimalField(max_digits=5,decimal_places=2)
            catg_id = models.ForeignKey(Category,on_delete=models.SET_NULL,null=True)
            createdTime=models.DateTimeField(auto_now_add=True)
            image = models.ImageField(default='/placeholder.png', upload_to='images')
            
            fields =['_id','prod_desc','prod_price', 'cat_desc', 'catg_id', 'image']
            def __str__(self):
                return self.prod_desc

class Profile(models.Model):
    user = models.OneToOneField(User, unique=True,  on_delete=models.CASCADE)
    birth_date = models.CharField(null=True, max_length=20,blank=True)
    userCity = models.CharField(max_length=20, blank=True)
    userStreetNumber = models.CharField(max_length=30, blank=True)
    userMobile = models.CharField(max_length=20, blank=True)
    userZipCode = models.CharField(max_length=20, blank=True)
    userCreditCardNumber = models.CharField(max_length=20, blank=True)
    userNameOnCreditCard = models.CharField(max_length=30, blank=True)
    userCreditCard3Digit = models.CharField(max_length=3, blank=True)
    userCreditCardExpiryDate = models.CharField(max_length=3, blank=True)
    fields =['_id','birth_date','userCity', 'userStreetNumber', 'userMobile', 'userZipCode','userCreditCardNumber', 'userCreditCard3Digit', 'userCreditCardExpiryDate' ]
    # def __str__(self):
    #     return f'{self.birth_date}'

class Order(models.Model):
    _id=models.AutoField(primary_key=True,editable=False)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    createdTime=models.DateTimeField(auto_now_add=True)
    total = models.FloatField()

class Order_det(models.Model):
    _id=models.AutoField(primary_key=True,editable=False)
    order_id =models.ForeignKey(Order, on_delete=models.CASCADE, null=True)
    prod_id =models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
    prod_quantity= models.IntegerField()
    order_subtotal= models.FloatField()
    order_discount= models.FloatField()
    order_total = models.FloatField() 
    



