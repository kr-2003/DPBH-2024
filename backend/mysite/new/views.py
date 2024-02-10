import json
from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Company, Pending, Approved, Website
from datetime import date
# Create your views here.
from django.views.decorators.csrf import csrf_exempt

MY_CHOICES = ((1, 'Basket Sneaking'),
               (2, 'Interface Interference'),
               (3, 'Nagging'),
               (4, 'False Urgency'),
               (5, 'Confirm Shaming'),
               (6, 'Subscription Tags'),
               (7, 'Forced Action'),
               (8, 'Disguised Ads'),
               (9, 'Bait and Switch'),
               (10, 'Other'))

@csrf_exempt 
def home(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        print(date.today())
        print(body)
        review_date = date.today()
        related_links = body['related_links']
        review_description = body['review_description']
        additional_comments = body['additional_comments']
        image = body['image']
        dark_patterns = body['dark_patterns']
        s = ""
        for(i, j) in MY_CHOICES:
            if j in dark_patterns:
                s+="1"
            else:
                s+="0"
        print(s)
        pending = Pending(review_date=review_date, related_links=related_links, review_description=review_description, additional_comments=additional_comments, image=image, dark_patterns=s)
        pending.save()
        return HttpResponse("success")

    return HttpResponse("hello")


@csrf_exempt
def index(request):
    if request.method =="POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        website = body['website']
        approved = Approved.objects.filter(related_links=website)
        arr = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        for i in approved:
            for j in range(10):
                arr[j] += int(i.dark_patterns[j])
        l = len(approved)
        for i in range(10):
            if l==0:
                arr[i] = 0.0
            else:
                arr[i] = arr[i]*100
                arr[i] = ((arr[i]/l*1.0)).__round__(2);
        response = {"message" : arr}
        return HttpResponse(json.dumps(response), content_type="application/json")
    return HttpResponse("hello")