from django.contrib import admin
from new.models import Company, Pending, Approved, Website

# Register your models here.

    
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
    list_display = ('review_date', 'review_description', 'related_links')
    list_filter = ('review_date', 'review_description', 'related_links')
    search_fields = ('review_date', 'review_description', 'related_links')
    fields = ('review_date', 'related_links', 'review_description', 'additional_comments', 'image', 'dark_patterns')
    actions = ['approve']

    @admin.action(description='Approve')
    def approve(self, request, queryset):
        for pending in queryset:
            approved = Approved(review_date=pending.review_date, related_links=pending.related_links, review_description=pending.review_description, additional_comments=pending.additional_comments, image=pending.image, dark_patterns=pending.dark_patterns)
            approved.save()
            pending.delete()    

@admin.register(Approved)
class approvedAdmin(admin.ModelAdmin):
    model = Approved
    list_display = ('review_date', 'review_description', 'related_links')
    list_filter = ('review_date', 'review_description', 'related_links')
    search_fields = ('review_date', 'review_description', 'related_links')
    fields = ('review_date', 'related_links', 'review_description', 'additional_comments', 'image', 'dark_patterns')
    actions = ['reject']

    @admin.action(description='Reject')
    def reject(self, request, queryset):
        for approved in queryset:
            pending = Pending(review_date=approved.review_date, related_links=approved.related_links, review_description=approved.review_description, additional_comments=approved.additional_comments, image=approved.image, dark_patterns=approved.dark_patterns)
            pending.save()
            approved.delete()
            

