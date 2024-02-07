from django.db import models

# Create your models here.
class Consumer(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Consumers"

class Company(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Companies"

class Pending(models.Model):
    customer=models.ForeignKey(Consumer,on_delete=models.CASCADE)
    review_date = models.DateField()
    website_name = models.CharField(max_length=30)
    review_description = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "Pending"


class Approved(models.Model):
    customer=models.ForeignKey(Consumer,on_delete=models.CASCADE)
    review_date = models.DateField()
    website_name = models.CharField(max_length=30)
    review_description = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "Approved"

class Website(models.Model):
    website_name = models.CharField(max_length=30)
    company=models.ForeignKey(Company,on_delete=models.CASCADE)
    review_count = models.IntegerField()