from django.db import models
from multiselectfield import MultiSelectField


# Create your models here.

class Company(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Companies"

class DarkPatterns(models.Model):
    sn = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "DarkPatterns"



#  related links is website link
class Pending(models.Model):
    review_date = models.DateField()
    related_links = models.CharField(max_length=50)
    review_description = models.TextField()
    additional_comments = models.TextField()
    image = models.ImageField(upload_to='images/')
    dark_patterns = models.CharField(max_length=10)

    class Meta:
        verbose_name_plural = "Pending"


class Approved(models.Model):
    review_date = models.DateField()
    related_links = models.CharField(max_length=50)
    review_description = models.TextField()
    additional_comments = models.TextField()
    image = models.ImageField(upload_to='images/')
    dark_patterns =models.CharField(max_length=10)

    class Meta:
        verbose_name_plural = "Approved"

class Website(models.Model):
    website_name = models.CharField(max_length=30)
    company=models.ForeignKey(Company,on_delete=models.CASCADE)
    review_count = models.IntegerField()