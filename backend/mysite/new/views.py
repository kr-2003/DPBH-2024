import json
from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Consumer, Company, Pending, Approved, Website
from datetime import date
# Create your views here.
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt 
def home(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        print(date.today())
        customer = Consumer.objects.get(name=body['name'])
        pending = Pending(customer=customer, review_date=date.today(), website_name=body['website_name'], review_description=body['review_description'])
        # pending = Pending(customer=Consumer(name=request.POST['name']), review_date=, website_name=request.POST['website_name'], review_description=request.POST['review_description'])
        pending.save()
        return HttpResponse("success")

    return HttpResponse("hello")