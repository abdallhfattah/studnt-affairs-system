from django.contrib import admin
from .models import Student,Department,UserAdmin

# Register your models here.
admin.site.register(Student)
admin.site.register(Department)
admin.site.register(UserAdmin)