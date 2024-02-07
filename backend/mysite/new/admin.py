from django.contrib import admin
from new.models import Consumer, Company, Pending, Approved, Website

# Register your models here.
@admin.register(Consumer)
class consumerAdmin(admin.ModelAdmin):
    model = Consumer
    list_display = ('name',)
    search_fields = ('name',)
    fields = ('name',)
    
@admin.register(Company)
class companyAdmin(admin.ModelAdmin):
    model = Company
    list_display = ('name',)
    search_fields = ('name',)
    fields = ('name',)

@admin.register(Website)
class websiteAdmin(admin.ModelAdmin):
    model = Website
    list_display = ('website_name', 'company', 'review_count')
    list_filter = ('website_name', 'company', 'review_count')
    search_fields = ('website_name', 'company', 'review_count')
    fields = ('website_name', 'company', 'review_count')


@admin.register(Pending)
class pendingAdmin(admin.ModelAdmin):
    model = Pending
    list_display = ('customer', 'review_date', 'website_name', 'review_description')
    list_filter = ('customer', 'review_date', 'website_name')
    search_fields = ('customer', 'review_date', 'website_name')
    fields = ('customer', 'review_date', 'website_name', 'review_description')
    actions = ['approve']

    def approve(self, request, queryset):
        for pending in queryset:
            approved = Approved(customer=pending.customer, review_date=pending.review_date, website_name=pending.website_name, review_description=pending.review_description)
            approved.save()
            pending.delete()

@admin.register(Approved)
class approvedAdmin(admin.ModelAdmin):
    model = Approved
    list_display = ('customer', 'review_date', 'website_name', 'review_description')
    list_filter = ('customer', 'review_date', 'website_name')
    search_fields = ('customer', 'review_date', 'website_name')
    fields = ('customer', 'review_date', 'website_name', 'review_description')

